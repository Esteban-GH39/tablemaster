import { Router } from "express";

import { validate } from "../../middlewares/validate.js";

import { tournamentRankingSchema } from "./ranking.schema.js";

import {
    getGlobalRankingController,
    getTournamentRankingController
} from "./ranking.controller.js";

const router = Router();

router.get("/", getGlobalRankingController);

router.get(
    "/tournament/:id",
    validate(tournamentRankingSchema),
    getTournamentRankingController
);

export default router;