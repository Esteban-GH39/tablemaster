import { pool } from "../../config/database.js";

import { getTournamentById } from "../tournaments/tournament.service.js";
import { sortEntriesBySeed } from "../../helpers/bracket/seed.generator.js";
import { addByes } from "../../helpers/bracket/bye.generator.js";
import { generateBracket } from "../../helpers/bracket/bracket.generator.js";

export const generateCompetition = async (tournamentId) => {
    const tournament = await getTournamentById(tournamentId);
    if (!tournament) {
        throw new Error("Tournament not found");
    }
    if (tournament.status !== "registration") {
        throw new Error("Tournament is not accepting entries");
    }
    const result = await pool.query(`
        SELECT *
        FROM tournament_entries
        WHERE tournament_id=$1
        ORDER BY seed NULLS LAST
    `,[tournamentId]);
    const entries=result.rows;
    if(entries.length<2){
        throw new Error("At least two entries are required");
    }
    const orderedEntries=sortEntriesBySeed(entries);
    const bracketEntries=addByes(orderedEntries);
    const matches=generateBracket(bracketEntries);
    console.log(matches);
    return matches;
};