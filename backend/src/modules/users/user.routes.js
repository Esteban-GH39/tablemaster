import { Router } from "express";

import { validate } from "../../middlewares/validate.js";

import { createUserSchema, updateUserSchema, patchUserSchema, userIdSchema } from "./user.schema.js";

import * as controller from "./user.controller.js";

import { auth } from "../../middlewares/auth.js";
import { requireRole } from "../../middlewares/requireRole.js";
import { optionalAuth } from "../../middlewares/optionalAuth.js";

const router = Router();

router.get("/", auth, requireRole("admin"), controller.getUsersController);

router.get(
    "/:id",
    auth,
    requireRole("admin"),
    validate(userIdSchema),
    controller.getUserByIdController
);

router.post(
    "/",
    optionalAuth,
    validate(createUserSchema),
    controller.createUserController
);

router.put(
    "/:id",
    auth,
    requireRole("admin"),
    validate(userIdSchema),
    validate(updateUserSchema),
    controller.updateUserController
);

router.patch(
    "/:id",
    auth,
    requireRole("admin"),
    validate(userIdSchema),
    validate(patchUserSchema),
    controller.patchUserController
);

router.delete(
    "/:id",
    auth,
    requireRole("admin"),
    validate(userIdSchema),
    controller.deleteUserController
);

export default router;