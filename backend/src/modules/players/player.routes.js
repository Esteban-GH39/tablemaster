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
    validate(createPlayerSchema),
    createPlayerController
);

router.put(
    "/:id",
    validate(playerIdSchema),
    validate(updatePlayerSchema),
    updatePlayerController
);

router.patch(
    "/:id",
    validate(playerIdSchema),
    validate(patchPlayerSchema),
    patchPlayerController
);

router.delete(
    "/:id",
    validate(playerIdSchema),
    deletePlayerController
);

export default router;