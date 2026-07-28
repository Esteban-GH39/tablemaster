import { Router } from "express";

import { auth } from "../../middlewares/auth.js";

import { validate } from "../../middlewares/validate.js";

import { loginSchema } from "./auth.schema.js";

import { loginController, getMeController } from "./auth.controller.js";

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

export default router;