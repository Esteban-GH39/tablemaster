import { z } from 'zod';

export const createPlayerSchema = z.object({
    fullname: z.string().trim().min(3, "Full name must be at least 3 characters long"),
    age: z.number().int().positive().min(5, "Age must be at least 5").max(100, "Age must be less than or equal to 100"),
    gender: z.enum(["male", "female"]),
    club: z.string().trim().min(2, "Club name must be at least 2 characters long"),
    dominateHand: z.enum(["right", "left"]),
    playStyle: z.enum(["defensive", "offensive", "all-round"]),
    gripType: z.enum(["shakehand", "penhold"]).optional()
})

export const updatePlayerSchema = createPlayerSchema.partial()