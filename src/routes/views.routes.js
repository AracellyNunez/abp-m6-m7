import express from "express";
import * as viewsController from "../controllers/views.controllers.js";

const router = express.Router();

// RUTAS
router.get("/", viewsController.homeView);

router.get("/users", viewsController.usersView);

router.get("/users/add", viewsController.usersAddView);

router.get("/users/profile/:id", viewsController.userProfileView);

router.get("/users/update/:id", viewsController.usersUpdateView);

export default router;