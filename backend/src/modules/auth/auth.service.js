import { pool } from "../../config/database.js";

import { comparePassword, hashPassword } from "../../utils/password.js";

import { generateToken } from "../../utils/jwt.js";

export const login = async (data) => {

    const { rows } = await pool.query(`
        SELECT
            id,
            full_name,
            email,
            password,
            role,
            is_active
        FROM users
        WHERE email = $1;
    `, [data.email]);

    const user = rows[0];

    if (!user) {
        throw new Error ("Invalid credentials");
    }

    if (!user.is_active) {
        throw new Error ("User is inactive");
    }

    const validPassword = await comparePassword(
        data.password,
        user.password
    );

    if (!validPassword) {
        throw new Error ("Invalid credentials");
    }

    const token = generateToken({
        id: user.id,
        role: user.role
    });

    return {
        token,
        user: {
            id: user.id,
            fullName: user.full_name,
            email: user.email,
            role: user.role
        }
    }

}

export const getMe = async (userId) => {
    const { rows } = await pool.query(`
        SELECT
            u.id,
            u.full_name,
            u.email,
            u.role,
            u.is_active,
            p.id AS player_id,
            p.club,
            p.ranking_points
        FROM users u
        LEFT JOIN players p
            ON p.user_id = u.id
        WHERE u.id = $1;
    `, [userId]);
    if (!rows.length) {
        throw new Error("User not found");
    }
    const row = rows[0];
    return {
        user: {
            id: row.id,
            fullName: row.full_name,
            email: row.email,
            role: row.role,
            isActive: row.is_active
        },
        player: row.player_id
            ? {
                id: row.player_id,
                club: row.club,
                rankingPoints: row.ranking_points
            }
            : null
    };
};