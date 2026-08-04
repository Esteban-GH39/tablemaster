import ActionMenu from "../../components/ui/ActionMenu/ActionMenu";
import Badge from "../../components/ui/Badge/Badge";

import { getStatusVariant } from "../../utils/status";
import { formatDate, formatStatus } from "../../utils/formatDate";

function TournamentRow({ tournament, onEdit }) {
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
            <td>
                <ActionMenu
                    onEdit={() => onEdit(tournament)}
                    onDelete={() =>
                        console.log(
                            "Delete",
                            tournament.id
                        )
                    }
                />
            </td>
        </tr>
    );
}

export default TournamentRow;