import { z } from "zod";

export const createEntrySchema = z.object({
    playerId: z
        .string()
        .uuid()
        .optional(),
    teamId: z
        .string()
        .uuid()
        .optional(),
    seed: z
        .number()
        .int()
        .positive()
        .optional()
}).refine(
    data =>
        (data.playerId && !data.teamId) ||
        (!data.playerId && data.teamId),
    {
        message: "Exactly one of playerId or teamId is required"
    }
);

export const tournamentIdSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive()
    })
});

export const entryIdSchema = z.object({
    params: z.object({
        entryId: z.coerce.number().int().positive()
    })
});