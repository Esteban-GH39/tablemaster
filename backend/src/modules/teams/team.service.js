import { pool } from "../../config/database.js";

const MAX_PLAYERS_BY_FORMAT = {
    doubles: 2,
    team: 6
};

const mapTeam = (team) => ({
    id: team.id,
    name: team.name,
    type: team.type,
    format: team.format,
    createdAt: team.created_at,
    updatedAt: team.updated_at
});

export const getTeams = async () => {
    const result = await pool.query(`
        SELECT *
        FROM teams
        ORDER BY id
    `);
    return result.rows.map(mapTeam);
};

export const getTeamById = async (id) => {
    const result = await pool.query(`
        SELECT *
        FROM teams
        WHERE id = $1
    `,[id]);
    return result.rows[0] ? mapTeam(result.rows[0]) : undefined;
};

export const createTeam = async ({ name, type, format }) => {
    const result = await pool.query(`
        INSERT INTO teams
        (
            name,
            type,
            format
        )
        VALUES
        (
            $1,
            $2,
            $3
        )
        RETURNING *
    `,[name, type, format]);
    return mapTeam(result.rows[0]);
};

export const updateTeam = async (id,{name,type,format})=>{
    const result = await pool.query(`
        UPDATE teams
        SET
            name=$1,
            type=$2,
            format=$3,
            updated_at=CURRENT_TIMESTAMP
        WHERE id=$4
        RETURNING *
    `,[name,type,format,id]);
    return result.rows[0] ? mapTeam(result.rows[0]) : undefined;
};

export const deleteTeam = async(id)=>{
    const result = await pool.query(`
        DELETE FROM teams
        WHERE id=$1
        RETURNING *
    `,[id]);
    return result.rows[0] ? mapTeam(result.rows[0]) : undefined;
};

export const addPlayerToTeam = async(teamId,playerId)=>{
    const team = await getTeamById(teamId);
    if (!team) {
        throw new Error("Team not found");
    }

    const maxPlayers = MAX_PLAYERS_BY_FORMAT[team.format] ?? MAX_PLAYERS_BY_FORMAT.team;

    const count = await pool.query(`
        SELECT COUNT(*) total
        FROM team_players
        WHERE team_id=$1
    `,[teamId]);

    if(Number(count.rows[0].total) >= maxPlayers){
        throw new Error(`This ${team.format} team already has the maximum of ${maxPlayers} players`);
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
    return result.rows.map((row) => ({
        id: row.id,
        fullName: row.full_name,
        position: row.position
    }));
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