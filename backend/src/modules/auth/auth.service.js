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