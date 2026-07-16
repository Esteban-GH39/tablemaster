import { Router } from "express";
import { getMatchesController, getMatchByIdController, createMatchController, updateMatchController, patchMatchController, deleteMatchController } from "./match.controller.js";

import { validate } from "../../middlewares/validate.js";

import { createMatchSchema, updateMatchSchema, patchMatchSchema, matchIdSchema } from "./match.schema.js";

const router = Router();

router.get("/", getMatchesController);

router.get("/:id", validate(matchIdSchema), getMatchByIdController);

router.post("/", validate(createMatchSchema), createMatchController);

router.put("/:id", validate(matchIdSchema), validate(updateMatchSchema), updateMatchController);

router.patch("/:id", validate(matchIdSchema), validate(patchMatchSchema), patchMatchController);

router.delete("/:id", validate(matchIdSchema), deleteMatchController);

export default router;