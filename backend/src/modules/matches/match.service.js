import { pool } from "../../config/database.js";

import { getTournamentById } from "../tournaments/tournament.service.js";
import { getPlayerById } from "../players/player.service.js";

const mapMatch = (match) => ({
    id: match.id,
    tournamentId: match.tournament_id,
    stageId: match.stage_id,
    groupId: match.group_id,
    playerOneId: match.player_one_id,
    playerTwoId: match.player_two_id,
    winnerId: match.winner_id,
    round: match.round,
    roundOrder: match.round_order,
    matchOrder: match.match_order,
    setsToWin: match.sets_to_win,
    status: match.status,
    playedAt: match.played_at,
    createdAt: match.created_at,
    updatedAt: match.updated_at
});

export const getAllMatches = async (tournamentId) => {
    const result = tournamentId
        ? await pool.query(
            `
            SELECT *
            FROM matches
            WHERE tournament_id = $1
            ORDER BY round_order, match_order;
            `,
            [tournamentId]
        )
        : await pool.query(`
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

export const getHeadToHead = async (playerOneId, playerTwoId) => {
    const result = await pool.query(`
        SELECT
            m.*,
            t.name AS tournament_name,
            COALESCE(
                (
                    SELECT json_agg(
                        json_build_object(
                            'setNumber', s.set_number,
                            'playerOneScore', s.player_one_score,
                            'playerTwoScore', s.player_two_score
                        )
                        ORDER BY s.set_number
                    )
                    FROM match_sets s
                    WHERE s.match_id = m.id
                ),
                '[]'
            ) AS sets
        FROM matches m
        LEFT JOIN tournaments t
            ON t.id = m.tournament_id
        WHERE
            (m.player_one_id = $1 AND m.player_two_id = $2)
            OR (m.player_one_id = $2 AND m.player_two_id = $1)
        ORDER BY
            COALESCE(m.played_at, m.created_at) DESC
    `, [playerOneId, playerTwoId]);

    const matches = result.rows.map((row) => ({
        ...mapMatch(row),
        tournamentName: row.tournament_name,
        sets: row.sets
    }));

    const finished = matches.filter((match) => match.status === "finished" && match.winnerId);
    const summary = {
        totalMatches: matches.length,
        playerOneWins: finished.filter((match) => match.winnerId === playerOneId).length,
        playerTwoWins: finished.filter((match) => match.winnerId === playerTwoId).length
    };

    return { matches, summary };
};

export const createMatch = async (matchData) => {
    const {
        tournamentId,
        playerOneId,
        playerTwoId,
        winnerId,
        round,
        matchOrder,
        setsToWin,
        status,
        playedAt
    } = matchData;
    const tournament = tournamentId
        ? await getTournamentById(tournamentId)
        : null;
    if (tournamentId && !tournament) {
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
            sets_to_win,
            status,
            played_at
        )
        VALUES
        (
            $1,$2,$3,$4,$5,$6,$7,$8,$9
        )
        RETURNING *
    `,
    [
        tournamentId ?? null,
        playerOneId ?? null,
        playerTwoId ?? null,
        winnerId ?? null,
        round,
        matchOrder,
        setsToWin ?? 3,
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
        setsToWin,
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
            sets_to_win = $7,
            status = $8,
            played_at = $9,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $10
        RETURNING *
    `,
    [
        tournamentId ?? null,
        playerOneId ?? null,
        playerTwoId ?? null,
        winnerId ?? null,
        round,
        matchOrder,
        setsToWin ?? 3,
        status,
        playedAt ?? null,
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