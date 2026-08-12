import PlayerRow from "./PlayerRow";

function PlayerTable({ players, onEdit, onDelete, canEditRow }) {
    return (
        <div className="table-container">
            <table className="players-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Club</th>
                        <th>Age</th>
                        <th>Style</th>
                        <th>Hand</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        players.map((player) => (
                            <PlayerRow
                                key={player.id}
                                player={player}
                                onEdit={
                                    onEdit && (!canEditRow || canEditRow(player))
                                        ? onEdit
                                        : undefined
                                }
                                onDelete={onDelete}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default PlayerTable;