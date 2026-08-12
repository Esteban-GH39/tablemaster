import { useCallback, useContext, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ListChecks, Trash2, Trophy } from "lucide-react";

import { AuthContext } from "../../context/AuthContext";

import { getTournamentById } from "../../services/tournaments.service";
import {
    getEntries,
    deleteEntry,
    joinTournament,
    leaveTournament
} from "../../services/entries.service";
import { getPlayers } from "../../services/players.service";
import { startCompetition } from "../../services/competition.service";

import useFetch from "../../hooks/useFetch";
import Badge from "../../components/ui/Badge/Badge";
import Button from "../../components/ui/Button/Button";

import { getStatusVariant, formatStatus } from "../../utils/status";
import { formatDate } from "../../utils/formatDate";

import EntryModal from "./EntryModal";

import "./TournamentDetail.css";

const MIN_ENTRIES = 4;

function TournamentDetailPage() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { role, userId } = useContext(AuthContext);

    const canManage = role === "admin" || role === "organizer";
    const isPlayer = role === "player";

    const fetchTournament = useCallback(
        () => getTournamentById(id),
        [id]
    );

    const fetchEntries = useCallback(
        () => getEntries(id),
        [id]
    );

    const {
        data: tournament,
        loading: loadingTournament,
        error: tournamentError
    } = useFetch(fetchTournament);

    const {
        data: entries,
        loading: loadingEntries,
        reload: reloadEntries
    } = useFetch(fetchEntries);

    const {
        data: players,
        loading: loadingPlayers
    } = useFetch(getPlayers);

    const [showEntryModal, setShowEntryModal] = useState(false);
    const [starting, setStarting] = useState(false);
    const [startError, setStartError] = useState("");
    const [joining, setJoining] = useState(false);
    const [joinError, setJoinError] = useState("");

    const isRegistrationOpen = tournament?.status === "registration";

    const registeredPlayerIds = new Set(
        (entries || []).map((entry) => entry.player_id)
    );

    const availablePlayers = (players || []).filter(
        (player) => !registeredPlayerIds.has(player.id)
    );

    // Jugador vinculado a la cuenta actual (players.user_id === userId),
    // usado para saber si ya esta inscrito y para el boton de unirse/retirarse.
    const myPlayer = (players || []).find(
        (player) => player.userId === userId
    );

    const myEntry = myPlayer
        ? (entries || []).find((entry) => entry.player_id === myPlayer.id)
        : null;

    const handleEntryRegistered = () => {
        setShowEntryModal(false);
        reloadEntries();
    };

    const handleRemoveEntry = async (entry) => {

        const confirmed = window.confirm(
            `Remove ${entry.full_name} from this tournament?`
        );
        if (!confirmed) return;

        try {
            await deleteEntry(entry.id);
            reloadEntries();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Error removing entry"
            );
        }

    };

    const handleJoinTournament = async () => {

        try {
            setJoining(true);
            setJoinError("");
            await joinTournament(id);
            reloadEntries();
        } catch (error) {
            setJoinError(
                error.response?.data?.message ||
                "Error joining tournament"
            );
        } finally {
            setJoining(false);
        }

    };

    const handleLeaveTournament = async () => {

        const confirmed = window.confirm(
            "Withdraw from this tournament?"
        );
        if (!confirmed) return;

        try {
            setJoining(true);
            setJoinError("");
            await leaveTournament(id);
            reloadEntries();
        } catch (error) {
            setJoinError(
                error.response?.data?.message ||
                "Error withdrawing from tournament"
            );
        } finally {
            setJoining(false);
        }

    };

    const handleStartTournament = async () => {

        const confirmed = window.confirm(
            "Start the tournament? This will generate groups and matches, and registration will close."
        );
        if (!confirmed) return;

        try {
            setStarting(true);
            setStartError("");
            await startCompetition(id);
            navigate("/matches");
        } catch (error) {
            setStartError(
                error.response?.data?.message ||
                "Error starting tournament"
            );
        } finally {
            setStarting(false);
        }

    };

    if (loadingTournament) return <p>Loading tournament...</p>;

    if (tournamentError || !tournament) {
        return (
            <div className="tournament-detail-error">
                <h1>Tournament not found</h1>
                <Button variant="secondary" onClick={() => navigate("/tournaments")}>
                    Back to tournaments
                </Button>
            </div>
        );
    }

    return (
        <div className="tournament-detail-page">

            <button
                type="button"
                className="tournament-detail-back"
                onClick={() => navigate("/tournaments")}
            >
                <ArrowLeft size={16} />
                Back to tournaments
            </button>

            <div className="tournament-detail-header">
                <div>
                    <div className="tournament-detail-title">
                        <h1>{tournament.name}</h1>
                        <Badge variant={getStatusVariant(tournament.status)}>
                            {formatStatus(tournament.status)}
                        </Badge>
                    </div>
                    <p>
                        {tournament.location} · {formatDate(tournament.startDate)} — {formatDate(tournament.endDate)}
                    </p>
                </div>

                <div className="tournament-detail-header-actions">

                    {
                        (tournament.status === "in_progress" || tournament.status === "finished") && (
                            <Link
                                to={`/tournaments/${id}/matches`}
                                className="tournament-detail-matches-link"
                            >
                                <ListChecks size={16} />
                                View Matches
                            </Link>
                        )
                    }

                    {
                        canManage && isRegistrationOpen && (
                            <Button
                                variant="primary"
                                onClick={handleStartTournament}
                                disabled={
                                    starting ||
                                    (entries?.length || 0) < MIN_ENTRIES
                                }
                            >
                                <Trophy size={16} style={{ marginRight: 6, verticalAlign: "-3px" }} />
                                {starting ? "Starting..." : "Start Tournament"}
                            </Button>
                        )
                    }

                    {
                        isPlayer && isRegistrationOpen && myPlayer && (
                            myEntry ? (
                                <Button
                                    variant="secondary"
                                    onClick={handleLeaveTournament}
                                    disabled={joining}
                                >
                                    {joining ? "Withdrawing..." : "Withdraw"}
                                </Button>
                            ) : (
                                <Button
                                    variant="primary"
                                    onClick={handleJoinTournament}
                                    disabled={
                                        joining ||
                                        (entries?.length || 0) >= tournament.maxPlayers
                                    }
                                >
                                    <Trophy size={16} style={{ marginRight: 6, verticalAlign: "-3px" }} />
                                    {joining ? "Joining..." : "Join Tournament"}
                                </Button>
                            )
                        )
                    }

                </div>
            </div>

            {
                isPlayer && isRegistrationOpen && !myPlayer && (
                    <p className="tournament-detail-hint">
                        You need a player profile linked to your account before you can join a tournament.
                    </p>
                )
            }

            {
                startError && (
                    <p className="tournament-detail-alert">
                        {startError}
                    </p>
                )
            }

            {
                joinError && (
                    <p className="tournament-detail-alert">
                        {joinError}
                    </p>
                )
            }

            {
                canManage && isRegistrationOpen && (entries?.length || 0) < MIN_ENTRIES && (
                    <p className="tournament-detail-hint">
                        You need at least {MIN_ENTRIES} entries to start the tournament
                        ({entries?.length || 0}/{MIN_ENTRIES} registered).
                    </p>
                )
            }

            <div className="tournament-detail-section">

                <div className="tournament-detail-section-header">
                    <div>
                        <h2>Entries</h2>
                        <p>
                            {entries?.length || 0} / {tournament.maxPlayers} registered
                        </p>
                    </div>

                    {
                        canManage && isRegistrationOpen && (
                            <Button
                                variant="secondary"
                                onClick={() => setShowEntryModal(true)}
                                disabled={loadingPlayers}
                            >
                                + Register Player
                            </Button>
                        )
                    }
                </div>

                {
                    loadingEntries ? (
                        <p>Loading entries...</p>
                    ) : !entries?.length ? (
                        <div className="tournament-detail-empty">
                            No players registered yet.
                        </div>
                    ) : (
                        <div className="table-container">
                            <table className="entries-table">
                                <thead>
                                    <tr>
                                        <th>Seed</th>
                                        <th>Player</th>
                                        <th>Club</th>
                                        <th>Registered</th>
                                        {
                                            canManage && isRegistrationOpen && <th></th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        entries.map((entry) => (
                                            <tr key={entry.id}>
                                                <td>{entry.seed ?? "—"}</td>
                                                <td>{entry.full_name}</td>
                                                <td>{entry.club || "—"}</td>
                                                <td>{formatDate(entry.registered_at)}</td>
                                                {
                                                    canManage && isRegistrationOpen && (
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="entries-remove-btn"
                                                                onClick={() => handleRemoveEntry(entry)}
                                                                aria-label="Remove entry"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </td>
                                                    )
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                }

            </div>

            {
                showEntryModal && (
                    <EntryModal
                        tournamentId={id}
                        availablePlayers={availablePlayers}
                        onClose={() => setShowEntryModal(false)}
                        onSuccess={handleEntryRegistered}
                    />
                )
            }

        </div>
    );
}

export default TournamentDetailPage;
