import express from 'express';
import { verifyCookiesAuthTokenRequired } from '../../middleware/authMiddleware.js';
import { getStockOut } from '../../controllers/web/stockOutController.js';

const router = express.Router();

router.get(
    '/',
    verifyCookiesAuthTokenRequired,
    getStockOut
);

export default router;