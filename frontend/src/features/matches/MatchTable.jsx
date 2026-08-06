import MatchRow from "./MatchRow";

function MatchTable({ matches, playerName, tournamentName, onEdit, onDelete }) {
    return (
        <div className="table-container">
            <table className="matches-table">
                <thead>
                    <tr>
                        <th>Tournament</th>
                        <th>Round</th>
                        <th>Player One</th>
                        <th>Player Two</th>
                        <th>Winner</th>
                        <th>Status</th>
                        <th>Played At</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        matches.length === 0
                            ? (
                                <tr>
                                    <td colSpan={8} className="match-empty">
                                        No matches found
                                    </td>
                                </tr>
                            )
                            : matches.map((match) => (
                                <MatchRow
                                    key={match.id}
                                    match={match}
                                    playerName={playerName}
                                    tournamentName={tournamentName}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default MatchTable;
