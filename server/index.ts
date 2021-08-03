import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import { router } from './router';

const app = express();

const allowedOrigins = ['http://localhost:9001', 'http://localhost:5000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));
app.use(express.json());
app.use(router);
const server = http.createServer(app);

server.listen(process.env.PORT || 8081, () => {
  // @ts-ignore
  console.log(`Started server on port ${server.address().port}`);
});
