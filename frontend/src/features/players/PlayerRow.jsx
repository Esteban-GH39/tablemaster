import Avatar from "../../components/ui/Avatar/Avatar";
import ActionMenu from "../../components/ui/ActionMenu/ActionMenu";

function PlayerRow({ player, onEdit, onDelete }) {
    return (
        <tr>
            <td>
                <Avatar
                    name={player.fullName}
                />
            </td>
            <td>{player.fullName}</td>
            <td>{player.club}</td>
            <td>{player.age}</td>
            <td><span className="player-tag">{player.playStyle}</span></td>
            <td><span className="player-tag">{player.dominantHand}</span></td>
            <td>
                {
                    (onEdit || onDelete) && (
                        <div className="player-actions-cell">
                            <ActionMenu
                                onEdit={onEdit ? () => onEdit(player) : undefined}
                                onDelete={onDelete ? () => onDelete(player) : undefined}
                            />
                        </div>
                    )
                }
            </td>
        </tr>
    );
}

export default PlayerRow;