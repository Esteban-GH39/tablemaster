import { Link } from "react-router-dom";
import { ListChecks } from "lucide-react";

import ActionMenu from "../../components/ui/ActionMenu/ActionMenu";
import Badge from "../../components/ui/Badge/Badge";

import { getStatusVariant, formatStatus } from "../../utils/status";
import { formatDate } from "../../utils/formatDate";

function TournamentRow({ tournament, onEdit, onDelete }) {

    return (
        <tr>
            <td>
                <strong>{tournament.name}</strong>
            </td>
            <td>
                {tournament.location}
            </td>
            <td>
                <Badge
                    variant={getStatusVariant(tournament.status)}
                >
                    {formatStatus(tournament.status)}
                </Badge>
            </td>
            <td>
                {formatDate(tournament.startDate)}
                <br/>
                <small>
                    {formatDate(tournament.endDate)}
                </small>
            </td>
            <td>
                {tournament.maxPlayers}
            </td>
            <td className="tournament-row-actions">
                <Link
                    to={`/tournaments/${tournament.id}`}
                    className="tournament-view-link"
                >
                    <ListChecks size={15} />
                    View
                </Link>

                {
                    (onEdit || onDelete) && (
                        <ActionMenu
                            onEdit={onEdit ? () => onEdit(tournament) : undefined}
                            onDelete={onDelete ? () => onDelete(tournament) : undefined}
                        />
                    )
                }
            </td>
        </tr>
    );
}

export default TournamentRow;