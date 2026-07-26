import { z } from "zod";

export const startCompetitionSchema = z.object({
    params: z.object({
        id: z.string().uuid()
    })
});

export const finishGroupsSchema = z.object({
    params: z.object({
        id: z.string().uuid()
    })
});

export const finishCompetitionSchema = z.object({
    params: z.object({
        id: z.string().uuid()
    })
});