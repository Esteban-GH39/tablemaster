import { z } from "zod";

export const playerStatisticsSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive()
    })
});

export const tournamentStatisticsSchema = z.object({
    params: z.object({
        id: z.string().uuid()
    })
});