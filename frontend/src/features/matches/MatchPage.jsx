import { useEffect, useState } from "react";

import { getMatches, deleteMatch } from "../../services/matches.service";
import { getPlayers } from "../../services/players.service";
import { getTournaments } from "../../services/tournaments.service";

import SearchBar from "../../components/ui/SearchBar/SearchBar";
import Button from "../../components/ui/Button/Button";

import MatchTable from "./MatchTable";
import MatchModal from "./MatchModal";

import "./Match.css";

function MatchPage() {

    const [matches, setMatches] = useState([]);
    const [players, setPlayers] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        const tournament = tournaments.find((tournament) => tournament.id === id);
        return tournament ? tournament.name : "Unknown tournament";
    };

    const filteredMatches = matches.filter((match) => {
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
                    <h1>Matches</h1>
                    <p>
                        Manage all matches
                    </p>
                </div>
                <Button
                    onClick={() => {
                        setSelectedMatch(null);
                        setIsModalOpen(true);
                    }}
                    disabled={tournaments.length === 0}
                >
                    + New Match
                </Button>
            </div>
            <SearchBar
                placeholder="Search matches..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            <MatchTable
                matches={filteredMatches}
                playerName={playerName}
                tournamentName={tournamentName}
                onEdit={handleEditMatch}
                onDelete={handleDeleteMatch}
            />
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
        </div>
    );

}

export default MatchPage;
