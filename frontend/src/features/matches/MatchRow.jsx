import ActionMenu from "../../components/ui/ActionMenu/ActionMenu";
import Badge from "../../components/ui/Badge/Badge";

import { getStatusVariant, formatStatus } from "../../utils/status";
import { formatDate } from "../../utils/formatDate";

function MatchRow({ match, playerName, tournamentName, onEdit, onDelete }) {
    return (
        <tr>
            <td>
                {tournamentName(match.tournamentId)}
            </td>
            <td>
                {match.round}
            </td>
            <td>
                {playerName(match.playerOneId)}
            </td>
            <td>
                {playerName(match.playerTwoId)}
            </td>
            <td>
                {
                    match.winnerId
                        ? <strong>{playerName(match.winnerId)}</strong>
                        : "-"
                }
            </td>
            <td>
                <Badge
                    variant={getStatusVariant(match.status)}
                >
                    {formatStatus(match.status)}
                </Badge>
            </td>
            <td>
                {formatDate(match.playedAt)}
            </td>
            <td>
                <ActionMenu
                    onEdit={() => onEdit(match)}
                    onDelete={() => onDelete(match)}
                />
            </td>
        </tr>
    );
}

export default MatchRow;
