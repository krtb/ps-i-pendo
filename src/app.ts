import express from 'express';
import 'dotenv/config';

const app: express.Application = express();

const port = process.env.SERVER_PORT_3000;

app.get('/', (_req, _res) => {
  _res.send('TypeScript Wiht Expresss');
});

app.listen(port, () => {
  console.log(`TypeScript with Expresshttp://localhost:${port}/`);
});
