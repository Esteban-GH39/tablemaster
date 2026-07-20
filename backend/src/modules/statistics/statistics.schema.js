import { z } from "zod";

export const playerStatisticsSchema = z.object({
    params: z.object({
        id: z.string().uuid()
    })
});

export const tournamentStatisticsSchema = z.object({
    params: z.object({
        id: z.string().uuid()
    })
});