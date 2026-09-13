import express from "express";
import * as userController from "../controllers/users.controllers.js";
import { validateBody } from "../middlewares/validate.body.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", validateBody, userController.create);
router.get("/", verifyToken, userController.findAll);
router.get("/:id", verifyToken, userController.findById);
router.get("/email/:email", verifyToken, userController.findByEmail);
router.put("/:id", verifyToken, validateBody, userController.update);
router.delete("/:id", verifyToken, userController.deleteById);
router.get('/profile/:id', verifyToken, userController.renderProfile);

export default router;