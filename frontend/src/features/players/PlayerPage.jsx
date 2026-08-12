import { useContext, useState } from "react";

import { getPlayers, deletePlayer } from "../../services/players.service";

import PlayerTable from "./PlayerTable";
import PlayerModal from "./PlayerModal";

import SearchBar from "../../components/ui/SearchBar/SearchBar";
import Button from "../../components/ui/Button/Button";

import useModal from "../../hooks/useModal";
import useFetch from "../../hooks/useFetch";

import { AuthContext } from "../../context/AuthContext";

import "./Player.css";

function PlayerPage() {
    const [search, setSearch] = useState("");
    const modal = useModal();

    const { role, userId } = useContext(AuthContext);
    const canManage = role === "admin" || role === "organizer";
    const isPlayer = role === "player";

    const {
        data: players,
        loading,
        error,
        reload
    } = useFetch(getPlayers);

    const myPlayer = isPlayer
        ? players.find((player) => player.userId === userId)
        : null;

    const canEditRow = (player) =>
        canManage || (isPlayer && player.userId === userId);

    const handlePlayerCreated = () => {
        modal.close();
        reload();
    };



    const handleDeletePlayer = async (player) => {
        const confirmed = window.confirm(
            `Delete ${player.fullName}? This cannot be undone.`
        );
        if (!confirmed) return;
        try {
            await deletePlayer(player.id);
            reload();
        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message ||
                "Error deleting player"
            );
        }
    };

    const filteredPlayers = players.filter((player) =>
        player.fullName
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    if (loading) {
        return <p>Loading players...</p>;
    }

    if (error) {
        return <p>Error loading players</p>;
    }

    return (
        <div className="player-page">
            <div className="player-page-header">
                <div>
                    <h1>Players</h1>
                    <p>
                        {
                            canManage
                                ? "Manage all registered players"
                                : "Browse all registered players"
                        }
                    </p>
                </div>
                {
                    canManage && (
                        <Button onClick={modal.open}>
                            + New Player
                        </Button>
                    )
                }
                {
                    isPlayer && !myPlayer && (
                        <Button onClick={modal.open}>
                            + Create my player profile
                        </Button>
                    )
                }
            </div>
            <SearchBar
                placeholder="Search players..."
                value={search}
                onChange={(event) =>
                    setSearch(event.target.value)
                }
            />
            <PlayerTable
                players={filteredPlayers}
                onEdit={canManage || isPlayer ? modal.edit : undefined}
                onDelete={canManage ? handleDeletePlayer : undefined}
                canEditRow={canEditRow}
            />
            {
                modal.isOpen && (
                    <PlayerModal
                        player={modal.selectedItem}
                        onClose={modal.close}
                        onSuccess={handlePlayerCreated}
                    />
                )
            }
        </div>
    );

}


export default PlayerPage;