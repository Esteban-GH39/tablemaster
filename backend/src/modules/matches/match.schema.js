import { z } from "zod";

export const createMatchSchema = z.object({
    body: z.object({
        tournamentId: z.number().int().positive(),

        playerOneId: z.number().int().positive().nullable().optional(),

        playerTwoId: z.number().int().positive().nullable().optional(),

        winnerId: z.number().int().positive().nullable().optional(),

        round: z.string().min(1).max(30),

        matchOrder: z.number().int().positive(),

        status: z.enum([
            "pending",
            "in_progress",
            "finished"
        ]).default("pending"),

        playedAt: z.string().datetime().optional()
    })
});

export const updateMatchSchema = createMatchSchema;

export const patchMatchSchema = z.object({
    body: createMatchSchema.shape.body.partial()
}); 