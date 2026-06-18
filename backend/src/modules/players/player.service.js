import { pool } from "../../config/database.js";

const mapPlayer = (player) => ({
    id: player.id,
    fullName: player.full_name,
    age: player.age,
    gender: player.gender,
    club: player.club,
    dominantHand: player.dominant_hand,
    playStyle: player.play_style,
    gripType: player.grip_type,
    createdAt: player.created_at,
    updatedAt: player.updated_at
})

export const getAllPlayers = async () => {
    const result = await pool.query(`SELECT * FROM players ORDER BY id`);
    return result.rows.map(mapPlayer);
}

export const getPlayerById = async (id) => {
    const result = await pool.query(`SELECT * FROM players where id = $1`, [id]);
    return result.rows.length ? mapPlayer(result.rows[0]) : null;
}

export const createPlayer = async (playerData) => {
    const  {
        fullName, age, gender, club, dominantHand, playStyle, gripType
    } = playerData;
    const result = await pool.query(`INSERT INTO players (full_name, age, gender, club, dominant_hand, play_style, grip_type)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [fullName, age, gender, club, dominantHand, playStyle, gripType]);
    return mapPlayer(result.rows[0]);
}

export const updatePlayer = async (id, playerData) => {
    const  {
        fullName, age, gender, club, dominantHand, playStyle, gripType
    } = playerData;
    const result = await pool.query(`UPDATE players SET full_name = $1, age = $2, gender = $3, club = $4, dominant_hand = $5, play_style = $6, grip_type = $7, updated_at = CURRENT_TIMESTAMP WHERE id = $8 RETURNING *`, 
        [fullName, age, gender, club, dominantHand, playStyle, gripType, id]);
    return mapPlayer(result.rows[0]);
}

export const patchPlayer = async (id, playerData) => {
    const fieldMap = {
        fullName: "full_name",
        age : "age", 
        gender: "gender",
        club: "club",
        dominantHand: "dominant_hand",
        playStyle: "play_style",
        gripType: "grip_type"
    };
    const updates = [];
    const values = [];
    Object.entries(playerData).forEach(([key, value], index) => {
        updates.push(`${fieldMap[key]} = $${index + 1}`);
        values.push(value);
    })
    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);
    const result = await pool.query(`UPDATE players SET ${updates.join(", ")} WHERE id = $${values.length} RETURNING *`, values);
    return mapPlayer(result.rows[0]);
}

export const deletePlayer = async (id) => {
    const result = await pool.query(`DELETE FROM players WHERE id = $1 RETURNING *;`,
        [id]
    );
    return mapPlayer(result.rows[0]);    
}