import express from 'express';
import { getHome } from '../../controllers/web/homeController.js';
import { verifyCookiesAuthTokenRequired } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get(
    '/',
    (req, res) => {
        if (req.user) return res.redirect('/dashboard');

        return res.redirect('/auth/login');
    }
)

router.get(
    '/dashboard', 
    verifyCookiesAuthTokenRequired,
    getHome
);

export default router;