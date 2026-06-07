import { Router } from "express";
import { getPlayers } from "./player.controller.js";

const router = Router();

router.get("/", getPlayers);

export default router;