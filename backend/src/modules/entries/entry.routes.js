import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { createEntrySchema, tournamentIdSchema, entryIdSchema } from "./entry.schema.js";
import { createEntryController, getEntriesController, deleteEntryController } from "./entry.controller.js";

const router = Router();

router.get("/:id/entries", validate(tournamentIdSchema), getEntriesController);

router.post("/:id/entries", validate(tournamentIdSchema), validate(createEntrySchema), createEntryController);

router.delete("/entries/:entryId", validate(entryIdSchema), deleteEntryController);

export default router;