import { z } from "zod";

export const tournamentRankingSchema = z.object({
    params: z.object({
        id: z.string().uuid()
    })
});