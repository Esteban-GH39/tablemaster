import { Router } from "express";

import { validate } from "../../middlewares/validate.js";

import { loginSchema } from "./auth.schema.js";

import { loginController } from "./auth.controller.js";

const router = Router();

router.post(
    "/login",
    validate(loginSchema),
    loginController
);

export default router;