import { Users } from "lucide-react";

import Badge from "../../components/ui/Badge/Badge";
import ActionMenu from "../../components/ui/ActionMenu/ActionMenu";

function TeamRow({ team, onEdit, onDelete, onManagePlayers }) {
    return (
        <tr>
            <td>{team.name}</td>
            <td>
                <span className="team-tag">{team.type}</span>
            </td>
            <td>
                <Badge variant={team.format === "doubles" ? "info" : "default"}>
                    {team.format}
                </Badge>
            </td>
            <td>
                <button
                    type="button"
                    className="team-manage-players-btn"
                    onClick={() => onManagePlayers(team)}
                >
                    <Users size={15} />
                    Manage players
                </button>
            </td>
            <td>
                <div className="team-actions-cell">
                    <ActionMenu
                        onEdit={() => onEdit(team)}
                        onDelete={() => onDelete(team)}
                    />
                </div>
            </td>
        </tr>
    );
}

export default TeamRow;
