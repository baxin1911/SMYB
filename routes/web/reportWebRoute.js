import express from 'express';
import { verifyCookiesAuthTokenRequired } from '../../middleware/authMiddleware.js';
import { getReport } from '../../controllers/web/reportController.js';

const router = express.Router();

router.get(
    '/',
    verifyCookiesAuthTokenRequired,
    getReport
);

export default router;