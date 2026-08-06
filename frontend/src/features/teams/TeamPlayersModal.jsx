import { useEffect, useState } from "react";
import { UserMinus } from "lucide-react";

import Modal from "../../components/ui/Modal/Modal";
import Button from "../../components/ui/Button/Button";

import { getPlayers } from "../../services/players.service";
import {
    getTeamPlayers,
    addPlayerToTeam,
    removePlayerFromTeam
} from "../../services/teams.service";

const MAX_PLAYERS_BY_FORMAT = {
    doubles: 2,
    team: 6
};

function TeamPlayersModal({ team, onClose }) {

    const [teamPlayers, setTeamPlayers] = useState([]);
    const [allPlayers, setAllPlayers] = useState([]);
    const [selectedPlayerId, setSelectedPlayerId] = useState("");
    const [loading, setLoading] = useState(true);

    const maxPlayers = MAX_PLAYERS_BY_FORMAT[team.format] ?? MAX_PLAYERS_BY_FORMAT.team;
    const isFull = teamPlayers.length >= maxPlayers;

    const load = async () => {
        try {
            setLoading(true);
            const [teamPlayersData, allPlayersData] = await Promise.all([
                getTeamPlayers(team.id),
                getPlayers()
            ]);
            setTeamPlayers(teamPlayersData);
            setAllPlayers(allPlayersData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [team.id]);

    const availablePlayers = allPlayers.filter(
        (player) => !teamPlayers.some((tp) => tp.id === player.id)
    );

    const handleAddPlayer = async (event) => {
        event.preventDefault();
        if (!selectedPlayerId) return;

        try {
            await addPlayerToTeam(team.id, selectedPlayerId);
            setSelectedPlayerId("");
            load();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Error adding player to team"
            );
        }
    };

    const handleRemovePlayer = async (player) => {
        const confirmed = window.confirm(
            `Remove ${player.fullName} from this team?`
        );
        if (!confirmed) return;

        try {
            await removePlayerFromTeam(team.id, player.id);
            load();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Error removing player from team"
            );
        }
    };

    return (
        <Modal
            title={`Players — ${team.name}`}
            onClose={onClose}
        >
            {
                loading
                    ? <p>Loading players...</p>
                    : (
                        <div className="team-players-modal">

                            <p className="team-players-count">
                                {teamPlayers.length} / {maxPlayers} players ({team.format})
                            </p>

                            <ul className="team-players-list">
                                {
                                    teamPlayers.length === 0 && (
                                        <li className="team-players-empty">
                                            No players added yet.
                                        </li>
                                    )
                                }
                                {
                                    teamPlayers.map((player) => (
                                        <li key={player.id} className="team-players-item">
                                            <span>{player.fullName}</span>
                                            <button
                                                type="button"
                                                className="team-players-remove"
                                                onClick={() => handleRemovePlayer(player)}
                                                aria-label={`Remove ${player.fullName}`}
                                            >
                                                <UserMinus size={16} />
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>

                            {
                                !isFull && (
                                    <form
                                        className="team-players-add-form"
                                        onSubmit={handleAddPlayer}
                                    >
                                        <select
                                            value={selectedPlayerId}
                                            onChange={(event) => setSelectedPlayerId(event.target.value)}
                                        >
                                            <option value="">Select a player to add...</option>
                                            {
                                                availablePlayers.map((player) => (
                                                    <option key={player.id} value={player.id}>
                                                        {player.fullName}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        <Button type="submit" disabled={!selectedPlayerId}>
                                            Add
                                        </Button>
                                    </form>
                                )
                            }

                            {
                                isFull && (
                                    <p className="team-players-full-note">
                                        This team already has the maximum number of players for its format.
                                    </p>
                                )
                            }

                        </div>
                    )
            }
        </Modal>
    );
}

export default TeamPlayersModal;
