import { Router } from "express";

import { registerMatchResultController } from "./matchResult.controller.js";

import { validate } from "../../middlewares/validate.js";

import { registerMatchResultSchema } from "./matchResult.schema.js";

const router = Router();

router.post("/:id", validate(registerMatchResultSchema), registerMatchResultController);

export default router;