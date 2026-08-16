import { pool } from "../../config/database.js";

export const getPlayerInsights = async () => {
    const { rows } = await pool.query(`
        SELECT
            pi.player_id,
            p.full_name,
            p.club,
            pi.matches_played,
            pi.matches_won,
            pi.matches_lost,
            pi.win_rate_percent,
            pi.computed_at
        FROM player_insights pi
        JOIN players p ON p.id = pi.player_id
        ORDER BY pi.win_rate_percent DESC, pi.matches_played DESC;
    `);

    return rows.map((row) => ({
        playerId: row.player_id,
        fullName: row.full_name,
        club: row.club,
        matchesPlayed: row.matches_played,
        matchesWon: row.matches_won,
        matchesLost: row.matches_lost,
        winRatePercent: Number(row.win_rate_percent),
        computedAt: row.computed_at
    }));
};

export const getMatchPredictions = async () => {
    const { rows } = await pool.query(`
        SELECT
            mp.match_id,
            m.round,
            m.status,
            po.id AS player_one_id,
            po.full_name AS player_one_name,
            pt.id AS player_two_id,
            pt.full_name AS player_two_name,
            mp.player_one_win_probability,
            mp.player_two_win_probability,
            mp.computed_at
        FROM match_predictions mp
        JOIN matches m ON m.id = mp.match_id
        JOIN players po ON po.id = m.player_one_id
        JOIN players pt ON pt.id = m.player_two_id
        ORDER BY mp.computed_at DESC;
    `);

    return rows.map((row) => ({
        matchId: row.match_id,
        round: row.round,
        status: row.status,
        playerOne: { id: row.player_one_id, fullName: row.player_one_name },
        playerTwo: { id: row.player_two_id, fullName: row.player_two_name },
        playerOneWinProbability: Number(row.player_one_win_probability),
        playerTwoWinProbability: Number(row.player_two_win_probability),
        computedAt: row.computed_at
    }));
};

export const getPredictionForMatch = async (matchId) => {
    const { rows } = await pool.query(
        `
        SELECT
            mp.match_id,
            po.id AS player_one_id,
            po.full_name AS player_one_name,
            pt.id AS player_two_id,
            pt.full_name AS player_two_name,
            mp.player_one_win_probability,
            mp.player_two_win_probability,
            mp.computed_at
        FROM match_predictions mp
        JOIN matches m ON m.id = mp.match_id
        JOIN players po ON po.id = m.player_one_id
        JOIN players pt ON pt.id = m.player_two_id
        WHERE mp.match_id = $1;
        `,
        [matchId]
    );

    if (!rows.length) return null;
    const row = rows[0];
    return {
        matchId: row.match_id,
        playerOne: { id: row.player_one_id, fullName: row.player_one_name },
        playerTwo: { id: row.player_two_id, fullName: row.player_two_name },
        playerOneWinProbability: Number(row.player_one_win_probability),
        playerTwoWinProbability: Number(row.player_two_win_probability),
        computedAt: row.computed_at
    };
};

export const getInsightsSummary = async () => {
    const { rows } = await pool.query(`
        SELECT
            COUNT(*)::int AS players_with_insights,
            COALESCE(ROUND(AVG(win_rate_percent), 1), 0) AS avg_win_rate,
            (SELECT MAX(computed_at) FROM player_insights) AS last_synced_at
        FROM player_insights;
    `);
    const predictionsCount = await pool.query(
        `SELECT COUNT(*)::int AS total FROM match_predictions;`
    );

    return {
        playersWithInsights: rows[0].players_with_insights,
        avgWinRate: Number(rows[0].avg_win_rate),
        lastSyncedAt: rows[0].last_synced_at,
        totalPredictions: predictionsCount.rows[0].total
    };
};
