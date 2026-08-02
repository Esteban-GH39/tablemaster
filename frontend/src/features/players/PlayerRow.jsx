import ActionMenu from "../../components/ui/ActionMenu/ActionMenu";

import Avatar from "../../components/ui/Avatar/Avatar";

function PlayerRow({ player, onEdit }) {
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
            <td>{player.playStyle}</td>
            <td>{player.dominantHand}</td>
            <td>
                <ActionMenu 
                    onEdit={() => onEdit(player)}
                    onDelete={() => console.log("Delete", player.id)}
                />
            </td>
        </tr>
    );
}

export default PlayerRow;