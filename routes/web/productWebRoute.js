import express from 'express';
import { getProductsPage } from '../../controllers/web/productController.js';
import { authorizeUserWeb, verifyCookiesAuthTokenRequired } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get(
    '/',
    (req, res) => {
        if (req.user) return res.redirect('/products');

        return res.redirect('/auth/login');
    }
)

router.get(
    '/products', 
    verifyCookiesAuthTokenRequired,
    authorizeUserWeb({
        roles: ['Almacenista', 'Coordinador', 'Auxiliar', 'Administrador del sistema'],
        departments: ['Almacén', 'Sistemas']
    }),
    getProductsPage
);

export default router;