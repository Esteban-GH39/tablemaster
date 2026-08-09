import { pool } from "../../config/database.js";

const mapEntry = (row) => ({
    entryId: row.entry_id,
    playerId: row.player_id,
    fullName: row.full_name,
    club: row.club,
    seed: row.seed,
    wins: row.wins,
    losses: row.losses,
    setsWon: row.sets_won,
    setsLost: row.sets_lost,
    pointsWon: row.points_won,
    pointsLost: row.points_lost
});

export const getGroupsByTournament = async (tournamentId) => {

    const result = await pool.query(
        `
        SELECT
            g.id AS group_id,
            g.name AS group_name,
            te.id AS entry_id,
            te.seed,
            p.id AS player_id,
            p.full_name,
            p.club,
            ge.wins,
            ge.losses,
            ge.sets_won,
            ge.sets_lost,
            ge.points_won,
            ge.points_lost
        FROM groups g
        JOIN stages s ON g.stage_id = s.id
        JOIN competitions c ON s.competition_id = c.id
        JOIN group_entries ge ON ge.group_id = g.id
        JOIN tournament_entries te ON te.id = ge.entry_id
        LEFT JOIN players p ON p.id = te.player_id
        WHERE c.tournament_id = $1
        ORDER BY
            g.name ASC,
            ge.wins DESC,
            (ge.sets_won - ge.sets_lost) DESC,
            (ge.points_won - ge.points_lost) DESC
        `,
        [tournamentId]
    );

    const groups = new Map();

    for (const row of result.rows) {

        if (!groups.has(row.group_id)) {
            groups.set(row.group_id, {
                id: row.group_id,
                name: row.group_name,
                standings: []
            });
        }

        groups.get(row.group_id).standings.push(mapEntry(row));

    }

    return [...groups.values()].map((group) => ({
        ...group,
        standings: group.standings.map((entry, index) => ({
            ...entry,
            position: index + 1
        }))
    }));

};