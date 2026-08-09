import "./GroupStandingsView.css";

function GroupCard({ group, matches, playerName }) {

    const standings = group.standings;

    // posición (1-based) de cada jugador dentro del grupo, para la
    // numeración de la crosstable y del calendario (J1, J2, J3...)
    const positionByPlayerId = new Map(
        standings.map((entry) => [entry.playerId, entry.position])
    );

    const groupMatches = matches
        .filter((match) => match.groupId === group.id)
        .sort((a, b) => a.matchOrder - b.matchOrder);

    const resultBetween = (rowPlayerId, colPlayerId) => {

        const match = groupMatches.find((match) =>
            (match.playerOneId === rowPlayerId && match.playerTwoId === colPlayerId) ||
            (match.playerOneId === colPlayerId && match.playerTwoId === rowPlayerId)
        );

        if (!match) return null;
        if (match.status !== "finished") return { pending: true };

        const rowWon = match.winnerId === rowPlayerId;
        return { pending: false, won: rowWon };

    };

    return (
        <div className="group-card">

            <div className="group-card-header">
                <h3>Group {group.name}</h3>
            </div>

            <div className="group-crosstable-wrap">
                <table className="group-crosstable">
                    <thead>
                        <tr>
                            <th className="group-crosstable-name-col"></th>
                            {
                                standings.map((entry) => (
                                    <th key={entry.entryId}>
                                        {entry.position}
                                    </th>
                                ))
                            }
                            <th>Pts.</th>
                            <th>Pos.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            standings.map((rowEntry) => (
                                <tr key={rowEntry.entryId}>
                                    <td className="group-crosstable-name-col">
                                        <span className="group-crosstable-pos">{rowEntry.position}</span>
                                        {rowEntry.fullName}
                                    </td>
                                    {
                                        standings.map((colEntry) => {

                                            if (colEntry.entryId === rowEntry.entryId) {
                                                return (
                                                    <td key={colEntry.entryId} className="group-crosstable-diagonal" />
                                                );
                                            }

                                            const result = resultBetween(rowEntry.playerId, colEntry.playerId);

                                            return (
                                                <td key={colEntry.entryId} className="group-crosstable-cell">
                                                    {
                                                        !result ? (
                                                            "—"
                                                        ) : result.pending ? (
                                                            <span className="group-crosstable-pending">·</span>
                                                        ) : (
                                                            <span className={result.won ? "is-win" : "is-loss"}>
                                                                {result.won ? "W" : "L"}
                                                            </span>
                                                        )
                                                    }
                                                </td>
                                            );

                                        })
                                    }
                                    <td className="group-crosstable-pts">{rowEntry.wins * 2}</td>
                                    <td className="group-crosstable-pts">{rowEntry.position}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="group-schedule">
                {
                    groupMatches.map((match, index) => {

                        const posOne = positionByPlayerId.get(match.playerOneId);
                        const posTwo = positionByPlayerId.get(match.playerTwoId);

                        return (
                            <div key={match.id} className="group-schedule-row">
                                <span className="group-schedule-label">
                                    J{index + 1} · {posOne} vs {posTwo}
                                </span>
                                <span className="group-schedule-players">
                                    {playerName(match.playerOneId)} vs {playerName(match.playerTwoId)}
                                </span>
                                <span className={`group-schedule-status ${match.status === "finished" ? "is-finished" : ""}`}>
                                    {
                                        match.status === "finished"
                                            ? `Winner: ${playerName(match.winnerId)}`
                                            : "Pending"
                                    }
                                </span>
                            </div>
                        );

                    })
                }
            </div>

        </div>
    );

}

function GroupStandingsView({ groups, matches, playerName }) {

    if (!groups.length) {
        return (
            <div className="group-standings-empty">
                No group stage data yet.
            </div>
        );
    }

    return (
        <div className="group-standings">
            {
                groups.map((group) => (
                    <GroupCard
                        key={group.id}
                        group={group}
                        matches={matches}
                        playerName={playerName}
                    />
                ))
            }
        </div>
    );

}

export default GroupStandingsView;