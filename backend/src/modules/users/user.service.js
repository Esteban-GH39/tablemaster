import { pool } from "../../config/database.js";
import { hashPassword } from "../../utils/password.js";

const mapUser = (user) => user && ({
    id: user.id,
    fullName: user.full_name,
    email: user.email,
    role: user.role,
    isActive: user.is_active,
    createdAt: user.created_at,
    updatedAt: user.updated_at
});

export const countUsers = async () => {
    const { rows } = await pool.query(`SELECT COUNT(*)::int AS count FROM users;`);
    return rows[0].count;
};

export const getUsers = async () => {
    const { rows } = await pool.query(`
        SELECT
            id,
            full_name,
            email,
            role,
            is_active,
            created_at,
            updated_at
        FROM users
        ORDER BY full_name;
    `);
    return rows.map(mapUser);
};

export const getUserById = async (id) => {
    const { rows } = await pool.query(`
        SELECT
            id,
            full_name,
            email,
            role,
            is_active,
            created_at,
            updated_at
        FROM users
        WHERE id = $1;
    `,[id]);
    return mapUser(rows[0]);
};
export const createUser = async(data)=>{
    const {
        fullName,
        email,
        password,
        role
    } = data;
    const passwordHash = await hashPassword(password);
    const { rows } = await pool.query(`
        INSERT INTO users
        (
            full_name,
            email,
            password,
            role
        )
        VALUES
        ($1,$2,$3,$4)
        RETURNING
            id,
            full_name,
            email,
            role,
            is_active,
            created_at,
            updated_at;
    `,
    [
        fullName,
        email,
        passwordHash,
        role
    ]);
    return mapUser(rows[0]);
}

export const updateUser = async(id,data)=>{
    const{
        fullName,
        email,
        password,
        role
    } = data;
    const passwordHash = await hashPassword(password);
    const {rows}=await pool.query(`
        UPDATE users
        SET
            full_name=$1,
            email=$2,
            password=$3,
            role=$4,
            updated_at=NOW()
        WHERE id=$5
        RETURNING
            id,
            full_name,
            email,
            role,
            is_active,
            created_at,
            updated_at;
    `,
    [
        fullName,
        email,
        passwordHash,
        role,
        id
    ]);
    return mapUser(rows[0]);
}

export const patchUser = async(id,data)=>{
    // Si viene contraseña nueva, se hashea igual que en create/update.
    // Antes se guardaba directo del body sin pasar por bcrypt.
    const passwordHash = data.password
        ? await hashPassword(data.password)
        : undefined;

    const {rows}=await pool.query(`
        UPDATE users
        SET
            full_name=COALESCE($1,full_name),
            email=COALESCE($2,email),
            password=COALESCE($3,password),
            role=COALESCE($4,role),
            is_active=COALESCE($5,is_active),
            updated_at=NOW()
        WHERE id=$6
        RETURNING
            id,
            full_name,
            email,
            role,
            is_active,
            created_at,
            updated_at;
    `,
    [
        data.fullName,
        data.email,
        passwordHash,
        data.role,
        data.isActive,
        id
    ]);
    return mapUser(rows[0]);
}

export const deleteUser = async(id)=>{
    const {rows}=await pool.query(`
        UPDATE users
        SET
            is_active=false,
            updated_at=NOW()
        WHERE id=$1
        RETURNING
            id,
            full_name,
            email,
            role,
            is_active;
    `,[id]);
    return mapUser(rows[0]);
}