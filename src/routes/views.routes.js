import express from "express";
import * as viewsController from "../controllers/views.controllers.js";
import { renderProfile } from "../controllers/users.controllers.js"; 

const router = express.Router();

// 1. La raíz ahora muestra DIRECTAMENTE el login
router.get("/", viewsController.loginView); 

// 2. Dejamos una ruta explícita para el Home (después de autenticarse)
router.get("/home", viewsController.homeView);

router.get("/login", viewsController.loginView); // Opcional, por compatibilidad
router.get("/users", viewsController.usersView);
router.get("/users/add", viewsController.usersAddView);
router.get("/users/profile/:id", renderProfile); 
router.get("/users/update/:id", viewsController.usersUpdateView);
router.get("/examenes", viewsController.examenesView);
router.get("/fichas", viewsController.fichasView);
router.get("/fichas/add/:id", viewsController.fichaAddView);
router.get("/examenes/add/:id", viewsController.examenAddView);

export default router;