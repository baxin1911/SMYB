import 'dotenv/config.js';

import authApiRoutes from './routes/api/authApiRoute.js';

import homeWebRoutes from './routes/web/homeWebRoute.js';
import productWebRoutes from './routes/web/productWebRoute.js';
import supplyWebRoutes from './routes/web/supplyWebRoute.js';
import categoryWebRoutes from './routes/web/categoryWebRoute.js';
import supplierWebRoutes from './routes/web/supplierWebRoute.js';
import purchaseOrderWebRoutes from './routes/web/purchaseOrderWebRoute.js';
import purchaseRequisitionWebRoutes from './routes/web/purchaseRequisitionWebRoute.js';
import requisitionReturnWebRoutes from './routes/web/requisitionReturnWebRoute.js';
import goodsReceiptWebRoutes from './routes/web/goodsReceiptWebRoute.js';
import orderReturnsWebRoutes from './routes/web/orderReturnsWebRoute.js';
import goodsIssueWebRoutes from './routes/web/goodsIssueWebRoute.js';
import inventoryAdjustmentWebRoutes from './routes/web/inventoryAdjustmentWebRoute.js';
import authWebRoutes from './routes/web/authWebRoute.js';
import reportWebRoutes from './routes/web/reportWebRoute.js';
import userWebRoutes from './routes/web/userWebRoute.js';

import { checkTypeContentJson, checkTypeContentFile, checkContentTypePlainText } from './middleware/contentTypeMiddleware.js';
import cookieParser from 'cookie-parser';

import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import { publicDir, viewsDir } from './utils/pathsUtils.js';
import { errorCodeMessages } from './messages/codeMessages.js';

const app = express();
const rootRoute = '/';
const apiRoute = '/api';
const textRoute = '/text';
const uploadRoute = '/upload';
const authRoute = '/auth';

app.set('views', viewsDir);
app.set('view engine', 'ejs');

app.use(expressEjsLayouts);
app.set('layout', 'layout/base');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(rootRoute, express.static(publicDir));

app.use(apiRoute, express.json());
app.use(textRoute, express.text({ type: 'text/plain' }));
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

//middleware
app.use(apiRoute, checkTypeContentJson);
app.use(uploadRoute, checkTypeContentFile);
app.use(textRoute, checkContentTypePlainText);

app.use((req, res, next) => {
    res.locals.flash = req.cookies.flash || null;
    res.clearCookie('flash');
    next();
});

// web routes
app.use(rootRoute, homeWebRoutes);
app.use(authRoute, authWebRoutes);
app.use('/productos', productWebRoutes);
app.use('/insumos', supplyWebRoutes);
app.use('/categorias', categoryWebRoutes);
app.use('/proveedores', supplierWebRoutes);
app.use('/compras', purchaseOrderWebRoutes);
app.use('/requisiciones', purchaseRequisitionWebRoutes);
app.use('/devoluciones-requisicion', requisitionReturnWebRoutes);
app.use('/recepciones-compra', goodsReceiptWebRoutes);
app.use('/devoluciones-compra', orderReturnsWebRoutes);
app.use('/salidas-almacen', goodsIssueWebRoutes);
app.use('/ajustes-inventario', inventoryAdjustmentWebRoutes);
app.use('/reportes', reportWebRoutes);
app.use('/usuarios', userWebRoutes);

// api routes
app.use(apiRoute + authRoute, authApiRoutes);

app.use((req, res, next) => {
    res.status(405).json({ message: 'Método HTTP no permitido.' });
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada.' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ code: errorCodeMessages.SERVER_ERROR });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});