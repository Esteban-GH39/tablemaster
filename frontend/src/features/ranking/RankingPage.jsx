import { useEffect, useState } from "react";
import { Medal } from "lucide-react";

import { getGlobalRanking, getTournamentRanking } from "../../services/ranking.service";
import { getTournaments } from "../../services/tournaments.service";

import "./Ranking.css";

function RankingPage() {

    const [tournaments, setTournaments] = useState([]);
    const [tournamentId, setTournamentId] = useState("");
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getTournaments()
            .then(setTournaments)
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        setLoading(true);
        setError("");
        const request = tournamentId
            ? getTournamentRanking(tournamentId)
            : getGlobalRanking();

        request
            .then((data) => setRows(data))
            .catch((error) => {
                console.error(error);
                setError(
                    error.response?.data?.message ||
                    "Error loading the ranking."
                );
            })
            .finally(() => setLoading(false));
    }, [tournamentId]);

    const medal = (position) => {
        if (position === 0) return "🥇";
        if (position === 1) return "🥈";
        if (position === 2) return "🥉";
        return position + 1;
    };

    return (
        <div className="ranking-page">
            <div className="ranking-page-header">
                <div>
                    <h1>Ranking</h1>
                    <p>
                        {
                            tournamentId
                                ? "Standings for this tournament."
                                : "All-time standings across every tournament."
                        }
                    </p>
                </div>

                <div className="form-group">
                    <label>Tournament</label>
                    <select
                        value={tournamentId}
                        onChange={(event) => setTournamentId(event.target.value)}
                    >
                        <option value="">Global (all tournaments)</option>
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
            {error && <p className="ranking-error">{error}</p>}

            {
                !loading && !error && (
                    rows.length === 0
                        ? <p className="ranking-empty">No ranked players yet — results need to be registered first.</p>
                        : (
                            <div className="table-container">
                                <table className="ranking-table">
                                    <thead>
                                        <tr>
                                            <th><Medal size={15} /></th>
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
                                            rows.map((row, index) => (
                                                <tr key={row.id}>
                                                    <td className="ranking-position">{medal(index)}</td>
                                                    <td>{row.full_name}</td>
                                                    <td>{row.club}</td>
                                                    <td>{row.matches_played}</td>
                                                    <td>{row.wins}</td>
                                                    <td>{row.losses}</td>
                                                    <td>{row.sets_won} - {row.sets_lost}</td>
                                                    <td>{row.points_won} - {row.points_lost}</td>
                                                    <td>{row.win_rate ?? "-"}{row.win_rate != null ? "%" : ""}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                )
            }
        </div>
    );
}

export default RankingPage;