import { pool } from "../../config/database.js";

export const getPlayerStatistics = async (playerId) => {
    const result = await pool.query(
        `
        SELECT
            SUM(matches_played) AS matches_played,
            SUM(matches_won) AS wins,
            SUM(matches_lost) AS losses,
            SUM(sets_won) AS sets_won,
            SUM(sets_lost) AS sets_lost,
            SUM(points_won) AS points_won,
            SUM(points_lost) AS points_lost
        FROM statistics
        WHERE player_id = $1
        `,
        [playerId]
    );
    return result.rows[0];
};

export const getTournamentStatistics = async (tournamentId) => {
    const players = await pool.query(
        `
        SELECT COUNT(*) total
        FROM statistics
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
                : Math.round(
                    (finishedMatches / totalMatches) * 100
                )
    };
};

export const updateStatistics = async (
    tournamentId,
    playerId,
    won,
    setsWon,
    setsLost,
    pointsWon,
    pointsLost
) => {
    const exists = await pool.query(
        `
        SELECT id
        FROM statistics
        WHERE
            tournament_id = $1
            AND player_id = $2
        `,
        [
            tournamentId,
            playerId
        ]
    );
    if (!exists.rows.length) {
        await pool.query(
            `
            INSERT INTO statistics
            (
                tournament_id,
                player_id,
                matches_played,
                matches_won,
                matches_lost,
                sets_won,
                sets_lost,
                points_won,
                points_lost
            )
            VALUES
            (
                $1,
                $2,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            )
            `,
            [
                tournamentId,
                playerId
            ]
        );
    }
    await pool.query(
        `
        UPDATE statistics
        SET
            matches_played = matches_played + 1,
            matches_won =
                matches_won + $3,
            matches_lost =
                matches_lost + $4,
            sets_won =
                sets_won + $5,
            sets_lost =
                sets_lost + $6,
            points_won =
                points_won + $7,
            points_lost =
                points_lost + $8,
            updated_at = CURRENT_TIMESTAMP
        WHERE
            tournament_id = $1
            AND player_id = $2
        `,
        [
            tournamentId,
            playerId,
            won ? 1 : 0,
            won ? 0 : 1,
            setsWon,
            setsLost,
            pointsWon,
            pointsLost
        ]
    );
};