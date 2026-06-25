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
    if (match.status !== "finished") {
        throw new Error("Match has not finished");
    }
    const nextOrder = Math.ceil(match.match_order / 2);
    const rounds = [
        "Round of 128",
        "Round of 64",
        "Round of 32",
        "Round of 16",
        "Quarterfinal",
        "Semifinal",
        "Final"
    ];
    const currentIndex = rounds.indexOf(match.round);
    if (currentIndex === -1) {
        throw new Error("Invalid round");
    }
    if (match.round === "Final") {
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
    const nextRound = rounds[currentIndex + 1];
    let nextMatchResult = await pool.query(
        `
        SELECT *
        FROM matches
        WHERE
            tournament_id = $1
            AND stage_id = $2
            AND round = $3
            AND match_order = $4
        `,
        [
            match.tournament_id,
            match.stage_id,
            nextRound,
            nextOrder
        ]
    );
    let nextMatch;
    if (!nextMatchResult.rows.length) {
        nextMatchResult = await pool.query(
            `
            INSERT INTO matches
            (
                tournament_id,
                stage_id,
                round,
                match_order,
                status
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4,
                'pending'
            )
            RETURNING *
            `,
            [
                match.tournament_id,
                match.stage_id,
                nextRound,
                nextOrder
            ]
        );
    }
    nextMatch = nextMatchResult.rows[0];
    if (!nextMatch.player_one_id) {
        await pool.query(
            `
            UPDATE matches
            SET player_one_id = $1
            WHERE id = $2
            `,
            [
                match.winner_id,
                nextMatch.id
            ]
        );
    } else {
        await pool.query(
            `
            UPDATE matches
            SET player_two_id = $1
            WHERE id = $2
            `,
            [
                match.winner_id,
                nextMatch.id
            ]
        );
    }
};