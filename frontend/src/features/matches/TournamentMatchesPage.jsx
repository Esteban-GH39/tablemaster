import { useCallback, useContext, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Trophy } from "lucide-react";

import { AuthContext } from "../../context/AuthContext";

import { getTournamentById } from "../../services/tournaments.service";
import { getMatches } from "../../services/matches.service";
import { getPlayers } from "../../services/players.service";
import { getGroups } from "../../services/groups.service";

import useFetch from "../../hooks/useFetch";
import Badge from "../../components/ui/Badge/Badge";

import { getStatusVariant, formatStatus } from "../../utils/status";
import { formatDate } from "../../utils/formatDate";
import { MATCH_FORMAT_LABELS } from "../../utils/constants";

import MatchResultModal from "../matchResults/MatchResultModal";
import BracketView from "./BracketView";
import GroupStandingsView from "./GroupStandingsView";

import "./Match.css";
import "./TournamentMatches.css";

const RESULT_ROLES = ["admin", "organizer", "referee"];

function TournamentMatchesPage() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { role } = useContext(AuthContext);

    const canRegisterResults = RESULT_ROLES.includes(role);

    const fetchTournament = useCallback(
        () => getTournamentById(id),
        [id]
    );

    const fetchMatches = useCallback(
        () => getMatches(id),
        [id]
    );

    const {
        data: tournament,
        loading: loadingTournament
    } = useFetch(fetchTournament);

    const {
        data: matches,
        loading: loadingMatches,
        reload: reloadMatches
    } = useFetch(fetchMatches);

    const {
        data: players
    } = useFetch(getPlayers);

    const fetchGroups = useCallback(
        () => getGroups(id),
        [id]
    );

    const {
        data: groups
    } = useFetch(fetchGroups);

    const [activeTab, setActiveTab] = useState("all");
    const [resultMatch, setResultMatch] = useState(null);

    const playerName = (playerId) => {
        const player = (players || []).find((player) => player.id === playerId);
        return player ? player.fullName : "TBD";
    };

    const tabs = useMemo(() => {

        const list = (matches || []);

        const hasGroupStage = list.some((match) => match.groupId);

        const knockoutRounds = [
            ...new Map(
                list
                    .filter((match) => !match.groupId)
                    .map((match) => [match.round, match.roundOrder])
            ).entries()
        ]
            .sort((a, b) => a[1] - b[1])
            .map(([round]) => round);

        return [
            { key: "all", label: "All" },
            ...(hasGroupStage ? [{ key: "group", label: "Group Stage" }] : []),
            ...(knockoutRounds.length ? [{ key: "bracket", label: "Bracket" }] : []),
            ...knockoutRounds.map((round) => ({ key: round, label: round }))
        ];

    }, [matches]);

    const bracketRounds = useMemo(() => {

        const list = (matches || []).filter((match) => !match.groupId);

        const grouped = new Map();
        list.forEach((match) => {
            if (!grouped.has(match.roundOrder)) grouped.set(match.roundOrder, []);
            grouped.get(match.roundOrder).push(match);
        });

        return [...grouped.entries()]
            .sort((a, b) => a[0] - b[0])
            .map(([, roundMatches]) =>
                [...roundMatches].sort((a, b) => a.matchOrder - b.matchOrder)
            );

    }, [matches]);

    const visibleMatches = useMemo(() => {

        const list = (matches || []);

        if (activeTab === "all") return list;
        if (activeTab === "group") return list.filter((match) => match.groupId);
        return list.filter((match) => match.round === activeTab);

    }, [matches, activeTab]);

    const handleResultSaved = () => {
        setResultMatch(null);
        reloadMatches();
    };

    if (loadingTournament) return <p>Loading tournament...</p>;

    if (!tournament) {
        return (
            <div className="tournament-matches-error">
                <h1>Tournament not found</h1>
            </div>
        );
    }

    return (
        <div className="tournament-matches-page">

            <button
                type="button"
                className="tournament-matches-back"
                onClick={() => navigate(`/tournaments/${id}`)}
            >
                <ArrowLeft size={16} />
                Back to tournament
            </button>

            <div className="tournament-matches-header">
                <div>
                    <h1>{tournament.name}</h1>
                    <p>Matches</p>
                </div>
                <Link to="/matches" className="tournament-matches-all-link">
                    View all matches
                </Link>
            </div>

            <div className="tournament-matches-tabs">
                {
                    tabs.map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            className={`tournament-matches-tab ${
                                activeTab === tab.key ? "is-active" : ""
                            }`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.label}
                        </button>
                    ))
                }
            </div>

            {
                activeTab === "bracket" ? (
                    <BracketView rounds={bracketRounds} playerName={playerName} />
                ) : activeTab === "group" ? (
                    <GroupStandingsView
                        groups={groups || []}
                        matches={(matches || []).filter((match) => match.groupId)}
                        playerName={playerName}
                    />
                ) : loadingMatches ? (
                    <p>Loading matches...</p>
                ) : !visibleMatches.length ? (
                    <div className="tournament-matches-empty">
                        No matches in this stage yet.
                    </div>
                ) : (
                    <table className="matches-table">
                            <thead>
                                <tr>
                                    <th>Round</th>
                                    <th>Player 1</th>
                                    <th>Player 2</th>
                                    <th>Winner</th>
                                    <th>Format</th>
                                    <th>Status</th>
                                    <th>Played</th>
                                    {
                                        canRegisterResults && <th></th>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    visibleMatches.map((match) => {

                                        const canRegisterResult =
                                            canRegisterResults &&
                                            match.status !== "finished" &&
                                            match.status !== "cancelled" &&
                                            !!match.playerOneId &&
                                            !!match.playerTwoId;

                                        return (
                                            <tr key={match.id}>
                                                <td>{match.round}</td>
                                                <td>{playerName(match.playerOneId)}</td>
                                                <td>{playerName(match.playerTwoId)}</td>
                                                <td>
                                                    {
                                                        match.winnerId
                                                            ? <strong>{playerName(match.winnerId)}</strong>
                                                            : "—"
                                                    }
                                                </td>
                                                <td>
                                                    {MATCH_FORMAT_LABELS[match.setsToWin] ?? `First to ${match.setsToWin}`}
                                                </td>
                                                <td>
                                                    <Badge variant={getStatusVariant(match.status)}>
                                                        {formatStatus(match.status)}
                                                    </Badge>
                                                </td>
                                                <td>{formatDate(match.playedAt)}</td>
                                                {
                                                    canRegisterResults && (
                                                        <td>
                                                            {
                                                                canRegisterResult && (
                                                                    <button
                                                                        type="button"
                                                                        className="tournament-matches-result-btn"
                                                                        onClick={() => setResultMatch(match)}
                                                                    >
                                                                        <Trophy size={14} />
                                                                        Register Result
                                                                    </button>
                                                                )
                                                            }
                                                        </td>
                                                    )
                                                }
                                            </tr>
                                        );

                                    })
                                }
                            </tbody>
                        </table>
                )
            }

            {
                resultMatch && (
                    <MatchResultModal
                        match={resultMatch}
                        playerOneName={playerName(resultMatch.playerOneId)}
                        playerTwoName={playerName(resultMatch.playerTwoId)}
                        onClose={() => setResultMatch(null)}
                        onSuccess={handleResultSaved}
                    />
                )
            }

        </div>
    );
}

export default TournamentMatchesPage;
