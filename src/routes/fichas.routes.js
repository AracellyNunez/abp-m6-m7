import { Router } from "express";
import { createFicha, getFichas } from "../controllers/ficha.controllers.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

// Ruta para obtener todas las fichas (Protegida)
router.get("/", verifyToken, getFichas);

// Ruta para crear una nueva ficha con su archivo (Protegida)
router.post("/", verifyToken, createFicha);

export default router;