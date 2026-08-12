import { pool } from "../../config/database.js";

import { getTournamentById } from "../tournaments/tournament.service.js";
import { getPlayerById, getPlayerByUserId } from "../players/player.service.js";
import { getTeamById } from "../teams/team.service.js";

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
    if (teamId) {
        const team = await getTeamById(teamId);
        if (!team) {
            throw new Error("Team not found");
        }
    }
    const alreadyRegistered = await pool.query(
        `
        SELECT 1
        FROM tournament_entries
        WHERE tournament_id = $1
        AND (
            player_id = $2
            OR
            team_id = $3
        )
        LIMIT 1;
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
    const { rows } = await pool.query(
        `
        SELECT COUNT(*)::int AS total
        FROM tournament_entries
        WHERE tournament_id = $1;
        `,
        [tournamentId]
    );
    if (rows[0].total >= tournament.maxPlayers) {
        throw new Error("Tournament is full");
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
        RETURNING *;
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

// Auto-inscripcion: un usuario con rol "player" se inscribe a si mismo,
// usando el jugador vinculado a su cuenta (players.user_id). No puede
// inscribir a otro jugador ni a un equipo ajeno.
export const createSelfEntry = async (tournamentId, userId) => {
    const player = await getPlayerByUserId(userId);

    if (!player) {
        throw new Error(
            "You need a player profile linked to your account before joining a tournament"
        );
    }

    return createEntry(tournamentId, { playerId: player.id });
};

export const deleteSelfEntry = async (tournamentId, userId) => {
    const player = await getPlayerByUserId(userId);

    if (!player) {
        throw new Error("Player profile not found");
    }

    const result = await pool.query(
        `
        DELETE
        FROM tournament_entries
        WHERE tournament_id = $1
        AND player_id = $2
        RETURNING *;
        `,
        [tournamentId, player.id]
    );

    if (!result.rows.length) {
        throw new Error("You are not registered in this tournament");
    }

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
            p.full_name;
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
        RETURNING *;
        `,
        [entryId]
    );
    return result.rows[0];
};