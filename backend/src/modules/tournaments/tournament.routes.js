import { Router } from "express";
import { getTournaments, getTournamentByIdController, createTournamentController, updateTournamentController, patchTournamentController, deleteTournamentController } from "./tournament.controller.js";
import { validate } from "../../middlewares/validate.js";
import { createTournamentSchema, updateTournamentSchema, patchTournamentSchema } from "./tournament.schema.js";

const router = Router();

router.get("/", getTournaments);
router.get("/:id", getTournamentByIdController);
router.post("/", validate(createTournamentSchema), createTournamentController);
router.put("/:id", validate(updateTournamentSchema), updateTournamentController);
router.patch("/:id", validate(patchTournamentSchema), patchTournamentController);
router.delete("/:id", deleteTournamentController);

export default router;