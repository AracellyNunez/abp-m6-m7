import express from "express";
import * as userController from "../controllers/users.controllers.js";
import { validateBody } from "../middlewares/validate_body.js";
import verifyToken from "../middlewares/auth.middleware.js"; // 1. Importas el middleware

const router = express.Router();

// CREATE (Pública, para que nuevos usuarios puedan registrarse)
router.post("/", validateBody, userController.create);

// READ (Protegidas con verifyToken)
router.get("/", verifyToken, userController.findAll);
router.get("/:id", verifyToken, userController.findById);
router.get("/email/:email", verifyToken, userController.findByEmail);

// UPDATE (Protegida)
router.put("/:id", verifyToken, validateBody, userController.update);

// DELETE (Protegida)
router.delete("/:id", verifyToken, userController.deleteById);

export default router;