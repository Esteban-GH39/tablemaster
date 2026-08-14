import { pool } from "../../config/database.js";
import { recalculateGroup, areGroupsFinished, generateKnockout, finishTournament } from "../competition/competition.service.js";
import { advanceWinner } from "../../helpers/bracket/bracket.advance.js"
import { updateStatistics } from "../statistics/statistics.service.js";

export const validateSet = (playerOneScore, playerTwoScore) => {
    if (playerOneScore === playerTwoScore) {
        return false;
    }
    const winner = Math.max(playerOneScore, playerTwoScore);
    const loser = Math.min(playerOneScore, playerTwoScore);
    if (winner < 11) {
        return false;
    }
    if (winner === 11) {
        return loser <= 9;
    }
    return winner - loser === 2;
};

export const validateMatch = (sets, setsToWin) => {
    let playerOneSets = 0;
    let playerTwoSets = 0;
    for (const set of sets) {
        if (
            !validateSet(
                set.playerOneScore,
                set.playerTwoScore
            )
        ) {
            throw new Error("Invalid set score");
        }
        if (set.playerOneScore > set.playerTwoScore) {
            playerOneSets++;
        } else {
            playerTwoSets++;
        }
    }
    if (
        playerOneSets !== setsToWin &&
        playerTwoSets !== setsToWin
    ) {
        throw new Error(
            `A match finishes when one player wins ${setsToWin} sets.`
        );
    }
};

export const registerMatchResult = async (matchId, sets) => {
    await pool.query("BEGIN");
    try {
        const matchResult = await pool.query(
            `
            SELECT *
            FROM matches
            WHERE id = $1;
            `,
            [matchId]
        );
        if (!matchResult.rows.length) {
            throw new Error("Match not found");
        }
        const match = matchResult.rows[0];
        if (match.status === "finished") {
            throw new Error("Match already finished");
        }
        if (match.status === "cancelled") {
            throw new Error("Cancelled match");
        }
        if (
            match.status !== "pending" &&
            match.status !== "in_progress" &&
            match.status !== "awaiting_confirmation"
        ) {
            throw new Error("Match is not ready to be played");
        }
        if (!match.player_one_id || !match.player_two_id) {
            throw new Error("Match needs both players assigned before a result can be recorded");
        }
        if (!sets.length) {
            throw new Error("At least one set is required");
        }
        const setsToWin = match.sets_to_win;
        const maxSets = setsToWin * 2 - 1;
        if (sets.length < setsToWin || sets.length > maxSets) {
            throw new Error(
                `This match is best of ${maxSets} (first to ${setsToWin} sets) — expected between ${setsToWin} and ${maxSets} sets.`
            );
        }
        validateMatch(sets, setsToWin);
        let playerOneSets = 0;
        let playerTwoSets = 0;
        let playerOnePoints = 0;
        let playerTwoPoints = 0;
        for (let i = 0; i < sets.length; i++) {
            const set = sets[i];
            playerOnePoints += set.playerOneScore;
            playerTwoPoints += set.playerTwoScore;
            if (set.playerOneScore > set.playerTwoScore) {
                playerOneSets++;
            } else {
                playerTwoSets++;
            }
            await pool.query(
                `
                INSERT INTO match_sets
                (
                    match_id,
                    set_number,
                    player_one_score,
                    player_two_score
                )
                VALUES
                (
                    $1,
                    $2,
                    $3,
                    $4
                );
                `,
                [
                    matchId,
                    i + 1,
                    set.playerOneScore,
                    set.playerTwoScore
                ]
            );
        }
        if (playerOneSets === playerTwoSets) {
            throw new Error("A match cannot end in a tie");
        }
        const winnerId =
            playerOneSets > playerTwoSets
                ? match.player_one_id
                : match.player_two_id;
        await pool.query(
            `
            UPDATE matches
            SET
                winner_id = $1,
                status = 'finished',
                played_at = CURRENT_TIMESTAMP,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2;
            `,
            [
                winnerId,
                matchId
            ]
        );
        
        if (match.tournament_id) {
            await updateStatistics(
                match.tournament_id,
                match.player_one_id,
                winnerId === match.player_one_id,
                playerOneSets,
                playerTwoSets,
                playerOnePoints,
                playerTwoPoints
            );
            await updateStatistics(
                match.tournament_id,
                match.player_two_id,
                winnerId === match.player_two_id,
                playerTwoSets,
                playerOneSets,
                playerTwoPoints,
                playerOnePoints
            );
        }

        if (match.stage_id) {
            const stageResult = await pool.query(
                `
                SELECT stage_type, competition_id
                FROM stages
                WHERE id = $1;
                `,
                [match.stage_id]
            );
            const stageType =
                stageResult.rows[0].stage_type;
            const competitionId =
                stageResult.rows[0].competition_id;
            if (stageType === "groups") {
                await recalculateGroup(match.group_id);
                const finished =
                    await areGroupsFinished(
                        competitionId
                    );
                if (finished) {
                    await generateKnockout(
                        competitionId
                    );
                }
            } else {
                await advanceWinner(match.id);
                if (match.round === "Final") {
                    await finishTournament(
                        competitionId
                    );
                }
            }
        }
        await pool.query("COMMIT");
        return {
            winnerId,
            playerOneSets,
            playerTwoSets,
            playerOnePoints,
            playerTwoPoints
        };
    } catch (error) {
        await pool.query("ROLLBACK");
        throw error;
    }
};