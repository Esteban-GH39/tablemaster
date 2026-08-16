import { Router } from "express";

import { auth } from "../../middlewares/auth.js";

import {
    getPlayerInsightsController,
    getMatchPredictionsController,
    getPredictionForMatchController,
    getInsightsSummaryController
} from "./insight.controller.js";

const router = Router();

router.get("/summary", auth, getInsightsSummaryController);
router.get("/players", auth, getPlayerInsightsController);
router.get("/predictions", auth, getMatchPredictionsController);
router.get("/predictions/:matchId", auth, getPredictionForMatchController);

export default router;
