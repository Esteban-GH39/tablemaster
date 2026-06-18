import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { registerPlayerSchema } from "./tournamentPlayer.schema.js";
import { registerPlayerController, getTournamentPlayersController, removePlayerFromTournamentController } from "./tournamentPlayer.controller.js";

const router = Router();

router.get("/:id/players", getTournamentPlayersController);
router.post("/:id/register", validate(registerPlayerSchema), registerPlayerController);
router.delete("/:id/players/:playerId", removePlayerFromTournamentController);

export default router;