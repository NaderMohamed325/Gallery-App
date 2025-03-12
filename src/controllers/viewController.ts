import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';

const loginViewer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const error = null;
  res.render('home', { error });
});

const registerViewer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const error = null;
  res.render('register', { error });
});

export { loginViewer,registerViewer };
