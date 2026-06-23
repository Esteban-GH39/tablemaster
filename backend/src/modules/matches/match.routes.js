import { Router } from "express";
import { getMatchesController, getMatchByIdController, createMatchController, updateMatchController, patchMatchController, deleteMatchController } from "./match.controller.js";
import { validate } from "../../middlewares/validate.js";
import { createMatchSchema, updateMatchSchema, patchMatchSchema } from "./match.schema.js";

const router = Router();

router.get("/", getMatchesController);
router.get("/:id", getMatchByIdController);
router.post("/", validate(createMatchSchema), createMatchController);
router.put("/:id", validate(updateMatchSchema), updateMatchController);
router.patch("/:id", validate(patchMatchSchema), patchMatchController);
router.delete("/:id", deleteMatchController);

export default router;