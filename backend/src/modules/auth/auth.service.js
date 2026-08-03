import { pool } from "../../config/database.js";

import { comparePassword, hashPassword } from "../../utils/password.js";

import { generateToken } from "../../utils/jwt.js";

import crypto from "crypto";
import { sendEmail } from "../../utils/email.js";

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

const RESET_TOKEN_EXPIRY_MS = 60 * 60 * 1000; // 1 hora

export const forgotPassword = async (email) => {
    const { rows } = await pool.query(`
        SELECT id, full_name, email
        FROM users
        WHERE email = $1 AND is_active = true;
    `, [email]);

    const user = rows[0];

    // No revelamos si el email existe o no, por seguridad.
    if (!user) {
        return;
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + RESET_TOKEN_EXPIRY_MS);

    await pool.query(`
        UPDATE users
        SET reset_password_token = $1,
            reset_password_expires = $2
        WHERE id = $3;
    `, [hashedToken, expiresAt, user.id]);

    const frontendUrl = (process.env.FRONTEND_URL || "http://localhost:5173")
        .split(",")[0]
        .trim();
    const resetLink = `${frontendUrl}/reset-password?token=${rawToken}`;

    await sendEmail({
        to: user.email,
        subject: "Recupera tu contraseña - TableMaster",
        text: `Hola ${user.full_name},\n\nSolicitaste recuperar tu contraseña. Entra al siguiente enlace para crear una nueva (válido por 1 hora):\n\n${resetLink}\n\nSi no solicitaste esto, ignora este correo.`,
        html: `
            <p>Hola ${user.full_name},</p>
            <p>Solicitaste recuperar tu contraseña. Haz clic en el siguiente enlace para crear una nueva (válido por 1 hora):</p>
            <p><a href="${resetLink}">${resetLink}</a></p>
            <p>Si no solicitaste esto, ignora este correo.</p>
        `
    });
};

export const resetPassword = async ({ token, password }) => {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const { rows } = await pool.query(`
        SELECT id, reset_password_expires
        FROM users
        WHERE reset_password_token = $1;
    `, [hashedToken]);

    const user = rows[0];

    if (
        !user ||
        !user.reset_password_expires ||
        new Date(user.reset_password_expires) < new Date()
    ) {
        throw new Error("Invalid or expired token");
    }

    const passwordHash = await hashPassword(password);

    await pool.query(`
        UPDATE users
        SET password = $1,
            reset_password_token = NULL,
            reset_password_expires = NULL,
            updated_at = NOW()
        WHERE id = $2;
    `, [passwordHash, user.id]);
};