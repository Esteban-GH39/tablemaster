import { z } from "zod";

export const createEntrySchema = z.object({
    body: z.object({
        playerId:
            z.number()
                .int()
                .positive()
                .optional(),
        teamId:
            z.number()
                .int()
                .positive()
                .optional(),
        seed:
            z.number()
                .int()
                .positive()
                .optional()
    }).refine(
        data =>
            (data.playerId && !data.teamId)
            ||
            (!data.playerId && data.teamId),
        {
            message:
                "Exactly one of playerId or teamId is required"
        }
    )
});