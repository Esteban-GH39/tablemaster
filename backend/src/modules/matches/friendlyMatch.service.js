import { pool } from "../../config/database.js";
import { registerMatchResult } from "../matchResults/matchResult.service.js";
import { getPlayerByUserId } from "../players/player.service.js";

export const proposeFriendlyMatch = async (userId, opponentId, sets, setsToWin = 3) => {
    const proposer = await getPlayerByUserId(userId);
    if (!proposer) {
        throw new Error("You need your own player profile before challenging someone");
    }
    if (proposer.id === opponentId) {
        throw new Error("You cannot challenge yourself");
    }

    const opponentCheck = await pool.query(
        `SELECT id, full_name FROM players WHERE id = $1`,
        [opponentId]
    );
    if (!opponentCheck.rows.length) {
        throw new Error("Opponent not found");
    }

    await pool.query("BEGIN");
    try {
        const matchResult = await pool.query(
            `
            INSERT INTO matches
            (
                tournament_id,
                stage_id,
                player_one_id,
                player_two_id,
                round,
                match_order,
                sets_to_win,
                status,
                proposed_by_player_id
            )
            VALUES
            (
                NULL, NULL, $1, $2, 'Friendly', 1, $3, 'pending_confirmation', $1
            )
            RETURNING *;
            `,
            [proposer.id, opponentId, setsToWin]
        );
        const match = matchResult.rows[0];

        await pool.query(
            `
            INSERT INTO match_result_proposals (match_id, sets)
            VALUES ($1, $2::jsonb);
            `,
            [match.id, JSON.stringify(sets)]
        );

        await pool.query("COMMIT");
        return match;
    } catch (error) {
        await pool.query("ROLLBACK");
        throw error;
    }
};

const getMatchWithProposal = async (matchId) => {
    const { rows } = await pool.query(
        `
        SELECT m.*, p.sets AS proposed_sets
        FROM matches m
        JOIN match_result_proposals p ON p.match_id = m.id
        WHERE m.id = $1;
        `,
        [matchId]
    );
    return rows[0];
};

const assertIsOpponent = (match, requestingPlayerId) => {
    if (match.status !== "pending_confirmation") {
        throw new Error("This match is not waiting for confirmation");
    }
    const isParticipant =
        match.player_one_id === requestingPlayerId ||
        match.player_two_id === requestingPlayerId;
    if (!isParticipant) {
        throw new Error("You are not a participant in this match");
    }
    if (match.proposed_by_player_id === requestingPlayerId) {
        throw new Error("You cannot confirm a result you proposed yourself — waiting for your opponent");
    }
};

export const confirmFriendlyMatch = async (matchId, userId) => {
    const confirmingPlayer = await getPlayerByUserId(userId);
    if (!confirmingPlayer) {
        throw new Error("Player profile not found");
    }

    const match = await getMatchWithProposal(matchId);
    if (!match) {
        throw new Error("Match not found");
    }
    assertIsOpponent(match, confirmingPlayer.id);

    await pool.query(
        `UPDATE matches SET status = 'pending' WHERE id = $1;`,
        [matchId]
    );

    const result = await registerMatchResult(matchId, match.proposed_sets);

    await pool.query(
        `DELETE FROM match_result_proposals WHERE match_id = $1;`,
        [matchId]
    );

    return result;
};

export const rejectFriendlyMatch = async (matchId, userId) => {
    const rejectingPlayer = await getPlayerByUserId(userId);
    if (!rejectingPlayer) {
        throw new Error("Player profile not found");
    }

    const match = await getMatchWithProposal(matchId);
    if (!match) {
        throw new Error("Match not found");
    }
    assertIsOpponent(match, rejectingPlayer.id);

    await pool.query(
        `UPDATE matches SET status = 'rejected', updated_at = CURRENT_TIMESTAMP WHERE id = $1;`,
        [matchId]
    );
    await pool.query(
        `DELETE FROM match_result_proposals WHERE match_id = $1;`,
        [matchId]
    );

    return { message: "Match result rejected" };
};

export const getPendingConfirmationsForUser = async (userId) => {
    const player = await getPlayerByUserId(userId);
    if (!player) return [];

    const { rows } = await pool.query(
        `
        SELECT
            m.id,
            m.round,
            m.sets_to_win,
            m.created_at,
            po.full_name AS "proposerName",
            m.player_one_id AS "playerOneId",
            m.player_two_id AS "playerTwoId",
            p.sets AS "proposedSets"
        FROM matches m
        JOIN match_result_proposals p ON p.match_id = m.id
        JOIN players po ON po.id = m.proposed_by_player_id
        WHERE
            m.status = 'pending_confirmation'
            AND m.proposed_by_player_id <> $1
            AND (m.player_one_id = $1 OR m.player_two_id = $1)
        ORDER BY m.created_at DESC;
        `,
        [player.id]
    );
    return rows;
};
