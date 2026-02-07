import express from 'express';
import { verifyCookiesAuthTokenRequired } from '../../middleware/authMiddleware.js';
import { getWaste } from '../../controllers/web/wasteController.js';

const router = express.Router();

router.get(
    '/',
    verifyCookiesAuthTokenRequired,
    getWaste
);

export default router;