import { Router } from "express";

import { auth } from "../../middlewares/auth.js";

import { requireRole } from "../../middlewares/requireRole.js";

import { validate } from "../../middlewares/validate.js";

import {
    createEntrySchema,
    tournamentIdSchema,
    entryIdSchema
} from "./entry.schema.js";

import {
    createEntryController,
    getEntriesController,
    deleteEntryController
} from "./entry.controller.js";

const router = Router();

router.get(
    "/:id/entries",
    validate(tournamentIdSchema),
    getEntriesController
);

router.post(
    "/:id/entries",
    auth,
    requireRole("admin", "organizer"),
    validate(tournamentIdSchema),
    validate(createEntrySchema),
    createEntryController
);

router.delete(
    "/entries/:entryId",
    auth,
    requireRole("admin", "organizer"),
    validate(entryIdSchema),
    deleteEntryController
);

export default router;