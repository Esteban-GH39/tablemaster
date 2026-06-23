import { pool } from "../../config/database.js";

import { getTournamentById } from "../tournaments/tournament.service.js";
import { getPlayerById } from "../players/player.service.js";

export const createEntry = async (tournamentId, entryData) => {
    const {
        playerId,
        teamId,
        seed
    } = entryData;
    const tournament = await getTournamentById(tournamentId);
    if (!tournament) {
        throw new Error("Tournament not found");
    }
    if (tournament.status !== "registration") {
        throw new Error("Tournament is not open for registration");
    }
    if (!playerId && !teamId) {
        throw new Error("Player or Team is required");
    }
    if (playerId && teamId) {
        throw new Error("Entry cannot have player and team simultaneously");
    }
    if (playerId) {
        const player = await getPlayerById(playerId);
        if (!player) {
            throw new Error("Player not found");
        }
    }

    const alreadyRegistered = await pool.query(
        `
        SELECT *
        FROM tournament_entries
        WHERE tournament_id = $1
        AND
        (
            player_id = $2
            OR
            team_id = $3
        )
        `,
        [
            tournamentId,
            playerId ?? null,
            teamId ?? null
        ]
    );

    if (alreadyRegistered.rows.length) {
        throw new Error("Entry already registered");
    }
    const result = await pool.query(
        `
        INSERT INTO tournament_entries
        (
            tournament_id,
            player_id,
            team_id,
            seed
        )
        VALUES
        (
            $1,
            $2,
            $3,
            $4
        )
        RETURNING *
        `,
        [
            tournamentId,
            playerId ?? null,
            teamId ?? null,
            seed ?? null
        ]
    );
    return result.rows[0];
};

export const getEntries = async (tournamentId) => {
    const result = await pool.query(
        `
        SELECT
            te.id,
            te.seed,
            te.registered_at,
            te.player_id,
            te.team_id,
            p.full_name,
            p.club
        FROM tournament_entries te
        LEFT JOIN players p
            ON te.player_id = p.id
        WHERE te.tournament_id = $1
        ORDER BY
            te.seed NULLS LAST,
            p.full_name
        `,
        [tournamentId]
    );
    return result.rows;
};

export const deleteEntry = async (entryId) => {
    const result = await pool.query(
        `
        DELETE
        FROM tournament_entries
        WHERE id = $1
        RETURNING *
        `,
        [entryId]
    );
    return result.rows[0];
};