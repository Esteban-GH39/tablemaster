import { Router } from "express";
import {
    getTournaments,
    getTournamentByIdController,
    createTournamentController,
    updateTournamentController,
    patchTournamentController,
    deleteTournamentController
} from "./tournament.controller.js";

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
    validate(createTournamentSchema),
    createTournamentController
);

router.put(
    "/:id",
    validate(tournamentIdSchema),
    validate(updateTournamentSchema),
    updateTournamentController
);

router.patch(
    "/:id",
    validate(tournamentIdSchema),
    validate(patchTournamentSchema),
    patchTournamentController
);

router.delete(
    "/:id",
    validate(tournamentIdSchema),
    deleteTournamentController
);

export default router;