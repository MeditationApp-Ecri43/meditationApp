/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction } from 'express';
import { ServerError } from '../types.ts';
import path from 'path';
import cors from 'cors';
import userRoutes from './routes/userRoutes.ts';
// import sitRoutes from './routes/sitRoutes.ts';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 3030;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3030',
    credentials: true,
  })
);

app.use(cookieParser());
app.use('/users', userRoutes);
// app.use('/sits', sitRoutes);

app.get('/tests', (_req, res) => {
  console.log('get request successful');
  res.send({ text: 'Hi me' });
});

app.use(express.static(path.join(path.resolve(), 'dist')));
app.get('/', (_req: Request, res: Response): void => {
  const indexPath = path.join(path.resolve(), 'dist', 'index.html');
  res.sendFile(indexPath);
});

app.use(
  (
    err: ServerError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Response => {
    const defaultErr: ServerError = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occured' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  }
);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
