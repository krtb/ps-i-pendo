import express from 'express';
import 'dotenv/config';
import { getASingleSegmentID } from '../middleware/segmentMiddleware';

const app: express.Application = express();

const port = process.env.SERVER_PORT_3000;

app.use(getASingleSegmentID);

app.get('/', (_req, _res) => {
  _res.send('TypeScript Wiht Expresss');
});

app.listen(port, () => {
  console.log(`TypeScript with Expresshttp://localhost:${port}/`);
});
