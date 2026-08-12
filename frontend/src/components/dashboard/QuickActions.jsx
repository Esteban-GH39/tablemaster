import { useContext } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Trophy, Target, ClipboardList, BarChart3, Users } from "lucide-react";

import { AuthContext } from "../../context/AuthContext";

const managementActions = [
    { label: "New Tournament", path: "/tournaments", icon: Trophy },
    { label: "New Match", path: "/matches", icon: Target },
    { label: "Register a Result", path: "/matches", icon: ClipboardList },
    { label: "New Player", path: "/players", icon: PlusCircle }
];

const playerActions = [
    { label: "Join a Tournament", path: "/tournaments", icon: Trophy },
    { label: "My Matches", path: "/matches", icon: Target },
    { label: "View Ranking", path: "/ranking", icon: BarChart3 },
    { label: "Browse Players", path: "/players", icon: Users }
];

function QuickActions() {

    const { role } = useContext(AuthContext);

    const actions =
        role === "admin" || role === "organizer"
            ? managementActions
            : playerActions;

    return (
        <div className="dashboard-card">
            <div className="dashboard-card-header">
                <h3>Quick Actions</h3>
            </div>

            <div className="quick-actions-grid">
                {
                    actions.map((action) => {
                        const Icon = action.icon;
                        return (
                            <Link key={action.label} to={action.path} className="quick-action-item">
                                <Icon size={18} />
                                <span>{action.label}</span>
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default QuickActions;
