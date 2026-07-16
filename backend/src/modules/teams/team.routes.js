import { Router } from "express";

import { validate } from "../../middlewares/validate.js";

import { createTeamSchema, updateTeamSchema, addPlayerSchema, teamIdSchema, teamPlayerSchema } from "./team.schema.js";

import * as controller from "./team.controller.js";

const router = Router();

router.get("/", controller.getTeamsController);

router.get("/:id", validate(teamIdSchema), controller.getTeamByIdController);

router.post("/", validate(createTeamSchema), controller.createTeamController);

router.put("/:id", validate(teamIdSchema), validate(updateTeamSchema), controller.updateTeamController);

router.delete("/:id", validate(teamIdSchema), controller.deleteTeamController);

router.get("/:id/players", validate(teamIdSchema), controller.getPlayersController);

router.post("/:id/players", validate(teamIdSchema), validate(addPlayerSchema), controller.addPlayerController);

router.delete("/:id/players/:playerId", validate(teamPlayerSchema), controller.removePlayerController);

export default router;