import { Router } from "express";

import { validate } from "../../middlewares/validate.js";

import { tournamentIdSchema } from "./group.schema.js";

import { getGroupsController } from "./group.controller.js";

const router = Router();

router.get(
    "/:id/groups",
    validate(tournamentIdSchema),
    getGroupsController
);

export default router;