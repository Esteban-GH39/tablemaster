import { z } from "zod";

export const createUserSchema = z.object({
    body: z.object({
        fullName: z.string()
            .trim()
            .min(3)
            .max(100),
        email: z.string()
            .trim()
            .email(),
        password: z.string()
            .min(8)
            .max(100),
        role: z.enum([
            "admin",
            "organizer",
            "referee",
            "player"
        ])
    })
});

export const updateUserSchema = createUserSchema;

export const patchUserSchema = z.object({
    body: createUserSchema.shape.body
        .partial()
        .extend({
            isActive: z.boolean().optional()
        })
});

export const userIdSchema = z.object({
    params: z.object({
        id: z.string().uuid()
    })
});