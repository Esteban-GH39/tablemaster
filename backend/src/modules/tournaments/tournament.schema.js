import { z } from "zod";

export const createTournamentSchema = z.object({
    body: z.object({
        name: z.string()
            .trim()
            .min(3, "Tournament name must be at least 3 characters long"),

        description: z.string()
            .trim()
            .optional(),

        location: z.string()
            .trim()
            .min(2, "Location must be at least 2 characters long"),

        startDate: z.iso.date(),

        endDate: z.iso.date(),

        status: z.enum([
            "draft",
            "registration",
            "ongoing",
            "finished"
        ]).optional(),

        maxPlayers: z.number()
            .int()
            .positive()
    })
});

export const updateTournamentSchema = createTournamentSchema;

export const patchTournamentSchema = z.object({
    body: createTournamentSchema.shape.body.partial()
});

export const tournamentIdSchema = z.object({
    params: z.object({
        id: z.string().uuid()
    })
});