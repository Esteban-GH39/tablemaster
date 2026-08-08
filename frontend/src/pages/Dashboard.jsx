import { useEffect, useState } from "react";
import { Users, Trophy, Shield, Target, CheckCircle2, Clock, CalendarClock, Handshake } from "lucide-react";

import StatCard from "../components/dashboard/StatCard";
import MiniStatCard from "../components/dashboard/MiniStatCard";
import RecentResults from "../components/dashboard/RecentResults";
import UpcomingTournaments from "../components/dashboard/UpcomingTournaments";
import TopPlayers from "../components/dashboard/TopPlayers";
import QuickActions from "../components/dashboard/QuickActions";
import "../components/dashboard/DashboardSections.css";
import "./Dashboard.css";

import { getPlayers } from "../services/players.service";
import { getTeams } from "../services/teams.service";
import { getTournaments } from "../services/tournaments.service";
import { getMatches } from "../services/matches.service";
import { getGlobalRanking } from "../services/ranking.service";

import { TOURNAMENT_STATUS, MATCH_STATUS } from "../utils/constants";

function Dashboard() {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [matches, setMatches] = useState([]);
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const [
                    playersData,
                    teamsData,
                    tournamentsData,
                    matchesData,
                    rankingData
                ] = await Promise.all([
                    getPlayers(),
                    getTeams(),
                    getTournaments(),
                    getMatches(),
                    getGlobalRanking()
                ]);
                setPlayers(playersData);
                setTeams(teamsData);
                setTournaments(tournamentsData);
                setMatches(matchesData);
                setRanking(rankingData);
            } catch (error) {
                console.error(error);
            }
        };
        loadDashboard();
    }, []);

    const playerName = (id) => {
        const player = players.find((player) => player.id === id);
        return player ? player.fullName : "TBD";
    };

    const finishedMatches = matches.filter(
        (match) => match.status === MATCH_STATUS.FINISHED
    );
    const pendingMatches = matches.filter(
        (match) => match.status !== MATCH_STATUS.FINISHED
    );
    const activeTournaments = tournaments.filter(
        (tournament) =>
            tournament.status === TOURNAMENT_STATUS.REGISTRATION ||
            tournament.status === TOURNAMENT_STATUS.IN_PROGRESS
    );
    const friendlyMatches = matches.filter(
        (match) => !match.tournamentId
    );

    const recentResults = [...finishedMatches]
        .sort((a, b) => new Date(b.playedAt) - new Date(a.playedAt))
        .slice(0, 5);

    const today = new Date();
    const upcomingTournaments = [...tournaments]
        .filter((tournament) => new Date(tournament.startDate) >= today)
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
        .slice(0, 5);

    const topPlayers = [...ranking]
        .filter((player) => Number(player.matches_played) > 0)
        .slice(0, 5);

    return (
        <div className="dashboard-page">
            <h1>Dashboard</h1>
            <p>Bienvenido a TableMaster</p>

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

            <div className="dashboard-mini-grid">
                <MiniStatCard
                    icon={CheckCircle2}
                    label="Finished Matches"
                    value={finishedMatches.length}
                    tone="secondary"
                />
                <MiniStatCard
                    icon={Clock}
                    label="Pending Matches"
                    value={pendingMatches.length}
                    tone="warning"
                />
                <MiniStatCard
                    icon={CalendarClock}
                    label="Active/Upcoming Tournaments"
                    value={activeTournaments.length}
                    tone="secondary"
                />
                <MiniStatCard
                    icon={Handshake}
                    label="Friendly Matches"
                    value={friendlyMatches.length}
                    tone="neutral"
                />
            </div>

            <div className="dashboard-sections">
                <div className="dashboard-sections-main">
                    <RecentResults matches={recentResults} playerName={playerName} />
                    <UpcomingTournaments tournaments={upcomingTournaments} />
                </div>
                <div className="dashboard-sections-side">
                    <TopPlayers players={topPlayers} />
                    <QuickActions />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;