import path from 'path';
import express from 'express';
import compression from 'compression';
import 'babel-polyfill';
import serverRenderMiddleware from './server-render-middleware';
import { testDBConnect } from './test-db-connect';

const app = express();

testDBConnect();

app
  .use(compression())
  .use(express.static(path.resolve(__dirname, '../dist')))
  .use(express.static(path.resolve(__dirname, '../static')));

app.get('/*', serverRenderMiddleware);

export { app };
