import { Link } from "react-router-dom";
import { Medal } from "lucide-react";

function TopPlayers({ players }) {
    const medal = (position) => {
        if (position === 0) return "🥇";
        if (position === 1) return "🥈";
        if (position === 2) return "🥉";
        return position + 1;
    };

    return (
        <div className="dashboard-card">
            <div className="dashboard-card-header">
                <h3><Medal size={17} /> Top Players</h3>
                <Link to="/ranking">View all</Link>
            </div>

            {
                players.length === 0
                    ? <p className="dashboard-empty">No ranked players yet.</p>
                    : (
                        <ul className="dashboard-list">
                            {
                                players.map((player, index) => (
                                    <li key={player.id} className="dashboard-list-item">
                                        <div className="dashboard-player-info">
                                            <span className="dashboard-player-position">{medal(index)}</span>
                                            <span>{player.full_name}</span>
                                        </div>
                                        <span className="dashboard-result-date">
                                            {player.wins}W - {player.losses}L
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    )
            }
        </div>
    );
}

export default TopPlayers;