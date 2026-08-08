import "./MiniStatCard.css";

function MiniStatCard({
    icon: Icon,
    label,
    value,
    tone = "secondary"
}) {
    return (
        <div className={`mini-stat-card mini-stat-${tone}`}>
            <span className="mini-stat-icon">
                <Icon size={20} />
            </span>
            <div className="mini-stat-text">
                <span className="mini-stat-value">{value}</span>
                <span className="mini-stat-label">{label}</span>
            </div>
        </div>
    );
}

export default MiniStatCard;