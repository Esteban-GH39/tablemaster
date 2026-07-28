import { Router } from "express";
import {
    getPlayers,
    getPlayerByIdController,
    createPlayerController,
    updatePlayerController,
    patchPlayerController,
    deletePlayerController
} from "./player.controller.js";

import { auth } from "../../middlewares/auth.js"

import { requireRole } from "../../middlewares/requireRole.js";

import { playerOwner } from "../../middlewares/playerOwner.js";

import { validate } from "../../middlewares/validate.js";

import {
    createPlayerSchema,
    updatePlayerSchema,
    patchPlayerSchema,
    playerIdSchema
} from "./player.schema.js";

const router = Router();

router.get("/", getPlayers);

router.get(
    "/:id",
    validate(playerIdSchema),
    getPlayerByIdController
);

router.post(
    "/",
    auth,
    requireRole("player"),
    validate(createPlayerSchema),
    createPlayerController
);

router.put(
    "/:id",
    auth,
    requireRole("admin", "organizer", "player"),
    playerOwner,
    validate(playerIdSchema),
    validate(updatePlayerSchema),
    updatePlayerController
);

router.patch(
    "/:id",
    auth,
    requireRole("admin", "organizer", "player"),
    playerOwner,
    validate(playerIdSchema),
    validate(patchPlayerSchema),
    patchPlayerController
);

router.delete(
    "/:id",
    auth,
    requireRole("admin", "organizer"),
    validate(playerIdSchema),
    deletePlayerController
);

export default router;