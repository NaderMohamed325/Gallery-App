import express from 'express';
import { dashboardViewer, dashboardLogout } from '../controllers/dashboardController';
import { isAuthenticated } from '../utils/middlewares/isAuthenticated';
import { uploadPhoto } from '../controllers/uploadController';

const dashboardRouter = express.Router();

dashboardRouter.get('/api/v1/dashboard', isAuthenticated, dashboardViewer);
dashboardRouter.post('/api/v1/logout', isAuthenticated, dashboardLogout);
dashboardRouter.post('/api/v1/upload', isAuthenticated, uploadPhoto);

export { dashboardRouter };
