import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import { router } from './router';
require('dotenv').config();

// const path = require('path');

// const fs = require('fs');
// const https = require('https');
// const privateKeyPath = path.join(__dirname, 'certsFiles/localhost-key.pem');
// const certificatePath = path.join(__dirname, 'certsFiles/localhost.pem');

// const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
// const certificate = fs.readFileSync(certificatePath, 'utf8');
// const credentials = { key: privateKey, cert: certificate };

const app = express();

const allowedOrigins = [
  'http://localhost:9001',
  'http://localhost:5000',
  'https://localhost:5000',
  'http://local.ya-praktikum.tech:5001',
  'https://local.ya-praktikum.tech:5000',
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));
app.use(express.json());
app.use(router);

const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT_GAME_SERVER || 8081, () => {
  console.log(`Started server on port 8081}`);
});
