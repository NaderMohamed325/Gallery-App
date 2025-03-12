import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import dotenv from 'dotenv';
dotenv.config();
import { viewRouter } from './routers/viewRouter';
import { ErrorHandler } from './utils/errorHandler';
import AppError from './utils/AppError';
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/Cloud').then(() => {
  console.log(`DB Connected`);
});
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

const app = express();
app.get('/favicon.ico', (req: Request, res: Response) => {
   res.status(204).end();
});

app.use(helmet());
app.use(express.json());
app.use(ErrorHandler);
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(limiter);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
dotenv.config();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(viewRouter);

app.use(ErrorHandler);
app.all('*', (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
