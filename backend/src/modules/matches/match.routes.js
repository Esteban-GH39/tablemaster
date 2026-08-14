import { Router } from "express";

import {
    getMatchesController,
    getMatchByIdController,
    createMatchController,
    updateMatchController,
    patchMatchController,
    deleteMatchController,
    getHeadToHeadController
} from "./match.controller.js";

import {
    proposeFriendlyMatchController,
    confirmFriendlyMatchController,
    rejectFriendlyMatchController,
    getPendingConfirmationsController
} from "./friendlyMatch.controller.js";

import { auth } from "../../middlewares/auth.js";
import { requireRole } from "../../middlewares/requireRole.js";
import { validate } from "../../middlewares/validate.js";

import {
    createMatchSchema,
    updateMatchSchema,
    patchMatchSchema,
    matchIdSchema,
    headToHeadSchema
} from "./match.schema.js";

import {
    proposeFriendlyMatchSchema,
    friendlyMatchIdSchema
} from "./friendlyMatch.schema.js";

const router = Router();

router.get("/", getMatchesController);

router.get(
    "/head-to-head",
    validate(headToHeadSchema),
    getHeadToHeadController
);

router.get(
    "/pending-confirmations",
    auth,
    getPendingConfirmationsController
);

router.post(
    "/friendly",
    auth,
    validate(proposeFriendlyMatchSchema),
    proposeFriendlyMatchController
);

router.post(
    "/:id/confirm",
    auth,
    validate(friendlyMatchIdSchema),
    confirmFriendlyMatchController
);

router.post(
    "/:id/reject",
    auth,
    validate(friendlyMatchIdSchema),
    rejectFriendlyMatchController
);

router.get(
    "/:id",
    validate(matchIdSchema),
    getMatchByIdController
);

router.post(
    "/",
    auth,
    requireRole("admin", "organizer"),
    validate(createMatchSchema),
    createMatchController
);

router.put(
    "/:id",
    auth,
    requireRole("admin", "organizer"),
    validate(matchIdSchema),
    validate(updateMatchSchema),
    updateMatchController
);

router.patch(
    "/:id",
    auth,
    requireRole("admin", "organizer"),
    validate(matchIdSchema),
    validate(patchMatchSchema),
    patchMatchController
);

router.delete(
    "/:id",
    auth,
    requireRole("admin"),
    validate(matchIdSchema),
    deleteMatchController
);

export default router;