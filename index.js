require('dotenv').config();
const { app } = require('./dist/server.js');
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');

// const privateKeyPath = path.join(
//   __dirname,
//   'certsFiles/_wildcard.ya-praktikum.tech-key.pem',
// );
// const certificatePath = path.join(
//   __dirname,
//   'certsFiles/_wildcard.ya-praktikum.tech.pem',
// );

// const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
// const certificate = fs.readFileSync(certificatePath, 'utf8');
// const credentials = { key: privateKey, cert: certificate };

const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);
// const httpsPort = process.env.PORT || 5000;
const httpPort = 5001;
//
// httpsServer.listen(httpsPort, () => {
//   console.log('Https server listing on port : ', httpsPort);
// });

httpServer.listen(httpPort, () => {
  console.log('Http server listing on port : ' + httpPort);
});
