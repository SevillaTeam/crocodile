const express = require('express');

const path = require('path');

const app = express();
const HOSTNAME = process.env.HOSTNAME || '0.0.0.0';
const PORT = process.env.PORT || 3000;
const distFolder = `${__dirname}/dist/`;

app.use(express.static(distFolder));

app.use((request, response) => {
  response.sendFile(path.resolve(`${distFolder}index.html`));
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
