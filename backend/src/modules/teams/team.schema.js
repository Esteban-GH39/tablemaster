import {z} from "zod";

export const createTeamSchema=z.object({
    body:z.object({
        name:z.string().min(2),
        type:z.enum([
            "double",
            "team"
        ])
    })
});

export const updateTeamSchema=createTeamSchema;

export const addPlayerSchema=z.object({
    body:z.object({
        playerId:z.number().int().positive()
    })
});