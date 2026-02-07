import express from 'express';
import { verifyCookiesAuthTokenRequired } from '../../middleware/authMiddleware.js';
import { getUser } from '../../controllers/web/userController.js';

const router = express.Router();

router.get(
    '/',
    verifyCookiesAuthTokenRequired,
    getUser
);

export default router;