import { Router } from "express";
import { getPlayers, createPlayerController } from "./player.controller.js";

const router = Router();

router.get("/", getPlayers);
router.post("/", createPlayerController);

export default router; 