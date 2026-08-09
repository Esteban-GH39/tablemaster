import { useNavigate } from "react-router-dom";
import { ListChecks } from "lucide-react";

import ActionMenu from "../../components/ui/ActionMenu/ActionMenu";
import Badge from "../../components/ui/Badge/Badge";

import { getStatusVariant, formatStatus } from "../../utils/status";
import { formatDate } from "../../utils/formatDate";

function TournamentRow({ tournament, onEdit, onDelete }) {

    const navigate = useNavigate();

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
                    onDelete={() => onDelete(tournament)}
                    extraActions={[
                        {
                            label: "Manage entries",
                            icon: <ListChecks size={15} />,
                            onClick: () => navigate(`/tournaments/${tournament.id}`)
                        }
                    ]}
                />
            </td>
        </tr>
    );
}

export default TournamentRow;