import { Router } from "express";

import { generateBracketController } from "./competition.controller.js";

const router = Router();

router.post("/tournaments/:id/generate-bracket", generateBracketController);

export default router;