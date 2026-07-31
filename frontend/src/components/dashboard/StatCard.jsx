import "./StatCard.css";

function StatCard({
    title,
    value,
    icon,
    description = "",
    action = "View details"
}) {
    
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
            <button className="stat-link">
                {action} →
            </button>
        </div>
    );
}

export default StatCard;