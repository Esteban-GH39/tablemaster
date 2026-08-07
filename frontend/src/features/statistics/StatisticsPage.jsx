import { useEffect, useState } from "react";
import { Users, Swords, CheckCircle2, Clock, Layers } from "lucide-react";

import { getTournamentStatistics } from "../../services/statistics.service";
import { getTournamentRanking } from "../../services/ranking.service";
import { getTournaments } from "../../services/tournaments.service";

import "./Statistics.css";
import "../ranking/Ranking.css";

function StatCard({ icon: Icon, label, value }) {
    return (
        <div className="stat-mini-card">
            <Icon size={20} />
            <div>
                <span className="stat-mini-value">{value}</span>
                <span className="stat-mini-label">{label}</span>
            </div>
        </div>
    );
}

function StatisticsPage() {

    const [tournaments, setTournaments] = useState([]);
    const [tournamentId, setTournamentId] = useState("");
    const [overview, setOverview] = useState(null);
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getTournaments()
            .then((data) => {
                setTournaments(data);
                if (data.length > 0) setTournamentId(data[0].id);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        if (!tournamentId) return;
        setLoading(true);
        setError("");
        Promise.all([
            getTournamentStatistics(tournamentId),
            getTournamentRanking(tournamentId)
        ])
            .then(([statistics, ranking]) => {
                setOverview(statistics);
                setPlayers(ranking);
            })
            .catch((error) => {
                console.error(error);
                setError(
                    error.response?.data?.message ||
                    "Error loading statistics for this tournament."
                );
            })
            .finally(() => setLoading(false));
    }, [tournamentId]);

    return (
        <div className="statistics-page">
            <div className="statistics-page-header">
                <div>
                    <h1>Statistics</h1>
                    <p>Overview and per-player breakdown for a tournament.</p>
                </div>

                <div className="form-group">
                    <label>Tournament</label>
                    <select
                        value={tournamentId}
                        onChange={(event) => setTournamentId(event.target.value)}
                    >
                        {
                            tournaments.length === 0 && (
                                <option value="">No tournaments yet</option>
                            )
                        }
                        {
                            tournaments.map((tournament) => (
                                <option key={tournament.id} value={tournament.id}>
                                    {tournament.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="statistics-error">{error}</p>}

            {
                !tournamentId && !loading && (
                    <p className="statistics-empty">
                        Create a tournament first to see its statistics.
                    </p>
                )
            }

            {
                overview && !loading && !error && (
                    <>
                        <div className="stat-mini-grid">
                            <StatCard icon={Users} label="Players with stats" value={overview.players} />
                            <StatCard icon={Swords} label="Total matches" value={overview.matches} />
                            <StatCard icon={CheckCircle2} label="Finished" value={overview.finishedMatches} />
                            <StatCard icon={Clock} label="Pending" value={overview.pendingMatches} />
                            <StatCard icon={Layers} label="Groups" value={overview.groups} />
                        </div>

                        <div className="statistics-progress">
                            <div className="statistics-progress-bar">
                                <div
                                    className="statistics-progress-fill"
                                    style={{ width: `${overview.completion}%` }}
                                />
                            </div>
                            <span>{overview.completion}% complete</span>
                        </div>

                        <h2 className="statistics-subheading">Player breakdown</h2>
                        {
                            players.length === 0
                                ? <p className="statistics-empty">No results registered for this tournament yet.</p>
                                : (
                                    <div className="table-container">
                                        <table className="ranking-table">
                                            <thead>
                                                <tr>
                                                    <th>Player</th>
                                                    <th>Club</th>
                                                    <th>MP</th>
                                                    <th>W</th>
                                                    <th>L</th>
                                                    <th>Sets</th>
                                                    <th>Points</th>
                                                    <th>Win %</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    players.map((player) => (
                                                        <tr key={player.id}>
                                                            <td>{player.full_name}</td>
                                                            <td>{player.club}</td>
                                                            <td>{player.matches_played}</td>
                                                            <td>{player.wins}</td>
                                                            <td>{player.losses}</td>
                                                            <td>{player.sets_won} - {player.sets_lost}</td>
                                                            <td>{player.points_won} - {player.points_lost}</td>
                                                            <td>{player.win_rate ?? "-"}{player.win_rate != null ? "%" : ""}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )
                        }
                    </>
                )
            }
        </div>
    );
}

export default StatisticsPage;