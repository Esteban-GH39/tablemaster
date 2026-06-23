import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { createEntrySchema } from "./entry.schema.js";
import { createEntryController, getEntriesController, deleteEntryController } from "./entry.controller.js";

const router = Router();

router.get("/:id/entries", getEntriesController);

router.post("/:id/entries", validate(createEntrySchema), createEntryController);

router.delete("/:id/entries/:playerId", deleteEntryController);

export default router;