import { pool } from "../../config/database.js";
import { getTournamentById } from "../tournaments/tournament.service.js";
import { generateGroups } from "../../helpers/groups/group.generator.js";
import { generateRoundRobinMatches } from "../../helpers/groups/group.matches.js";
import { generateSeeds } from "../../helpers/bracket/seed.generator.js";
import { calculateRounds } from "../../helpers/bracket/round.generator.js";
import { insertByes } from "../../helpers/bracket/bye.generator.js";

export const createCompetition = async (tournamentId) => {
    const tournament = await getTournamentById(tournamentId);
    if (!tournament) {
        throw new Error("Tournament not found");
    }
    const exists = await pool.query(
        `
        SELECT *
        FROM competitions
        WHERE tournament_id = $1
        `,
        [tournamentId]
    );
    if (exists.rows.length) {
        throw new Error("Competition already exists");
    }
    const result = await pool.query(
        `
        INSERT INTO competitions
        (
            tournament_id,
            format
        )
        VALUES
        (
            $1,
            $2
        )
        RETURNING *
        `,
        [
            tournamentId,
            "groups_knockout"
        ]
    );
    console.log("Competition created:", result.rows[0]);
    const verify = await pool.query(
        `
        SELECT count(*) as total
        FROM competitions
        `);
    return result.rows[0];
};

export const createStages = async (competitionId) => {
    const result = await pool.query(
        `
        INSERT INTO stages
        (
            competition_id,
            stage_order,
            stage_type,
            name
        )
        VALUES
        ($1,1,'groups','Group Stage'),
        ($1,2,'knockout','Knockout Stage')
        RETURNING *
        `,
        [competitionId]
    );
    return result.rows;
};

const calculateGroups = (entries) => {
    if (entries <= 8) return 2;
    if (entries <= 16) return 4;
    if (entries <= 32) return 8;
    return Math.ceil(entries / 4);
};

const createGroups = async (stageId, totalEntries) => {
    const totalGroups = calculateGroups(totalEntries);
    const groups = [];
    for (let i = 0; i < totalGroups; i++) {
        const result = await pool.query(
            `
            INSERT INTO groups
            (
                stage_id,
                name
            )
            VALUES
            (
                $1,
                $2
            )
            RETURNING *
            `,
            [
                stageId,
                String.fromCharCode(65 + i)
            ]
        );
        groups.push(result.rows[0]);
    }
    return groups;
};

const saveGroups = async (stageId, groups) => {
    const savedGroups = [];
    for (const group of groups) {
        const groupResult = await pool.query(
            `
            INSERT INTO groups
            (
                stage_id,
                name
            )
            VALUES
            (
                $1,
                $2
            )
            RETURNING *
            `,
            [
                stageId,
                group.name
            ]
        );
        const savedGroup = groupResult.rows[0];
        for (let i = 0; i < group.entries.length; i++) {
            await pool.query(
                `
                INSERT INTO group_entries
                (
                    group_id,
                    entry_id,
                    position,
                    wins,
                    losses,
                    sets_won,
                    sets_lost,
                    points_won,
                    points_lost
                )
                VALUES
                (
                    $1,
                    $2,
                    $3,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                )
                `,
                [
                    savedGroup.id,
                    group.entries[i].id,
                    i + 1
                ]
            );
        }
        savedGroups.push({
            ...savedGroup,
            entries: group.entries
        });
    }
    return savedGroups;
};

const getEntries = async (tournamentId) => {
    const result = await pool.query(
        `
        SELECT *
        FROM tournament_entries
        WHERE tournament_id = $1
        ORDER BY seed NULLS LAST,id
        `,
        [tournamentId]
    );
    return result.rows;
};

const distributeEntries = async (groups, entries) => {
    let direction = 1;
    let index = 0;
    for (const entry of entries) {
        await pool.query(
            `
            INSERT INTO group_entries
            (
                group_id,
                entry_id
            )
            VALUES
            (
                $1,
                $2
            )
            `,
            [
                groups[index].id,
                entry.id
            ]
        );
        if (direction === 1) {
            if (index === groups.length - 1) {
                direction = -1;
            } else {
                index++;
            }
        } else {
            if (index === 0) {
                direction = 1;
            } else {
                index--;
            }
        }
    }
};

const getGroupEntries = async (groupId) => {
    const result = await pool.query(
        `
        SELECT
            ge.*,
            te.player_id,
            te.team_id
        FROM group_entries ge
        INNER JOIN tournament_entries te
            ON te.id = ge.entry_id
        WHERE ge.group_id = $1
        ORDER BY ge.id
        `,
        [groupId]
    );
    return result.rows;
};

