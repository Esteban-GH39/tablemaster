import { useEffect, useState } from "react";

import { getPlayers } from "../../services/players.service";

import PlayerTable from "./PlayerTable";

import SearchBar from "../../components/ui/SearchBar/SearchBar";
import Button from "../../components/ui/Button/Button";
import PlayerModal from "./PlayerModal";

import "./player.css";

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
        loadPlayers();
    }

    const handleEditPlayer = (player) => {
        setSelectedPlayer(player);
        setIsModalOpen(true);
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
                <Button onClick={() => setIsModalOpen(true)}>
                    + New Player
                </Button>
                {
                    isModalOpen && (<PlayerModal 
                                        onClose={() => setIsModalOpen(false)}
                                        onSuccess={handlePlayerCreated}/>)
                }
            </div>
            <SearchBar
                placeholder="Search players..."
                value={search}
                onChange={(event) => {
                    setSearch(event.target.value);
                }}
            />
            <PlayerTable players={filteredPlayers} />
        </div>
    );
}

export default PlayerPage;