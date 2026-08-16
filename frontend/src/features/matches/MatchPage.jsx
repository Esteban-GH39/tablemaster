import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getMatches, deleteMatch } from "../../services/matches.service";
import { getPlayers } from "../../services/players.service";
import { getTournaments } from "../../services/tournaments.service";

import SearchBar from "../../components/ui/SearchBar/SearchBar";
import Button from "../../components/ui/Button/Button";

import MatchTable from "./MatchTable";
import MatchModal from "./MatchModal";
import MatchResultModal from "../matchResults/MatchResultModal";
import ChallengeModal from "./ChallengeModal";
import PendingConfirmations from "./PendingConfirmations";

import { AuthContext } from "../../context/AuthContext";

import "./Match.css";

const RESULT_ROLES = ["admin", "organizer", "referee"];

function MatchPage() {

    const { role, userId } = useContext(AuthContext);
    const canManage = role === "admin" || role === "organizer";
    const canRegisterResults = RESULT_ROLES.includes(role);
    const isPlayer = role === "player";

    const [matches, setMatches] = useState([]);
    const [players, setPlayers] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resultMatch, setResultMatch] = useState(null);
    const [isChallengeOpen, setIsChallengeOpen] = useState(false);

    const loadData = async () => {
        try {
            const [matchesData, playersData, tournamentsData] = await Promise.all([
                getMatches(),
                getPlayers(),
                getTournaments()
            ]);
            setMatches(matchesData);
            setPlayers(playersData);
            setTournaments(tournamentsData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleMatchSaved = () => {
        setIsModalOpen(false);
        setSelectedMatch(null);
        loadData();
    };

    const handleEditMatch = (match) => {
        setSelectedMatch(match);
        setIsModalOpen(true);
    };

    const handleRegisterResult = (match) => {
        setResultMatch(match);
    };

    const handleResultSaved = () => {
        setResultMatch(null);
        loadData();
    };

    const handleDeleteMatch = async (match) => {
        const confirmed = window.confirm(
            `Delete this match? This cannot be undone.`
        );
        if (!confirmed) return;

        try {
            await deleteMatch(match.id);
            loadData();
        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message ||
                "Error deleting match"
            );
        }
    };

    const playerName = (id) => {
        const player = players.find((player) => player.id === id);
        return player ? player.fullName : "TBD";
    };

    const tournamentName = (id) => {
        if (!id) return "Friendly match";
        const tournament = tournaments.find((tournament) => tournament.id === id);
        return tournament ? tournament.name : "Unknown tournament";
    };

    const myPlayer = isPlayer
        ? players.find((player) => player.userId === userId)
        : null;

    const visibleMatches = isPlayer
        ? matches.filter((match) =>
            myPlayer && (
                match.playerOneId === myPlayer.id ||
                match.playerTwoId === myPlayer.id
            )
        )
        : matches;

    const filteredMatches = visibleMatches.filter((match) => {
        const term = search.toLowerCase();
        return (
            playerName(match.playerOneId).toLowerCase().includes(term) ||
            playerName(match.playerTwoId).toLowerCase().includes(term) ||
            tournamentName(match.tournamentId).toLowerCase().includes(term) ||
            match.round.toLowerCase().includes(term)
        );
    });

    return (
        <div className="match-page">
            <div className="match-page-header">
                <div>
                    <h1>{isPlayer ? "My Matches" : "Matches"}</h1>
                    <p>
                        {
                            isPlayer
                                ? "Your matches, in tournaments and friendlies"
                                : "Manage all matches"
                        }
                    </p>
                </div>
                <div className="match-page-actions">
                    <Link to="/matches/head-to-head" className="btn-secondary-link">
                        Head to Head
                    </Link>
                    {
                        isPlayer && myPlayer && (
                            <Button onClick={() => setIsChallengeOpen(true)}>
                                + Challenge a Player
                            </Button>
                        )
                    }
                    {
                        canManage && (
                            <Button
                                onClick={() => {
                                    setSelectedMatch(null);
                                    setIsModalOpen(true);
                                }}
                            >
                                + New Match
                            </Button>
                        )
                    }
                </div>
            </div>
            {
                isPlayer && myPlayer && (
                    <PendingConfirmations onResolved={loadData} />
                )
            }
            <SearchBar
                placeholder="Search matches..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            <MatchTable
                matches={filteredMatches}
                playerName={playerName}
                tournamentName={tournamentName}
                onEdit={canManage ? handleEditMatch : undefined}
                onDelete={canManage ? handleDeleteMatch : undefined}
                onRegisterResult={canRegisterResults ? handleRegisterResult : undefined}
            />
            {
                isChallengeOpen && myPlayer && (
                    <ChallengeModal
                        myPlayer={myPlayer}
                        players={players}
                        onClose={() => setIsChallengeOpen(false)}
                        onSuccess={() => {
                            setIsChallengeOpen(false);
                            loadData();
                        }}
                    />
                )
            }
            {
                isModalOpen &&
                (
                    <MatchModal
                        match={selectedMatch}
                        players={players}
                        tournaments={tournaments}
                        onClose={() => {
                            setIsModalOpen(false);
                            setSelectedMatch(null);
                        }}
                        onSuccess={handleMatchSaved}
                    />
                )
            }
            {
                resultMatch &&
                (
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

export default MatchPage;
