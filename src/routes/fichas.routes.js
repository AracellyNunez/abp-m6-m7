import { Router } from "express";
import { createFicha, getFichas } from "../controllers/ficha.controllers.js";

const router = Router();

// Ruta para obtener todas las fichas 
router.get("/", getFichas);

// Ruta para crear una nueva ficha 
router.post("/", createFicha);

export default router;