const generateGroupMatches = async (tournamentId, stageId, groups) => {
    for (const group of groups) {
        const entries = await getGroupEntries(group.id);
        const rounds = generateRoundRobinMatches(entries);
        let matchOrder = 1;
        for (let roundIndex = 0; roundIndex < rounds.length; roundIndex++) {
            const round = rounds[roundIndex];
            for (const match of round) {
                await pool.query(
                    `
                    INSERT INTO matches
                    (
                        tournament_id,
                        stage_id,
                        group_id,
                        player_one_id,
                        player_two_id,
                        round,
                        round_order,
                        match_order,
                        status
                    )
                    VALUES
                    (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6,
                        $7,
                        $8,
                        'pending'
                    )
                    `,
                    [
                        tournamentId,
                        stageId,
                        group.id,
                        match.playerOne.player_id,
                        match.playerTwo.player_id,
                        `Group ${group.name}`,
                        roundIndex + 1,
                        matchOrder++
                    ]
                );
            }
        }
    }
};

export const recalculateGroup = async (groupId) => {
    await pool.query(
        `
        UPDATE group_entries
        SET
            wins = 0,
            losses = 0,
            sets_won = 0,
            sets_lost = 0,
            points_won = 0,
            points_lost = 0
        WHERE group_id = $1
        `,
        [groupId]
    );
    const matchesResult = await pool.query(
        `
        SELECT *
        FROM matches
        WHERE
            group_id = $1
            AND status = 'finished'
        `,
        [groupId]
    );
    const matches = matchesResult.rows;
    for (const match of matches) {
        const setsResult = await pool.query(
            `
            SELECT *
            FROM match_sets
            WHERE match_id = $1
            ORDER BY set_number
            `,
            [match.id]
        );
        const sets = setsResult.rows;
        let playerOneSets = 0;
        let playerTwoSets = 0;
        let playerOnePoints = 0;
        let playerTwoPoints = 0;
        for (const set of sets) {
            playerOnePoints += set.player_one_score;
            playerTwoPoints += set.player_two_score;
            if (set.player_one_score > set.player_two_score) {
                playerOneSets++;
            } else {
                playerTwoSets++;
            }
        }
        await pool.query(
            `
            UPDATE group_entries ge
            SET
                wins = wins + $1,
                losses = losses + $2,
                sets_won = sets_won + $3,
                sets_lost = sets_lost + $4,
                points_won = points_won + $5,
                points_lost = points_lost + $6
            FROM tournament_entries te
            WHERE
                ge.entry_id = te.id
                AND ge.group_id = $8
                AND te.player_id = $7
            `,
            [
                playerOneSets > playerTwoSets ? 1 : 0,
                playerOneSets > playerTwoSets ? 0 : 1,
                playerOneSets,
                playerTwoSets,
                playerOnePoints,
                playerTwoPoints,
                match.player_one_id,
                groupId
            ]
        );
        await pool.query(
            `
            UPDATE group_entries ge
            SET
                wins = wins + $1,
                losses = losses + $2,
                sets_won = sets_won + $3,
                sets_lost = sets_lost + $4,
                points_won = points_won + $5,
                points_lost = points_lost + $6
            FROM tournament_entries te
            WHERE
                ge.entry_id = te.id
                AND ge.group_id = $8
                AND te.player_id = $7
            `,
            [
                playerTwoSets > playerOneSets ? 1 : 0,
                playerTwoSets > playerOneSets ? 0 : 1,
                playerTwoSets,
                playerOneSets,
                playerTwoPoints,
                playerOnePoints,
                match.player_two_id,
                groupId
            ]
        );
    }
    const standings = await pool.query(
        `
        SELECT
            ge.*
        FROM group_entries ge
        WHERE ge.group_id = $1
        ORDER BY
            wins DESC,
            (sets_won - sets_lost) DESC,
            (points_won - points_lost) DESC
        `,
        [groupId]
    );
    let position = 1;
    for (const row of standings.rows) {
        await pool.query(
            `
            UPDATE group_entries
            SET position = $1
            WHERE id = $2
            `,
            [
                position++,
                row.id
            ]
        );
    }
    const updatedStandings = await pool.query(
        `
        SELECT *
        FROM group_entries
        WHERE group_id = $1
        ORDER BY position
        `,
        [groupId]
    );
    return updatedStandings.rows;
};

const getGroupStandings = async (groupId) => {
    const result = await pool.query(
        `
        SELECT
            ge.*,
            te.tournament_id,
            te.player_id,
            te.team_id
        FROM group_entries ge
        INNER JOIN tournament_entries te
            ON te.id = ge.entry_id
        WHERE ge.group_id = $1
        ORDER BY
            ge.position ASC
        `,
        [groupId]
    );
    return result.rows;
};

const getKnockoutStage = async (competitionId) => {
    const result = await pool.query(
        `
        SELECT *
        FROM stages
        WHERE
            competition_id = $1
            AND stage_type = 'knockout'
        `,
        [competitionId]
    );
    return result.rows[0];
};

