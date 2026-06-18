import { pool } from '../../config/database.js';
import { getTournamentById } from '../tournaments/tournament.service.js';
import { getPlayerById } from '../players/player.service.js';

export const registerPlayer = async (tournamentId, playerId) => {
    const tournament = await getTournamentById(tournamentId);
    if (!tournament) {
        throw new Error("Tournament not found");
    }
    const player = await getPlayerById(playerId);
    if (!player) {
        throw new Error("Player not found");
    }
    if (tournament.status !== "registration") {
        throw new Error("Tournament is not open for registration");
    }
    const playersCount = await pool.query(
        `
        SELECT COUNT(*) AS total
        FROM tournament_players
        WHERE tournament_id = $1
        `,
        [tournamentId]
    );

    const totalPlayers = Number(playersCount.rows[0].total);

    if (totalPlayers >= tournament.max_players) {
        throw new Error("Tournament is full");
    }

    const alreadyRegistered = await pool.query(
        `
        SELECT *
        FROM tournament_players
        WHERE tournament_id = $1
        AND player_id = $2
        `,
        [tournamentId, playerId]
    );

    if (alreadyRegistered.rows.length > 0) {
        throw new Error("Player already registered");
    }

    const result = await pool.query(
        `
        INSERT INTO tournament_players
        (
            tournament_id,
            player_id
        )
        VALUES
        (
            $1,
            $2
        )
        RETURNING *
        `,
        [tournamentId, playerId]
    );
    return result.rows[0];
}

export const getTournamentPlayers = async (tournamentId) => {
     const result = await pool.query(
        `
        SELECT

            p.id,

            p.full_name,

            p.club,

            tp.seed,

            tp.registered_at

        FROM tournament_players tp

        INNER JOIN players p

            ON tp.player_id = p.id

        WHERE tp.tournament_id = $1

        ORDER BY p.full_name
        `,
        [tournamentId]
    );
    return result.rows;
}

export const removePlayerFromTournament = async (tournamentId, playerId) => {
    const result = await pool.query(
        `
        DELETE
        FROM tournament_players

        WHERE tournament_id = $1

        AND player_id = $2

        RETURNING *
        `,
        [
            tournamentId,
            playerId
        ]
    );
    return result.rows[0];
}