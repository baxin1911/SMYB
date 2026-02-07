import express from 'express';
import { login, logout, refreshAuthToken } from '../../controllers/web/authController.js';

const router = express.Router();

router.get(
    '/login',
    login
)

router.get(
    '/refresh',
    refreshAuthToken
);

router.post(
    '/logout', 
    logout
);

export default router;