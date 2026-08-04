import ActionMenu from "../../components/ui/ActionMenu/ActionMenu";

function TournamentRow({tournament, onEdit}) {
    return (
        <tr>
            <td>
                <strong>{tournament.name}</strong>
            </td>
            <td>
                {tournament.location}
            </td>
            <td>
                <span
                    className={`status-badge status-${tournament.status}`}
                >
                    {tournament.status}
                </span>
            </td>
            <td>
                {tournament.startDate}
                <br />
                <small>
                    {tournament.endDate}
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