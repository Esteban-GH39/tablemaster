import { useEffect, useState } from "react";

import { getTournaments, deleteTournament } from "../../services/tournaments.service";

import SearchBar from "../../components/ui/SearchBar/SearchBar";
import Button from "../../components/ui/Button/Button";

import TournamentTable from "./TournamentTable";
import TournamentModal from "./TournamentModal";

import "./Tournament.css";

function TournamentPage() {

    const [tournaments, setTournaments] = useState([]);
    const [selectedTournament, setSelectedTournament] = useState(null);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadTournaments = async () => {
        try {
            const data = await getTournaments();
            setTournaments(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadTournaments();
    }, []);

    const handleTournamentSaved = () => {
        setIsModalOpen(false);
        setSelectedTournament(null);
        loadTournaments();
    };

    const handleEditTournament = (tournament) => {
        setSelectedTournament(tournament);
        setIsModalOpen(true);
    };

    const handleDeleteTournament = async (tournament) => {
        const confirmed = window.confirm(
            `Delete "${tournament.name}"? This cannot be undone.`
        );
        if (!confirmed) return;

        try {
            await deleteTournament(tournament.id);
            loadTournaments();
        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message ||
                "Error deleting tournament"
            );
        }
    };

    const filteredTournaments = tournaments.filter((tournament) =>
        tournament.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="tournament-page">
            <div className="tournament-page-header">
                <div>
                    <h1>Tournaments</h1>
                    <p>
                        Manage all tournaments
                    </p>
                </div>
                <Button
                    onClick={() => {
                        setSelectedTournament(null);
                        setIsModalOpen(true);
                    }}
                >
                    + New Tournament
                </Button>
            </div>
            <SearchBar
                placeholder="Search tournaments..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            <TournamentTable
                tournaments={filteredTournaments}
                onEdit={handleEditTournament}
                onDelete={handleDeleteTournament}
            />
            {
                isModalOpen &&
                (
                    <TournamentModal
                        tournament={selectedTournament}
                        onClose={() => {
                            setIsModalOpen(false);
                            setSelectedTournament(null);
                        }}
                        onSuccess={handleTournamentSaved}
                    />
                )
            }
        </div>
    );

}

export default TournamentPage;