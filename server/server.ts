import express, { Request, Response } from 'express';
import { ServerError } from './types';
import path from 'path';
import cors from 'cors';
import userRoutes from './routes/userRoutes.ts';
import 'dotenv/config';

const PORT = process.env.PORT || 3030;
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3030',
  credentials: true
}));

app.use('/users', userRoutes);

app.get('/tests', (_req, res) => {
  console.log('get request successful')
  res.send({text: 'Hi me'});
});

app.get('/', (_req: Request, res: Response): void => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.use((err: ServerError, _req: Request, res: Response): Response => {
  const defaultErr: ServerError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));