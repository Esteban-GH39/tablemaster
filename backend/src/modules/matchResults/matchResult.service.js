import { pool } from "../../config/database.js";
import { recalculateGroup, areGroupsFinished, generateKnockout } from "../competition/competition.service.js";
import { advanceWinner } from "../../helpers/bracket/bracket.advance.js"

const validateSet = (playerOneScore, playerTwoScore) => {
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

const validateMatch = (sets) => {
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
        playerOneSets !== 3 &&
        playerTwoSets !== 3
    ) {
        throw new Error(
            "A match finishes when one player wins three sets."
        );
    }

};

export const registerMatchResult = async (matchId, sets) => {
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
    validateMatch(sets)
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
            )
            `,
            [
                matchId,
                i + 1,
                set.playerOneScore,
                set.playerTwoScore
            ]
        );
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
        WHERE id = $2
        `,
        [
            winnerId,
            matchId
        ]
    );
    const stageResult = await pool.query(
        `
        SELECT stage_type
        FROM stages
        WHERE id = $1
        `,
        [match.stage_id]
    );
    const stageType = stageResult.rows[0].stage_type;
    if (stageType === "groups") {
        await recalculateGroup(match.group_id);
        const competitionResult = await pool.query(
            `
            SELECT competition_id
            FROM stages
            WHERE id = $1
            `,
            [match.stage_id]
        );
        const competitionId =
            competitionResult.rows[0].competition_id;
        const finished = await areGroupsFinished(
            competitionId
        );
        if (finished) {
            await generateKnockout(
                competitionId
            );
        }
    } else {
        await advanceWinner(
            match.id
        );
    }
    return {
        winnerId,
        playerOneSets,
        playerTwoSets,
        playerOnePoints,
        playerTwoPoints
    };
};