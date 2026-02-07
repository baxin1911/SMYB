import express from 'express';
import { getInventory } from '../../controllers/web/inventoryController.js';
import { verifyCookiesAuthTokenRequired } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get(
    '/',
    verifyCookiesAuthTokenRequired,
    getInventory
);

export default router;