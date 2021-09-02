import path from 'path';
import cors from 'cors';
const cookieParser = require('cookie-parser');
import express from 'express';
import compression from 'compression';
import serverRenderMiddleware from './server-render-middleware';
import router from './routes';
import sequelize from '../db-postgres/sequelize-config';
import { checkAuthMiddlewareSSR } from './controllers/check-auth-middlware-ssr';
import { cspHeader } from './csp-header-middleware'

sequelize
  .sync()
  .then(() => {
    // Синхронизация выполнена, можно начинать работать
  })
  .catch((err) => {
    console.error('Error sequelize=', err);
  });

const app = express();

const allowedOrigins = [
  'http://localhost:9001',
  'http://localhost:5000',
  'http://localhost:5001',
  'https://localhost:5001',
  'http://local.ya-praktikum.tech:5001',
  'https://local.ya-praktikum.tech:5000',
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.disable('x-powered-by');
app.enable('trust proxy');
app.use(cors(options));
app.use(express.json());
app.use(cookieParser());
app.use(cspHeader);
app.use(router);
app
  .use(compression())
  .use(express.static(path.resolve(__dirname, '../dist')))
  .use(express.static(path.resolve(__dirname, '../static')));
app.use('/', checkAuthMiddlewareSSR);
app.get('/*', serverRenderMiddleware);

export { app };
