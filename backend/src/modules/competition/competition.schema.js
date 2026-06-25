import { z } from "zod";

export const startCompetitionChema = z.object({
    params: z.object({
        tournamentId: z.coerce
            .number()
            .int()
            .positive()
    })
});

export const finishGroupsSchema = z.object({
    params: z.object({
        competitionId: z.coerce
            .number()
            .int()
            .positive()
    })
});

export const finishCompetitionSchema = z.object({
    params: z.object({
        competitionId: z.coerce
            .number()
            .int()
            .positive()
    })
});