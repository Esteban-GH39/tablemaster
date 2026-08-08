import { Link } from "react-router-dom";
import { Swords } from "lucide-react";

import { formatDate } from "../../utils/formatDate";

function RecentResults({ matches, playerName }) {
    return (
        <div className="dashboard-card">
            <div className="dashboard-card-header">
                <h3><Swords size={17} /> Recent Results</h3>
                <Link to="/matches">View all</Link>
            </div>

            {
                matches.length === 0
                    ? <p className="dashboard-empty">No results registered yet.</p>
                    : (
                        <ul className="dashboard-list">
                            {
                                matches.map((match) => (
                                    <li key={match.id} className="dashboard-list-item">
                                        <div className="dashboard-result-players">
                                            <span className={match.winnerId === match.playerOneId ? "dashboard-winner" : ""}>
                                                {playerName(match.playerOneId)}
                                            </span>
                                            <span className="dashboard-result-vs">vs</span>
                                            <span className={match.winnerId === match.playerTwoId ? "dashboard-winner" : ""}>
                                                {playerName(match.playerTwoId)}
                                            </span>
                                        </div>
                                        <span className="dashboard-result-date">
                                            {formatDate(match.playedAt)}
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

export default RecentResults;