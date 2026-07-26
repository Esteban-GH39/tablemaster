import { Router } from "express";

import { validate } from "../../middlewares/validate.js";

import { startCompetitionSchema } from "./competition.schema.js";

import { startCompetitionController } from "./competition.controller.js";

const router = Router();

router.post(
    "/:id/start",
    validate(startCompetitionSchema),
    startCompetitionController
);

export default router;