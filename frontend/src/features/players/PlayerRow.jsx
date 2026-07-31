import { MoreVertical } from "lucide-react";

import Avatar from "../../components/ui/Avatar/Avatar";

function PlayerRow({ player }) {
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
                <button className="icon-button">
                    <MoreVertical size={18}/>
                </button>
            </td>
        </tr>
    );
}

export default PlayerRow;