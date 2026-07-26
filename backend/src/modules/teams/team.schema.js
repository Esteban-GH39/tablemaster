import { z } from "zod";

export const createTeamSchema = z.object({
    body: z.object({
        name: z.string().min(2),
        type: z.enum([
            "double",
            "team"
        ])
    })
});

export const updateTeamSchema = createTeamSchema;

export const patchTeamSchema = z.object({
    body: createTeamSchema.shape.body.partial()
});

export const addPlayerSchema = z.object({
    body: z.object({
        playerId: z.string().uuid()
    })
});

export const teamIdSchema = z.object({
    params: z.object({
        id: z.string().uuid()
    })
});

export const teamPlayerSchema = z.object({
    params: z.object({
        id: z.string().uuid(),
        playerId: z.string().uuid()
    })
});