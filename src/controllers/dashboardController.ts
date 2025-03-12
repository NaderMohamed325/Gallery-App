import { Request, Response, NextFunction } from 'express';

const dashboardViewer = (req: Request, res: Response) => {
  res.render('dashboard');
};

const dashboardLogout = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/api/v1/login');
  });
};

export { dashboardViewer, dashboardLogout };
