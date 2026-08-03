import { Router } from "express";

import { auth } from "../../middlewares/auth.js";

import { validate } from "../../middlewares/validate.js";

import { loginSchema, forgotPasswordSchema, resetPasswordSchema } from "./auth.schema.js";

import { loginController, getMeController, forgotPasswordController, resetPasswordController } from "./auth.controller.js";

const router = Router();

router.get(
    "/me",
    auth,
    getMeController
);

router.post(
    "/login",
    validate(loginSchema),
    loginController
);

router.post(
    "/forgot-password",
    validate(forgotPasswordSchema),
    forgotPasswordController
);

router.post(
    "/reset-password",
    validate(resetPasswordSchema),
    resetPasswordController
);

export default router;