import { pool } from "../../config/database.js";

export const getGroupRanking = async (groupId) => {
    const result = await pool.query(
        `
        SELECT
            te.player_id,
            ge.entry_id,
            ge.wins,
            ge.losses,
            ge.sets_won,
            ge.sets_lost,
            ge.points_won,
            ge.points_lost,
            (
                ge.sets_won - ge.sets_lost
            ) AS set_difference,
            (
                ge.points_won - ge.points_lost
            ) AS point_difference
        FROM group_entries ge
        JOIN tournament_entries te
            ON te.id = ge.entry_id
        WHERE ge.group_id = $1
        ORDER BY
            ge.wins DESC,
            (ge.sets_won - ge.sets_lost) DESC,
            (ge.points_won - ge.points_lost) DESC,
            ge.points_won DESC
        `,
        [groupId]
    );
    return result.rows;
};

export const getQualifiedPlayers = async (groupId) => {
    const ranking = await getGroupRanking(groupId);
    console.log(ranking);
    return ranking.slice(0, 2);
};