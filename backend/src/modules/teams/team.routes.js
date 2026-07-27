import { Router } from "express";

import { auth } from "../../middlewares/auth.js";

import { requireRole } from "../../middlewares/requireRole.js";

import { validate } from "../../middlewares/validate.js";

import {
    createTeamSchema,
    updateTeamSchema,
    addPlayerSchema,
    teamIdSchema,
    teamPlayerSchema
} from "./team.schema.js";

import * as controller from "./team.controller.js";

const router = Router();

router.get("/", controller.getTeamsController);

router.get(
    "/:id",
    validate(teamIdSchema),
    controller.getTeamByIdController
);

router.post(
    "/",
    auth,
    requireRole("admin", "organizer"),
    validate(createTeamSchema),
    controller.createTeamController
);

router.put(
    "/:id",
    auth,
    requireRole("admin", "organizer"),
    validate(teamIdSchema),
    validate(updateTeamSchema),
    controller.updateTeamController
);

router.delete(
    "/:id",
    auth,
    requireRole("admin"),
    validate(teamIdSchema),
    controller.deleteTeamController
);

router.get(
    "/:id/players",
    validate(teamIdSchema),
    controller.getPlayersController
);

router.post(
    "/:id/players",
    auth,
    requireRole("admin", "organizer"),
    validate(teamIdSchema),
    validate(addPlayerSchema),
    controller.addPlayerController
);

router.delete(
    "/:id/players/:playerId",
    auth,
    requireRole("admin", "organizer"),
    validate(teamPlayerSchema),
    controller.removePlayerController
);

export default router;