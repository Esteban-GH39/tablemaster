import { Router } from "express";
import { startCompetitionController } from "./competition.controller.js";

const router = Router();

router.post("/:id/start", startCompetitionController);

export default router;