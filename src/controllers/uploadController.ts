import { Request, Response } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Cloudinary Configuration
cloudinary.config({
  cloud_name: 'dfnyw08sg',
  api_key: '681699289446763',
  api_secret: 'GEfPlSqjCPIAeaoVXcmyS1-0rQc',
});

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    public_id: (req, file) => {
      const filename = file.originalname.replace(/\.[^/.]+$/, ""); // Remove extension
      return `uploads/${filename}-${Date.now()}`; // Append timestamp to avoid conflicts
    },
  },
});

const upload = multer({ storage: storage });

// Upload Controller
const uploadPhoto = (req: Request, res: Response) => {
  upload.single('photo')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    return res.redirect('/api/v1/dashboard');
  });
};

export { uploadPhoto };
