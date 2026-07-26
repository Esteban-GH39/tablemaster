import { z } from "zod";

export const createMatchSchema = z.object({
    body: z.object({
        tournamentId: z.string().uuid(),

        playerOneId: z.string().uuid().nullable().optional(),

        playerTwoId: z.string().uuid().nullable().optional(),

        winnerId: z.string().uuid().nullable().optional(),

        round: z.string().trim().min(1).max(30),

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

export const matchIdSchema = z.object({
    params: z.object({
        id: z.string().uuid()
    })
});