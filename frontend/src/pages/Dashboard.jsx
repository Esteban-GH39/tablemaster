import StatCard from "../components/dashboard/StatCard";
import "./Dashboard.css";

import { useEffect, useState } from "react";
import { Users, Trophy, Shield, Target } from "lucide-react"

import { getPlayers } from "../services/players.service";
import { getTeams } from "../services/teams.service";
import { getTournaments } from "../services/tournaments.service";
import { getMatches } from "../services/matches.service";

function Dashboard() {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [matches, setMatches] = useState([]);

        useEffect(() => {
        const loadDashboard = async () => {
            try {
                const [
                    playersData,
                    teamsData,
                    tournamentsData,
                    matchesData
                ] = await Promise.all([
                    getPlayers(),
                    getTeams(),
                    getTournaments(),
                    getMatches()
                ]);
                setPlayers(playersData);
                setTeams(teamsData);
                setTournaments(tournamentsData);
                setMatches(matchesData);
            } catch (error) {
                console.error(error);
            }
        };
        loadDashboard();
    }, []);
    
    return (
        <div>
            <h1>
                Dashboard
            </h1>
            <p>
                Bienvenido a TableMaster
            </p>
            <div className="dashboard-grid">
                <StatCard
                    title="Players"
                    value={players.length}
                    description="Registered Players"
                    icon={<Users size={32} />}
                    path="/players"
                />
                <StatCard
                    title="Teams"
                    value={teams.length}
                    description="Active Teams"
                    icon={<Shield size={32} />}
                    path="/teams"
                />
                <StatCard
                    title="Tournaments"
                    value={tournaments.length}
                    description="Created Tournaments"
                    icon={<Trophy size={32} />}
                    path="/tournaments"
                />
                <StatCard
                    title="Matches"
                    value={matches.length}
                    description="Played Matches"
                    icon={<Target size={32} />}
                    path="/matches"
                />

            </div>
        </div>
    );
}

export default Dashboard;