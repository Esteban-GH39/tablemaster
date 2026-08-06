import { useNavigate } from "react-router-dom";

import "./StatCard.css";

function StatCard({
    title,
    value,
    icon,
    description = "",
    action = "View details",
    path,
    disabled = false
}) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (disabled || !path) return;
        navigate(path);
    };

    return (
        <div className="stat-card">
            <div className="stat-card-header">
                <span className="stat-icon">
                    {icon}
                </span>
                <h3>
                    {title}
                </h3>
            </div>
            <h2 className="stat-value">
                {value}
            </h2>
            <p className="stat-description">
                {description}
            </p>
            <button
                type="button"
                className="stat-link"
                onClick={handleClick}
                disabled={disabled || !path}
            >
                {disabled ? "Coming soon" : `${action} →`}
            </button>
        </div>
    );
}

export default StatCard;