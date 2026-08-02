import { useEffect, useState } from "react";

import { getPlayers, deletePlayer } from "../../services/players.service";

import PlayerTable from "./PlayerTable";

import SearchBar from "../../components/ui/SearchBar/SearchBar";
import Button from "../../components/ui/Button/Button";
import PlayerModal from "./PlayerModal";

import "./Player.css";

function PlayerPage() {
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false)

    const loadPlayers = async () => {
            try {
                const data = await getPlayers();
                setPlayers(data);
            } catch (error) {
                console.error(error);
            }
        };

    useEffect(() => {
        loadPlayers();
    }, []);

    const handlePlayerCreated = () => {
        setIsModalOpen(false);
        setSelectedPlayer(null);
        loadPlayers();
    }

    const handleNewPlayer = () => {
        setSelectedPlayer(null);
        setIsModalOpen(true);
    }

    const handleEditPlayer = (player) => {
        setSelectedPlayer(player);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPlayer(null);
    }

    const handleDeletePlayer = async (player) => {
        const confirmed = window.confirm(
            `Delete ${player.fullName}? This cannot be undone.`
        );
        if (!confirmed) return;

        try {
            await deletePlayer(player.id);
            loadPlayers();
        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message ||
                "Error deleting player"
            );
        }
    }

    const filteredPlayers = players.filter((player) =>
        player.fullName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="player-page">
            <div className="player-page-header">
                <div>
                    <h1>Players</h1>
                    <p>
                        Manage all registered players
                    </p>
                </div>
                <Button onClick={handleNewPlayer}>
                    + New Player
                </Button>
                {
                    isModalOpen && (
                        <PlayerModal
                            player={selectedPlayer}
                            onClose={handleCloseModal}
                            onSuccess={handlePlayerCreated}
                        />
                    )
                }
            </div>
            <SearchBar
                placeholder="Search players..."
                value={search}
                onChange={(event) => {
                    setSearch(event.target.value);
                }}
            />
            <PlayerTable
                players={filteredPlayers}
                onEdit={handleEditPlayer}
                onDelete={handleDeletePlayer}
            />
        </div>
    );
}

export default PlayerPage;