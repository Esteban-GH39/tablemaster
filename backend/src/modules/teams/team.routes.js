import {Router} from "express";

import {validate} from "../../middlewares/validate.js";

import { createTeamSchema, updateTeamSchema, addPlayerSchema } from "./team.schema.js";

import * as controller from "./team.controller.js";

const router=Router();

router.get("/",controller.getTeamsController);

router.get("/:id",controller.getTeamByIdController);

router.post("/", validate(createTeamSchema), controller.createTeamController);

router.put("/:id", validate(updateTeamSchema), controller.updateTeamController);

router.delete("/:id",controller.deleteTeamController);

router.get("/:id/players",controller.getPlayersController);

router.post("/:id/players", validate(addPlayerSchema), controller.addPlayerController);

router.delete("/:id/players/:playerId", controller.removePlayerController);

export default router;