import { z } from "zod";
import { id } from "zod/v4/locales";

export const tournamentIdSchema = z.object({
    params: z.object({
        id: z.string().uuid()
    })
});