require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

export const testDBConnect = () => {
  client.connect();

  // @ts-ignore
  client
    .query('SELECT NOW()')
    // @ts-ignore
    .then((res) => {
      console.log('Тестовый ответ от DB на запрос SELECT NOW()=', res.rows);
      client.end();
    })
    // @ts-ignore
    .catch((err) => {
      console.log('error', err);
    });
};
