import { Router } from "express";

import { validate } from "../../middlewares/validate.js";

import { createUserSchema, updateUserSchema, patchUserSchema, userIdSchema } from "./user.schema.js";

import * as controller from "./user.controller.js";

const router = Router();

router.get("/", controller.getUsersController);

router.get("/:id", validate(userIdSchema), controller.getUserByIdController);

router.post("/", validate(createUserSchema), controller.createUserController);

router.put("/:id", validate(userIdSchema), validate(updateUserSchema), controller.updateUserController);

router.patch("/:id", validate(userIdSchema), validate(patchUserSchema), controller.patchUserController);

router.delete("/:id", validate(userIdSchema), controller.deleteUserController);

export default router;