export const generateKnockout = async (competitionId) => {
    const knockoutStage = await getKnockoutStage(
        competitionId
    );
    const groupsResult = await pool.query(
        `
        SELECT *
        FROM groups
        WHERE stage_id = (
            SELECT id
            FROM stages
            WHERE
                competition_id = $1
                AND stage_type = 'groups'
        )
        ORDER BY name
        `,
        [competitionId]
    );
    const groups = groupsResult.rows;
    const qualified = [];
    for (const group of groups) {
        const standings = await getGroupStandings(
            group.id
        );
        if (standings[0]) {
            qualified.push({
                group: group.name,
                position: 1,
                ...standings[0]
            });
        }
        if (standings[1]) {
            qualified.push({
                group: group.name,
                position: 2,
                ...standings[1]
            });
        }
    }
    const bracket = insertByes(
        qualified
    );
    const firstRound = calculateRounds(
        bracket.length
    )[0];
    await createKnockoutTree(
        bracket[0].tournament_id,
        knockoutStage.id,
        bracket.length
    );
    const rounds = calculateRounds(
        bracket.length
    );
    const firstRoundOrder = 1;
    let order = 1;
    for (let i = 0; i < bracket.length; i += 2) {
        const playerOne = bracket[i];
        const playerTwo = bracket[i + 1];
        if (!playerOne && !playerTwo) {
            continue;
        }
        const matchResult = await pool.query(
            `
            SELECT *
            FROM matches
            WHERE
                stage_id = $1
                AND round_order = 1
                AND match_order = $2
            `,
            [
                knockoutStage.id,
                order
            ]
        );
        if (!matchResult.rows.length) {
            throw new Error("First round match not found");
        }
        await pool.query(
            `
            UPDATE matches
            SET
                player_one_id = $1,
                player_two_id = $2,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
            `,
            [
                playerOne?.player_id ?? null,
                playerTwo?.player_id ?? null,
                matchResult.rows[0].id
            ]
        );
        order++;
    }
};

const createKnockoutTree = async (tournamentId, stageId, totalPlayers) => {
    const rounds = calculateRounds(totalPlayers);
    let matchesInRound = totalPlayers / 2;
    let roundOrder = 1;
    for (const round of rounds) {
        for (let order = 1; order <= matchesInRound; order++) {
            await pool.query(
                `
                INSERT INTO matches
                (
                    tournament_id,
                    stage_id,
                    round,
                    round_order,
                    match_order,
                    status
                )
                VALUES
                (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    'pending'
                )
                `,
                [
                    tournamentId,
                    stageId,
                    round,
                    roundOrder,
                    order
                ]
            );
        }
        matchesInRound /= 2;
        roundOrder++;
    }
};

export const finishGroupStage = async (competitionId) => {
    const groupStage = await pool.query(
        `
        SELECT *
        FROM stages
        WHERE
            competition_id = $1
            AND stage_type='groups'
        `,
        [competitionId]
    );
    const groups = await pool.query(
        `
        SELECT *
        FROM groups
        WHERE stage_id=$1
        `,
        [groupStage.rows[0].id]
    );
    for (const group of groups.rows) {
        await recalculateGroup(group.id);
    }
    await generateKnockout(
        competitionId
    );
};

export const isGroupFinished = async (groupId) => {
    const result = await pool.query(
        `
        SELECT COUNT(*) total
        FROM matches
        WHERE
            group_id = $1
            AND status <> 'finished'
        `,
        [groupId]
    );
    return Number(result.rows[0].total) === 0;
};

export const areGroupsFinished = async (competitionId) => {
    const groups = await pool.query(
        `
        SELECT g.id
        FROM groups g

        INNER JOIN stages s
            ON s.id = g.stage_id

        WHERE
            s.competition_id = $1
            AND s.stage_type = 'groups'
        `,
        [competitionId]
    );
    for (const group of groups.rows) {
        const finished = await isGroupFinished(group.id);
        if (!finished) {
            return false;
        }
    }
    return true;
};

export const startCompetition = async (tournamentId) => {
    const competition = await createCompetition(
        tournamentId
    );
    const stages = await createStages(
        competition.id
    );
    const entries = await getEntries(
        tournamentId
    );
    if (entries.length < 2) {
        throw new Error(
            "At least two entries are required"
        );
    }
    const groupStage = stages.find(
        stage => stage.stage_type === "groups"
    );
    
    const generatedGroups = generateGroups(entries);

    const groups = await saveGroups(
        groupStage.id,
        generatedGroups
    );

    await generateGroupMatches(
        tournamentId,
        groupStage.id,
        groups
    );

    await pool.query(
        `
        UPDATE tournaments
        SET
            status = 'ongoing',
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        `,
        [tournamentId]
    );
    return {
        competition,
        stages,
        groups
    };
};