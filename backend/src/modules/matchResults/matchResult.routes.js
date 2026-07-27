import { Router } from "express";

import { registerMatchResultController } from "./matchResult.controller.js";

import { auth } from "../../middlewares/auth.js";

import { requireRole } from "../../middlewares/requireRole.js";

import { validate } from "../../middlewares/validate.js";

import { registerMatchResultSchema } from "./matchResult.schema.js";

const router = Router();

router.post(
    "/:id",
    auth,
    requireRole(
        "admin",
        "organizer",
        "referee"
    ),
    validate(registerMatchResultSchema),
    registerMatchResultController
);

export default router;