import { Trophy } from "lucide-react";

import ActionMenu from "../../components/ui/ActionMenu/ActionMenu";
import Badge from "../../components/ui/Badge/Badge";

import { getStatusVariant, formatStatus } from "../../utils/status";
import { formatDate } from "../../utils/formatDate";
import { MATCH_FORMAT_LABELS } from "../../utils/constants";

function MatchRow({ match, playerName, tournamentName, onEdit, onDelete, onRegisterResult }) {
    const canRegisterResult =
        !!onRegisterResult &&
        match.status !== "finished" &&
        match.status !== "cancelled" &&
        !!match.playerOneId &&
        !!match.playerTwoId;

    const hasAnyAction = !!onEdit || !!onDelete || canRegisterResult;

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
                {MATCH_FORMAT_LABELS[match.setsToWin] ?? `First to ${match.setsToWin}`}
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
                {
                    hasAnyAction && (
                        <ActionMenu
                            onEdit={onEdit ? () => onEdit(match) : undefined}
                            onDelete={onDelete ? () => onDelete(match) : undefined}
                            extraActions={
                                canRegisterResult
                                    ? [{
                                        label: "Register Result",
                                        icon: <Trophy size={15} />,
                                        onClick: () => onRegisterResult(match)
                                    }]
                                    : []
                            }
                        />
                    )
                }
            </td>
        </tr>
    );
}

export default MatchRow;
