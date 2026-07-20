import { pool } from "../../config/database.js";

export const getPlayerStatistics = async (playerId) => {
    const result = await pool.query(
        `
        SELECT
            COALESCE(SUM(matches_played), 0) AS matches_played,
            COALESCE(SUM(matches_won), 0) AS wins,
            COALESCE(SUM(matches_lost), 0) AS losses,
            COALESCE(SUM(sets_won), 0) AS sets_won,
            COALESCE(SUM(sets_lost), 0) AS sets_lost,
            COALESCE(SUM(points_won), 0) AS points_won,
            COALESCE(SUM(points_lost), 0) AS points_lost
        FROM statistics
        WHERE player_id = $1
        `,
        [playerId]
    );
    const stats = result.rows[0];
    return {
        matchesPlayed: Number(stats.matches_played),
        wins: Number(stats.wins),
        losses: Number(stats.losses),
        setsWon: Number(stats.sets_won),
        setsLost: Number(stats.sets_lost),
        pointsWon: Number(stats.points_won),
        pointsLost: Number(stats.points_lost)
    };
};

export const getTournamentStatistics = async (tournamentId) => {
    const players = await pool.query(
        `
        SELECT COUNT(*) total
        FROM statistics
        WHERE tournament_id = $1
        `,
        [tournamentId]
    );
    const matches = await pool.query(
        `
        SELECT
            COUNT(*) total,
            COUNT(*) FILTER (
                WHERE status = 'finished'
            ) finished,
            COUNT(*) FILTER (
                WHERE status <> 'finished'
            ) pending
        FROM matches
        WHERE tournament_id = $1
        `,
        [tournamentId]
    );
    const groups = await pool.query(
        `
        SELECT COUNT(*) total
        FROM groups g
        INNER JOIN stages s
            ON s.id = g.stage_id
        INNER JOIN competitions c
            ON c.id = s.competition_id
        WHERE c.tournament_id = $1
        `,
        [tournamentId]
    );
    const totalMatches = Number(matches.rows[0].total);
    const finishedMatches = Number(matches.rows[0].finished);
    return {
        players: Number(players.rows[0].total),
        matches: totalMatches,
        finishedMatches,
        pendingMatches: Number(matches.rows[0].pending),
        groups: Number(groups.rows[0].total),
        completion:
            totalMatches === 0
                ? 0
                : Math.round(
                    (finishedMatches / totalMatches) * 100
                )
    };
};

export const updateStatistics = async (
    tournamentId,
    playerId,
    won,
    setsWon,
    setsLost,
    pointsWon,
    pointsLost
) => {
    console.log("UPDATE STATISTICS");
    console.log({
        tournamentId,
        playerId,
        won,
        setsWon,
        setsLost,
        pointsWon,
        pointsLost
    });
    const exists = await pool.query(
        `
        SELECT id
        FROM statistics
        WHERE
            tournament_id = $1
            AND player_id = $2
        `,
        [
            tournamentId,
            playerId
        ]
    );
    if (!exists.rows.length) {
        await pool.query(
            `
            INSERT INTO statistics
            (
                tournament_id,
                player_id,
                matches_played,
                matches_won,
                matches_lost,
                sets_won,
                sets_lost,
                points_won,
                points_lost
            )
            VALUES
            (
                $1,
                $2,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            )
            `,
            [
                tournamentId,
                playerId
            ]
        );
    }
    const inserted = await pool.query(
        `
        SELECT *
        FROM statistics
        WHERE
            tournament_id = $1
            AND player_id = $2
        `,
        [
            tournamentId,
            playerId
        ]
    );
    console.log(inserted.rows);
    await pool.query(
        `
        UPDATE statistics
        SET
            matches_played = matches_played + 1,
            matches_won =
                matches_won + $3,
            matches_lost =
                matches_lost + $4,
            sets_won =
                sets_won + $5,
            sets_lost =
                sets_lost + $6,
            points_won =
                points_won + $7,
            points_lost =
                points_lost + $8,
            updated_at = CURRENT_TIMESTAMP
        WHERE
            tournament_id = $1
            AND player_id = $2
        `,
        [
            tournamentId,
            playerId,
            won ? 1 : 0,
            won ? 0 : 1,
            setsWon,
            setsLost,
            pointsWon,
            pointsLost
        ]
    );
};