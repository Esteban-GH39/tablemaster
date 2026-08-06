import { useState } from "react";

import { getTeams, deleteTeam } from "../../services/teams.service";

import TeamTable from "./TeamTable";
import TeamModal from "./TeamModal";
import TeamPlayersModal from "./TeamPlayersModal";

import SearchBar from "../../components/ui/SearchBar/SearchBar";
import Button from "../../components/ui/Button/Button";

import useModal from "../../hooks/useModal";
import useFetch from "../../hooks/useFetch";

import "./Team.css";

function TeamPage() {
    const [search, setSearch] = useState("");
    const modal = useModal();

    const [managingTeam, setManagingTeam] = useState(null);

    const {
        data: teams,
        loading,
        error,
        reload
    } = useFetch(getTeams);

    const handleTeamSaved = () => {
        modal.close();
        reload();
    };

    const handleDeleteTeam = async (team) => {
        const confirmed = window.confirm(
            `Delete "${team.name}"? This cannot be undone.`
        );
        if (!confirmed) return;

        try {
            await deleteTeam(team.id);
            reload();
        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message ||
                "Error deleting team"
            );
        }
    };

    const filteredTeams = teams.filter((team) =>
        team.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <p>Loading teams...</p>;
    }

    if (error) {
        return <p>Error loading teams</p>;
    }

    return (
        <div className="team-page">
            <div className="team-page-header">
                <div>
                    <h1>Teams</h1>
                    <p>
                        Manage all registered teams
                    </p>
                </div>
                <Button onClick={modal.open}>
                    + New Team
                </Button>
            </div>
            <SearchBar
                placeholder="Search teams..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            <TeamTable
                teams={filteredTeams}
                onEdit={modal.edit}
                onDelete={handleDeleteTeam}
                onManagePlayers={setManagingTeam}
            />
            {
                modal.isOpen && (
                    <TeamModal
                        team={modal.selectedItem}
                        onClose={modal.close}
                        onSuccess={handleTeamSaved}
                    />
                )
            }
            {
                managingTeam && (
                    <TeamPlayersModal
                        team={managingTeam}
                        onClose={() => setManagingTeam(null)}
                    />
                )
            }
        </div>
    );
}

export default TeamPage;
