import { pool } from "../../config/database.js";
import { getPlayerByUserId } from "../players/player.service.js";
import { validateMatch } from "../matchResults/matchResult.service.js";
import { registerMatchResult } from "../matchResults/matchResult.service.js";

const requirePlayer = async (userId) => {
    const player = await getPlayerByUserId(userId);
    if (!player) {
        throw new Error("Your account isn't linked to a player profile yet.");
    }
    return player;
};

const mapChallenge = (row) => ({
    id: row.id,
    playerOneId: row.player_one_id,
    playerTwoId: row.player_two_id,
    challengedBy: row.challenged_by,
    round: row.round,
    setsToWin: row.sets_to_win,
    status: row.status,
    proposedSets: row.proposed_sets,
    createdAt: row.created_at
});

export const createChallenge = async (userId, opponentPlayerId, sets, setsToWin) => {

    const me = await requirePlayer(userId);

    if (me.id === opponentPlayerId) {
        throw new Error("You can't challenge yourself.");
    }

    const opponent = await pool.query(
        "SELECT id FROM players WHERE id = $1",
        [opponentPlayerId]
    );

    if (!opponent.rows.length) {
        throw new Error("Opponent not found.");
    }

    const maxSets = setsToWin * 2 - 1;

    if (sets.length < setsToWin || sets.length > maxSets) {
        throw new Error(
            `This match is best of ${maxSets} (first to ${setsToWin} sets) — expected between ${setsToWin} and ${maxSets} sets.`
        );
    }

    validateMatch(sets, setsToWin);

    const result = await pool.query(
        `
        INSERT INTO matches
            (tournament_id, stage_id, group_id, player_one_id, player_two_id,
             round, match_order, sets_to_win, status, challenged_by, proposed_sets)
        VALUES
            (NULL, NULL, NULL, $1, $2, 'Friendly', 1, $3, 'awaiting_confirmation', $1, $4)
        RETURNING *;
        `,
        [me.id, opponentPlayerId, setsToWin, JSON.stringify(sets)]
    );

    return mapChallenge(result.rows[0]);

};

export const getIncomingChallenges = async (userId) => {

    const me = await requirePlayer(userId);

    const result = await pool.query(
        `
        SELECT m.*, p.full_name AS challenger_name
        FROM matches m
        JOIN players p ON p.id = m.challenged_by
        WHERE m.status = 'awaiting_confirmation'
          AND m.challenged_by != $1
          AND (m.player_one_id = $1 OR m.player_two_id = $1)
        ORDER BY m.created_at DESC;
        `,
        [me.id]
    );

    return result.rows.map((row) => ({
        ...mapChallenge(row),
        challengerName: row.challenger_name
    }));

};

export const getOutgoingChallenges = async (userId) => {

    const me = await requirePlayer(userId);

    const result = await pool.query(
        `
        SELECT m.*, p.full_name AS opponent_name
        FROM matches m
        JOIN players p ON p.id = (
            CASE WHEN m.player_one_id = m.challenged_by THEN m.player_two_id ELSE m.player_one_id END
        )
        WHERE m.status = 'awaiting_confirmation'
          AND m.challenged_by = $1
        ORDER BY m.created_at DESC;
        `,
        [me.id]
    );

    return result.rows.map((row) => ({
        ...mapChallenge(row),
        opponentName: row.opponent_name
    }));

};

const findConfirmableChallenge = async (userId, matchId) => {

    const me = await requirePlayer(userId);

    const result = await pool.query(
        "SELECT * FROM matches WHERE id = $1",
        [matchId]
    );

    const match = result.rows[0];

    if (!match) {
        throw new Error("Challenge not found.");
    }

    if (match.status !== "awaiting_confirmation") {
        throw new Error("This challenge is no longer pending.");
    }

    const isParticipant =
        match.player_one_id === me.id || match.player_two_id === me.id;

    if (!isParticipant || match.challenged_by === me.id) {
        throw new Error("Only the challenged player can respond to this match.");
    }

    return match;

};

export const confirmChallenge = async (userId, matchId) => {

    const match = await findConfirmableChallenge(userId, matchId);

    return registerMatchResult(match.id, match.proposed_sets);

};

export const rejectChallenge = async (userId, matchId) => {

    await findConfirmableChallenge(userId, matchId);

    await pool.query(
        `
        UPDATE matches
        SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP
        WHERE id = $1;
        `,
        [matchId]
    );

};
