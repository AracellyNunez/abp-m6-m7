import { Router } from 'express';
import { authUser } from '../controllers/auth.controllers.js';

const router = Router();

// Compatibilidad con la vista actual y con la ruta antigua del backend.
router.post('/login', authUser);
router.post('/auth', authUser);

export default router;