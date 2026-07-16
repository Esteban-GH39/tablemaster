import { pool } from "../../config/database.js";

export const getGlobalRanking = async () => {
    const result = await pool.query(`
        SELECT
            p.id,
            p.full_name,
            p.club,
            COUNT(m.id) FILTER (
                WHERE m.status = 'finished'
            ) AS matches_played,
            COUNT(m.id) FILTER (
                WHERE m.status = 'finished'
                AND m.winner_id = p.id
            ) AS wins,
            COUNT(m.id) FILTER (
                WHERE m.status = 'finished'
                AND m.winner_id IS NOT NULL
                AND m.winner_id <> p.id
            ) AS losses,
            ROUND(
                (
                    COUNT(m.id) FILTER (
                        WHERE m.status = 'finished'
                        AND m.winner_id = p.id
                    )::numeric
                    /
                    NULLIF(
                        COUNT(m.id) FILTER (
                            WHERE m.status = 'finished'
                        ),
                        0
                    )
                ) * 100,
                2
            ) AS win_rate
        FROM players p
        LEFT JOIN matches m
            ON (
                m.player_one_id = p.id
                OR
                m.player_two_id = p.id
            )
        GROUP BY
            p.id,
            p.full_name,
            p.club
        ORDER BY
            wins DESC,
            win_rate DESC,
            matches_played DESC,
            p.full_name;
    `);
    return result.rows;
};

export const getTournamentRanking = async (tournamentId) => {
    const result = await pool.query(`
        SELECT
            p.id,
            p.full_name,
            p.club,
            COUNT(m.id) FILTER (
                WHERE m.status = 'finished'
            ) AS matches_played,
            COUNT(m.id) FILTER (
                WHERE m.status = 'finished'
                AND m.winner_id = p.id
            ) AS wins,
            COUNT(m.id) FILTER (
                WHERE m.status = 'finished'
                AND m.winner_id IS NOT NULL
                AND m.winner_id <> p.id
            ) AS losses,
            ROUND(
                (
                    COUNT(m.id) FILTER (
                        WHERE m.status = 'finished'
                        AND m.winner_id = p.id
                    )::numeric
                    /
                    NULLIF(
                        COUNT(m.id) FILTER (
                            WHERE m.status = 'finished'
                        ),
                        0
                    )
                ) * 100,
                2
            ) AS win_rate
        FROM players p
        LEFT JOIN matches m
            ON (
                m.player_one_id = p.id
                OR
                m.player_two_id = p.id
            )
            AND m.tournament_id = $1
        GROUP BY
            p.id,
            p.full_name,
            p.club
        ORDER BY
            wins DESC,
            win_rate DESC,
            matches_played DESC,
            p.full_name;
    `, [tournamentId]);
    return result.rows;
}