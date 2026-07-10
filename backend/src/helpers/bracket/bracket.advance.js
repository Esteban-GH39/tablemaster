import { pool } from "../../config/database.js";

export const advanceWinner = async (matchId) => {
    const matchResult = await pool.query(
        `
        SELECT *
        FROM matches
        WHERE id = $1
        `,
        [matchId]
    );
    if (!matchResult.rows.length) {
        throw new Error("Match not found");
    }
    const match = matchResult.rows[0];
    const winnerId =
        match.winner_id ??
        match.player_one_id ??
        match.player_two_id;
    if (!winnerId) {
        return;
    }
    const nextMatchOrder = Math.ceil(
        match.match_order / 2
    );
    const nextRound = match.round_order + 1;
    const nextMatchResult = await pool.query(
        `
        SELECT *
        FROM matches
        WHERE
            stage_id = $1
            AND round_order = $2
            AND match_order = $3
        `,
        [
            match.stage_id,
            nextRound,
            nextMatchOrder
        ]
    );
    if (!nextMatchResult.rows.length) {
        await pool.query(
            `
            UPDATE tournaments
            SET
                status = 'finished',
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $1
            `,
            [match.tournament_id]
        );
        return;
    }
    const nextMatch = nextMatchResult.rows[0];
    if (!nextMatch.player_one_id) {
        await pool.query(
            `
            UPDATE matches
            SET
                player_one_id = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            `,
            [
                winnerId,
                nextMatch.id
            ]
        );
    } else {
        await pool.query(
            `
            UPDATE matches
            SET
                player_two_id = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            `,
            [
                winnerId,
                nextMatch.id
            ]
        );
    }
    const updatedMatchResult = await pool.query(
        `
        SELECT *
        FROM matches
        WHERE id = $1
        `,
        [nextMatch.id]
    );
    const updatedMatch = updatedMatchResult.rows[0];
    const onlyOnePlayer =
        (
            updatedMatch.player_one_id &&
            !updatedMatch.player_two_id
        ) ||
        (
            !updatedMatch.player_one_id &&
            updatedMatch.player_two_id
        );
    if (onlyOnePlayer) {
        const automaticWinner =
            updatedMatch.player_one_id ??
            updatedMatch.player_two_id;
        await pool.query(
            `
            UPDATE matches
            SET
                winner_id = $1,
                status = 'finished',
                played_at = CURRENT_TIMESTAMP,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            `,
            [
                automaticWinner,
                updatedMatch.id
            ]
        );
        await advanceWinner(
            updatedMatch.id
        );
    }
};