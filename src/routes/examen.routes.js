import { Router } from "express";
import { getExamenes, createExamen } from "../controllers/examen.controllers.js";
import verifyToken from "../middlewares/auth.middleware.js"; // 1. Importas el middleware de autenticación

const router = Router();

// Ruta pública (cualquiera puede ver los exámenes)
router.get("/", getExamenes);

// Ruta PROTEGIDA (solo entra si envía un token válido en los headers)
router.post("/", verifyToken, createExamen);

export default router;