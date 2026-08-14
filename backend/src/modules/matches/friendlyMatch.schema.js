import { z } from "zod";

const setSchema = z.object({
    playerOneScore: z.number().int().min(0),
    playerTwoScore: z.number().int().min(0)
});

export const proposeFriendlyMatchSchema = z.object({
    body: z.object({
        opponentId: z.string().uuid(),
        sets: z.array(setSchema).min(2).max(7),
        setsToWin: z.union([
            z.literal(2),
            z.literal(3),
            z.literal(4)
        ]).default(3)
    })
});

export const friendlyMatchIdSchema = z.object({
    params: z.object({
        id: z.string().uuid()
    })
});
