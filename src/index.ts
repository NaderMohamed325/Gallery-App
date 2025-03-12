import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import dotenv from 'dotenv';
import { viewRouter } from './routers/viewRouter';
import { ErrorHandler } from './utils/errorHandler';
import AppError from './utils/AppError';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

const app = express();
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
// Start server

app.use(ErrorHandler);
app.all('*', (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`, `${__dirname}/views`);
});
