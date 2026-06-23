import { pool } from "../../config/database.js";

export const getTeams = async () => {
    const result = await pool.query(`
        SELECT *
        FROM teams
        ORDER BY id
    `);
    return result.rows;
};

export const getTeamById = async (id) => {
    const result = await pool.query(`
        SELECT *
        FROM teams
        WHERE id = $1
    `,[id]);
    return result.rows[0];
};

export const createTeam = async ({ name, type }) => {
    const result = await pool.query(`
        INSERT INTO teams
        (
            name,
            type
        )
        VALUES
        (
            $1,
            $2
        )
        RETURNING *
    `,[name,type]);
    return result.rows[0];
};

export const updateTeam = async (id,{name,type})=>{
    const result = await pool.query(`
        UPDATE teams
        SET
            name=$1,
            type=$2,
            updated_at=CURRENT_TIMESTAMP
        WHERE id=$3
        RETURNING *
    `,[name,type,id]);
    return result.rows[0];
};

export const deleteTeam = async(id)=>{
    const result = await pool.query(`
        DELETE FROM teams
        WHERE id=$1
        RETURNING *
    `,[id]);
    return result.rows[0];
};

export const addPlayerToTeam = async(teamId,playerId)=>{
    const count = await pool.query(`
        SELECT COUNT(*) total
        FROM team_players
        WHERE team_id=$1
    `,[teamId]);
    if(Number(count.rows[0].total)>=2){
        throw new Error("Team already has two players");
    }
    const position=Number(count.rows[0].total)+1;
    const result=await pool.query(`
        INSERT INTO team_players
        (
            team_id,
            player_id,
            position
        )
        VALUES
        (
            $1,
            $2,
            $3
        )
        RETURNING *
    `,[teamId,playerId,position]);
    return result.rows[0];
};

export const getTeamPlayers=async(teamId)=>{
    const result=await pool.query(`
        SELECT
            p.id,
            p.full_name,
            tp.position
        FROM team_players tp
        JOIN players p
        ON tp.player_id=p.id
        WHERE tp.team_id=$1
        ORDER BY tp.position
    `,[teamId]);
    return result.rows;
};

export const removePlayerFromTeam=async(teamId,playerId)=>{
    const result=await pool.query(`
        DELETE
        FROM team_players
        WHERE team_id=$1
        AND player_id=$2
        RETURNING *
    `,[teamId,playerId]);
    return result.rows[0];
};