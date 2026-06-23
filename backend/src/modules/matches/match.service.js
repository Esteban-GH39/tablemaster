import { pool } from "../../config/database.js";

import { getTournamentById } from "../tournaments/tournament.service.js";
import { getPlayerById } from "../players/player.service.js";

const mapMatch = (match) => ({
    id: match.id,
    tournamentId: match.tournament_id,
    playerOneId: match.player_one_id,
    playerTwoId: match.player_two_id,
    winnerId: match.winner_id,
    round: match.round,
    matchOrder: match.match_order,
    status: match.status,
    playedAt: match.played_at,
    createdAt: match.created_at,
    updatedAt: match.updated_at
});

export const getAllMatches = async () => {
    const result = await pool.query(`
        SELECT *
        FROM matches
        ORDER BY round, match_order
    `);
    return result.rows.map(mapMatch);
};

export const getMatchById = async (id) => {
    const result = await pool.query(`
        SELECT *
        FROM matches
        WHERE id = $1
    `, [id]);
    return result.rows.length
        ? mapMatch(result.rows[0])
        : null;
};

export const createMatch = async (matchData) => {
    const {
        tournamentId,
        playerOneId,
        playerTwoId,
        winnerId,
        round,
        matchOrder,
        status,
        playedAt
    } = matchData;
    const tournament = await getTournamentById(tournamentId);
    if (!tournament) {
        throw new Error("Tournament not found");
    }
    if (playerOneId) {
        const player = await getPlayerById(playerOneId);
        if (!player) {
            throw new Error("Player one not found");
        }
    }
    if (playerTwoId) {
        const player = await getPlayerById(playerTwoId);
        if (!player) {
            throw new Error("Player two not found");
        }
    }
    if (winnerId) {
        const winner = await getPlayerById(winnerId);
        if (!winner) {
            throw new Error("Winner not found");
        }
    }
    const result = await pool.query(`
        INSERT INTO matches
        (
            tournament_id,
            player_one_id,
            player_two_id,
            winner_id,
            round,
            match_order,
            status,
            played_at
        )
        VALUES
        (
            $1,$2,$3,$4,$5,$6,$7,$8
        )
        RETURNING *
    `,
    [
        tournamentId,
        playerOneId,
        playerTwoId,
        winnerId,
        round,
        matchOrder,
        status ?? "pending",
        playedAt ?? null
    ]);
    return mapMatch(result.rows[0]);
};

export const updateMatch = async (id, matchData) => {
    const {
        tournamentId,
        playerOneId,
        playerTwoId,
        winnerId,
        round,
        matchOrder,
        status,
        playedAt
    } = matchData;
    const result = await pool.query(`
        UPDATE matches
        SET
            tournament_id = $1,
            player_one_id = $2,
            player_two_id = $3,
            winner_id = $4,
            round = $5,
            match_order = $6,
            status = $7,
            played_at = $8,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $9
        RETURNING *
    `,
    [
        tournamentId,
        playerOneId,
        playerTwoId,
        winnerId,
        round,
        matchOrder,
        status,
        playedAt,
        id
    ]);
    return result.rows.length
        ? mapMatch(result.rows[0])
        : null;
};

export const patchMatch = async (id, matchData) => {
    const currentMatch = await getMatchById(id);
    if (!currentMatch) {
        return null;
    }
    const updatedMatch = {
        ...currentMatch,
        ...matchData
    };
    return updateMatch(id, updatedMatch);
};
export const deleteMatch = async (id) => {
    const result = await pool.query(`
        DELETE FROM matches
        WHERE id = $1
        RETURNING *
    `,
    [id]);
    return result.rows.length
        ? mapMatch(result.rows[0])
        : null;
};