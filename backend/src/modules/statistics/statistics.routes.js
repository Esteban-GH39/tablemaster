import { Router } from "express";

import { validate } from "../../middlewares/validate.js";

import { playerStatisticsSchema, tournamentStatisticsSchema } from "./statistics.schema.js";

import { getPlayerStatisticsController, getTournamentStatisticsController } from "./statistics.controller.js";

const router = Router();

router.get("/player/:id", validate(playerStatisticsSchema), getPlayerStatisticsController);

router.get("/tournament/:id", validate(tournamentStatisticsSchema), getTournamentStatisticsController);

export default router;