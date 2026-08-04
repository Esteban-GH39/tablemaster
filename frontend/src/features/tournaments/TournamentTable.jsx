import TournamentRow from "./TournamentRow";

function TournamentTable({tournaments, onEdit}) {
    return (
        <div className="table-container">
            <table className="tournaments-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Dates</th>
                        <th>Players</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tournaments.map((tournament) => (
                            <TournamentRow
                                key={tournament.id}
                                tournament={tournament}
                                onEdit={onEdit}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default TournamentTable;