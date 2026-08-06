import TeamRow from "./TeamRow";

function TeamTable({ teams, onEdit, onDelete, onManagePlayers }) {
    return (
        <div className="table-container">
            <table className="teams-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Format</th>
                        <th>Players</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        teams.map((team) => (
                            <TeamRow
                                key={team.id}
                                team={team}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onManagePlayers={onManagePlayers}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default TeamTable;
