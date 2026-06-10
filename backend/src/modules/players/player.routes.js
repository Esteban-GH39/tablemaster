import { Router } from "express";
import { getPlayers, getPlayerByIdController, createPlayerController, updatePlayerController, deletePlayerController } from "./player.controller.js";

const router = Router();

router.get("/", getPlayers);
router.get("/:id", getPlayerByIdController);
router.post("/", createPlayerController);
router.put("/:id", updatePlayerController);
router.delete("/:id", deletePlayerController);

export default router; 