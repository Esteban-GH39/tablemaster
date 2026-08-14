import { z } from "zod";

const setSchema = z.object({
    playerOneScore: z.number().int().min(0),
    playerTwoScore: z.number().int().min(0)
});

export const createChallengeSchema = z.object({
    body: z.object({
        opponentPlayerId: z.string().uuid(),
        setsToWin: z.union([
            z.literal(2),
            z.literal(3),
            z.literal(4)
        ]).default(3),
        sets: z.array(setSchema).min(1)
    })
});

export const challengeIdSchema = z.object({
    params: z.object({
        id: z.string().uuid()
    })
});
