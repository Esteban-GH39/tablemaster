import { Router } from "express";
import {
    getTournaments,
    getTournamentByIdController,
    createTournamentController,
    updateTournamentController,
    patchTournamentController,
    deleteTournamentController
} from "./tournament.controller.js";

import { auth } from "../../middlewares/auth.js";

import { requireRole } from "../../middlewares/requireRole.js";

import { validate } from "../../middlewares/validate.js";

import {
    createTournamentSchema,
    updateTournamentSchema,
    patchTournamentSchema,
    tournamentIdSchema
} from "./tournament.schema.js";

const router = Router();

router.get("/", getTournaments);

router.get(
    "/:id",
    validate(tournamentIdSchema),
    getTournamentByIdController
);

router.post(
    "/",
    auth,
    requireRole("admin", "organizer"),
    validate(createTournamentSchema),
    createTournamentController
);

router.put(
    "/:id",
    auth,
    requireRole("admin", "organizer"),
    validate(tournamentIdSchema),
    validate(updateTournamentSchema),
    updateTournamentController
);

router.patch(
    "/:id",
    auth,
    requireRole("admin", "organizer"),
    validate(tournamentIdSchema),
    validate(patchTournamentSchema),
    patchTournamentController
);

router.delete(
    "/:id",
    auth,
    requireRole("admin"),
    validate(tournamentIdSchema),
    deleteTournamentController
);

export default router;