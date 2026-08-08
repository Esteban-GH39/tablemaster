import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";

import Badge from "../ui/Badge/Badge";
import { getStatusVariant, formatStatus } from "../../utils/status";
import { formatDate } from "../../utils/formatDate";

function UpcomingTournaments({ tournaments }) {
    return (
        <div className="dashboard-card">
            <div className="dashboard-card-header">
                <h3><CalendarDays size={17} /> Upcoming Tournaments</h3>
                <Link to="/tournaments">View all</Link>
            </div>

            {
                tournaments.length === 0
                    ? <p className="dashboard-empty">No upcoming tournaments.</p>
                    : (
                        <ul className="dashboard-list">
                            {
                                tournaments.map((tournament) => (
                                    <li key={tournament.id} className="dashboard-list-item">
                                        <div className="dashboard-tournament-info">
                                            <span className="dashboard-tournament-name">{tournament.name}</span>
                                            <span className="dashboard-tournament-location">{tournament.location}</span>
                                        </div>
                                        <div className="dashboard-tournament-meta">
                                            <Badge variant={getStatusVariant(tournament.status)}>
                                                {formatStatus(tournament.status)}
                                            </Badge>
                                            <span className="dashboard-result-date">
                                                {formatDate(tournament.startDate)}
                                            </span>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )
            }
        </div>
    );
}

export default UpcomingTournaments;