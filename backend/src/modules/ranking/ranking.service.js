import { pool } from "../../config/database.js";

export const getGlobalRanking = async () => {
    const result = await pool.query(`
        SELECT
            p.id,
            p.full_name,
            p.club,
            COALESCE(SUM(s.matches_played), 0) AS matches_played,
            COALESCE(SUM(s.matches_won), 0) AS wins,
            COALESCE(SUM(s.matches_lost), 0) AS losses,
            COALESCE(SUM(s.sets_won), 0) AS sets_won,
            COALESCE(SUM(s.sets_lost), 0) AS sets_lost,
            COALESCE(SUM(s.points_won), 0) AS points_won,
            COALESCE(SUM(s.points_lost), 0) AS points_lost,
            ROUND(
                (
                    COALESCE(SUM(s.matches_won),0)::numeric
                    /
                    NULLIF(COALESCE(SUM(s.matches_played),0),0)
                ) * 100,
                2
            ) AS win_rate
        FROM players p
        LEFT JOIN statistics s
            ON s.player_id = p.id
        GROUP BY
            p.id,
            p.full_name,
            p.club
        ORDER BY
            wins DESC,
            win_rate DESC,
            sets_won DESC,
            points_won DESC,
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
            s.matches_played,
            s.matches_won AS wins,
            s.matches_lost AS losses,
            s.sets_won,
            s.sets_lost,
            s.points_won,
            s.points_lost,
            ROUND(
                (
                    s.matches_won::numeric
                    /
                    NULLIF(s.matches_played,0)
                ) * 100,
                2
            ) AS win_rate
        FROM statistics s
        INNER JOIN players p
            ON p.id = s.player_id
        WHERE s.tournament_id = $1
        ORDER BY
            s.matches_won DESC,
            win_rate DESC,
            s.sets_won DESC,
            s.points_won DESC,
            p.full_name;
    `, [tournamentId]);
    return result.rows;
};