import { Router } from "express";

import { getGlobalRankingController, getTournamentRankingController } from "./ranking.controller.js";

const router = Router();

router.get("/", getGlobalRankingController);
router.get("/tournament/:id", getTournamentRankingController);

export default router;