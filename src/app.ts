import express from 'express';
import 'dotenv/config';
import { postNewSegments, getSegmentsFromUser } from '../middleware/segmentMiddleware';

const app: express.Application = express();

const port = process.env.SERVER_PORT_3000;

app.use(getSegmentsFromUser);
app.use(postNewSegments);

app.get('/', (_req, _res) => {
  _res.send('TypeScript Wiht Expresss');
});

app.listen(port, () => {
  console.log(`Server available at http://localhost:${port}/`);
});
