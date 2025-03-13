import { Request, Response, NextFunction } from 'express';
import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
  cloud_name: 'dfnyw08sg',
  api_key: '681699289446763',
  api_secret: process.env.API_SECRET || 'GEfPlSqjCPIAeaoVXcmyS1-0rQc',
});



const dashboardViewer = async (req: Request, res: Response) => {
  const { resources } = await cloudinary.search
    .expression('folder:uploads')
    .sort_by('public_id', 'desc')
    .max_results(30)
    .execute();
  const images = resources.map((file: { secure_url: any }) => ({
    url: file.secure_url,
  }));
  res.render('dashboard', { images });
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
