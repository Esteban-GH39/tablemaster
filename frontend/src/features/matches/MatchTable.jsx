import MatchRow from "./MatchRow";

function MatchTable({ matches, playerName, tournamentName, canManage, canRegisterResults, onEdit, onDelete, onRegisterResult }) {

    const showActionsColumn = canManage || canRegisterResults;

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
                        <th>Format</th>
                        <th>Status</th>
                        <th>Played At</th>
                        {showActionsColumn && <th></th>}
                    </tr>
                </thead>
                <tbody>
                    {
                        matches.length === 0
                            ? (
                                <tr>
                                    <td colSpan={showActionsColumn ? 9 : 8} className="match-empty">
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
                                    canManage={canManage}
                                    canRegisterResults={canRegisterResults}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    onRegisterResult={onRegisterResult}
                                />
                            ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default MatchTable;
