import PlayerRow from "./PlayerRow";

function PlayerTable({ players }) {
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
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default PlayerTable;