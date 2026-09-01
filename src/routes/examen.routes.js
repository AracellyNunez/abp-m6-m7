import { Router } from "express";
import { getExamenes, createExamen } from "../controllers/examen.controllers.js";

const router = Router();

router.get("/", getExamenes);
router.post("/", createExamen);

export default router;