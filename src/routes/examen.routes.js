import { Router } from "express";
import { getExamenes, createExamen } from "../controllers/examen.controllers.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

// Ruta pública para ver los exámenes
router.get("/", getExamenes);

// Ruta protegida para crear un examen con su archivo
router.post("/", verifyToken, createExamen);

export default router;