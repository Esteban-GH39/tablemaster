import { z } from "zod";

export const registerPlayerSchema = z.object({
    playerId: z
        .number()
        .int()
        .positive("Player ID must be a positive integer")
})