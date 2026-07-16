import { pool } from "../../config/database.js";

export const getPlayerStatistics = async (playerId) => {
    const result = await pool.query(
        `
        SELECT
            COUNT(*) FILTER (
                WHERE status = 'finished'
            ) AS matches_played,
            COUNT(*) FILTER (
                WHERE winner_id = $1
            ) AS wins,
            COUNT(*) FILTER (
                WHERE status = 'finished'
                AND winner_id <> $1
            ) AS losses
        FROM matches
        WHERE
            player_one_id = $1
            OR player_two_id = $1
        `,
        [playerId]
    );
    return result.rows[0];
};

export const getTournamentStatistics = async (tournamentId) => {
    const players = await pool.query(
        `
        SELECT COUNT(*) total
        FROM tournament_entries
        WHERE tournament_id = $1
        `,
        [tournamentId]
    );
    const matches = await pool.query(
        `
        SELECT
            COUNT(*) total,
            COUNT(*) FILTER (
                WHERE status = 'finished'
            ) finished,
            COUNT(*) FILTER (
                WHERE status <> 'finished'
            ) pending
        FROM matches
        WHERE tournament_id = $1
        `,
        [tournamentId]
    );
    const groups = await pool.query(
        `
        SELECT COUNT(*) total
        FROM groups g
        INNER JOIN stages s
            ON s.id = g.stage_id
        INNER JOIN competitions c
            ON c.id = s.competition_id
        WHERE c.tournament_id = $1
        `,
        [tournamentId]
    );
    const totalMatches = Number(matches.rows[0].total);
    const finishedMatches = Number(matches.rows[0].finished);
    return {
        players: Number(players.rows[0].total),
        matches: totalMatches,
        finishedMatches,
        pendingMatches: Number(matches.rows[0].pending),
        groups: Number(groups.rows[0].total),
        completion:
            totalMatches === 0
                ? 0
                : Math.round((finishedMatches / totalMatches) * 100                )
    };
};