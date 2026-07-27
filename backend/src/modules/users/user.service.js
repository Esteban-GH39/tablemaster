import { pool } from "../../config/database.js";
import { hashPassword } from "../../utils/password.js";

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
    return rows;
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
    return rows[0];
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
    return rows[0];
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
    return rows[0];
}

export const patchUser = async(id,data)=>{
    const {rows}=await pool.query(`
        UPDATE users
        SET
            full_name=COALESCE($1,full_name),
            email=COALESCE($2,email),
            password=COALESCE($3,password),
            role=COALESCE($4,role),
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
        data.fullName,
        data.email,
        data.password,
        data.role,
        id
    ]);
    return rows[0];
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
    return rows[0];
}