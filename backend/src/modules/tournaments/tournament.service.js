import { pool } from "../../config/database.js";

export const getAllTournaments = async () => {
    const result = await pool.query(`
        SELECT *
        FROM tournaments
        ORDER BY id
    `);

    return result.rows;
};

export const getTournamentById = async (id) => {
    const result = await pool.query(
        `
        SELECT *
        FROM tournaments
        WHERE id = $1
        `,
        [id]
    );
    return result.rows[0];
};

export const createTournament = async (tournamentData) => {
    const {
        name,
        description,
        location,
        startDate,
        endDate,
        status,
        maxPlayers
    } = tournamentData;

    const result = await pool.query(
        `
        INSERT INTO tournaments
        (
            name,
            description,
            location,
            start_date,
            end_date,
            status,
            max_players
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *
        `,
        [
            name,
            description,
            location,
            startDate,
            endDate,
            status ?? "draft",
            maxPlayers
        ]
    );
    return result.rows[0];
};

export const updateTournament = async (id, tournamentData) => {
    const {
        name,
        description,
        location,
        startDate,
        endDate,
        status,
        maxPlayers
    } = tournamentData;

    const result = await pool.query(
        `
        UPDATE tournaments
        SET
            name = $1,
            description = $2,
            location = $3,
            start_date = $4,
            end_date = $5,
            status = $6,
            max_players = $7,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $8
        RETURNING *
        `,
        [
            name,
            description,
            location,
            startDate,
            endDate,
            status,
            maxPlayers,
            id
        ]
    );
    return result.rows[0];
};

export const patchTournament = async (id, tournamentData) => {
    const tournament = await getTournamentById(id);

    if (!tournament) {
        return null;
    }

    const updatedTournament = {
        ...tournament,
        ...tournamentData
    };

    return updateTournament(id, {
        name: updatedTournament.name,
        description: updatedTournament.description,
        location: updatedTournament.location,
        startDate: updatedTournament.start_date,
        endDate: updatedTournament.end_date,
        status: updatedTournament.status,
        maxPlayers: updatedTournament.max_players
    });
};

export const deleteTournament = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM tournaments
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );
    return result.rows[0];
};