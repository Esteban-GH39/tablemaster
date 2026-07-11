import { z } from "zod";

const setSchema = z.object({
    playerOneScore: z.number().int().min(0),
    playerTwoScore: z.number().int().min(0)
});

export const registerMatchResultSchema = z.object({
    sets: z.array(setSchema).min(3).max(5)
});