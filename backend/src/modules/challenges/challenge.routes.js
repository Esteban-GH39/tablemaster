import { Router } from "express";

import { auth } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";

import {
    createChallengeSchema,
    challengeIdSchema
} from "./challenge.schema.js";

import {
    createChallengeController,
    getIncomingChallengesController,
    getOutgoingChallengesController,
    confirmChallengeController,
    rejectChallengeController
} from "./challenge.controller.js";

const router = Router();

router.post(
    "/",
    auth,
    validate(createChallengeSchema),
    createChallengeController
);

router.get("/incoming", auth, getIncomingChallengesController);

router.get("/outgoing", auth, getOutgoingChallengesController);

router.patch(
    "/:id/confirm",
    auth,
    validate(challengeIdSchema),
    confirmChallengeController
);

router.patch(
    "/:id/reject",
    auth,
    validate(challengeIdSchema),
    rejectChallengeController
);

export default router;
