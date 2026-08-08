import { Link } from "react-router-dom";
import { PlusCircle, Trophy, Target, ClipboardList } from "lucide-react";

const actions = [
    { label: "New Tournament", path: "/tournaments", icon: Trophy },
    { label: "New Match", path: "/matches", icon: Target },
    { label: "Register a Result", path: "/matches", icon: ClipboardList },
    { label: "New Player", path: "/players", icon: PlusCircle }
];

function QuickActions() {
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