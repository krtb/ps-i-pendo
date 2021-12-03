import express from 'express';

const app: express.Application = express();

const port = 3000;

app.get('/', (_req, _res) => {
  _res.send('TypeScript Wiht Expresss');
});

app.listen(port, () => {
  console.log(`TypeScript with Expresshttp://localhost:${port}/`);
});
