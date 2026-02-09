import 'dotenv/config.js';

import authApiRoutes from './routes/api/authApiRoute.js';

import homeWebRoutes from './routes/web/homeWebRoute.js';
import authWebRoutes from './routes/web/authWebRoute.js';
import inventoryWebRoutes from './routes/web/inventoryWebRoute.js';
import reportWebRoutes from './routes/web/reportWebRoute.js';
import stockInWebRoutes from './routes/web/stockInWebRoute.js';
import stockOutWebRoutes from './routes/web/stockOutWebRoute.js';
import userWebRoutes from './routes/web/userWebRoute.js';
import wasteWebRoutes from './routes/web/wasteWebRoute.js';
import settingsWebRoute from './routes/web/settingsWebRoute.js';

import { checkTypeContentJson, checkTypeContentFile, checkContentTypePlainText } from './middleware/contentTypeMiddleware.js';
import cookieParser from 'cookie-parser';

import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import { publicDir, viewsDir, avatarsDir, coversDir } from './utils/pathsUtils.js';
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
app.use('/avatars', express.static(avatarsDir));
app.use('/covers', express.static(coversDir));

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
app.use('/inventory', inventoryWebRoutes);
app.use('/reports', reportWebRoutes);
app.use('/stock-in', stockInWebRoutes);
app.use('/stock-out', stockOutWebRoutes);
app.use('/users', userWebRoutes);
app.use('/waste', wasteWebRoutes);
app.use('/settings', settingsWebRoute);

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