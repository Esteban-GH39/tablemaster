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
    deleteEntryController,
    createSelfEntryController,
    deleteSelfEntryController
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

// Auto-inscripcion de un player a un torneo (usa su propio perfil de
// jugador, no puede inscribir a otros).
router.post(
    "/:id/entries/self",
    auth,
    requireRole("player"),
    validate(tournamentIdSchema),
    createSelfEntryController
);

router.delete(
    "/:id/entries/self",
    auth,
    requireRole("player"),
    validate(tournamentIdSchema),
    deleteSelfEntryController
);

router.delete(
    "/entries/:entryId",
    auth,
    requireRole("admin", "organizer"),
    validate(entryIdSchema),
    deleteEntryController
);

export default router;