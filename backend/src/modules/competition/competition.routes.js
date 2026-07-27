import { Router } from "express";

import { auth } from "../../middlewares/auth.js";

import { requireRole } from "../../middlewares/requireRole.js";

import { validate } from "../../middlewares/validate.js";

import { startCompetitionSchema } from "./competition.schema.js";

import { startCompetitionController } from "./competition.controller.js";

const router = Router();

router.post(
    "/:id/start",
    auth,
    requireRole("admin", "organizer"),
    validate(startCompetitionSchema),
    startCompetitionController
);

export default router;