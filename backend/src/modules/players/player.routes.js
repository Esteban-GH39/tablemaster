import { Router } from "express";
import { getPlayers, getPlayerByIdController, createPlayerController, updatePlayerController, patchPlayerController, deletePlayerController } from "./player.controller.js";
import { validate } from "../../middlewares/validate.js";
import { createPlayerSchema, updatePlayerSchema, patchPlayerSchema } from "./player.schema.js";

const router = Router();

router.get("/", getPlayers);
router.get("/:id", getPlayerByIdController);
router.post("/", validate(createPlayerSchema), createPlayerController);
router.put("/:id", validate(updatePlayerSchema), updatePlayerController);
router.patch("/:id", validate(patchPlayerSchema), patchPlayerController);
router.delete("/:id", deletePlayerController);

export default router; 