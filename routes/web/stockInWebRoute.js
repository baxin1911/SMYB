import express from 'express';
import { verifyCookiesAuthTokenRequired } from '../../middleware/authMiddleware.js';
import { getStockIn } from '../../controllers/web/stockInController.js';

const router = express.Router();

router.get(
    '/',
    verifyCookiesAuthTokenRequired,
    getStockIn
);

export default router;