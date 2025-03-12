import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../catchAsync';

const isAuthenticated = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.redirect('/api/v1/login');
  }
});

export { isAuthenticated };
