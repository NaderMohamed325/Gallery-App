import { NextFunction, Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
  cloud_name: 'dfnyw08sg',
  api_key: '681699289446763',
  api_secret: 'GEfPlSqjCPIAeaoVXcmyS1-0rQc',
});

const dashboardViewer = async (req: Request, res: Response) => {
  try {
    const { resources } = await cloudinary.search
      .expression('resource_type:image') // Fetch all images
      .sort_by('public_id', 'desc')
      .max_results(100) // Increase the limit as needed
      .execute();

    const images = resources.map((file: { secure_url: string }) => ({
      url: file.secure_url,
    }));
    console.log(images);
    res.render('dashboard', { images });
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    res.render('dashboard', { images: [] });
  }
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
