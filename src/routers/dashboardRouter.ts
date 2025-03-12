import express from 'express';
import { dashboardViewer, dashboardLogout } from '../controllers/dashboardController';
import { isAuthenticated } from '../utils/middlewares/isAuthenticated';

const dashboardRouter = express.Router();

dashboardRouter.get('/api/v1/dashboard', isAuthenticated, dashboardViewer);
dashboardRouter.post('/api/v1/logout', isAuthenticated, dashboardLogout);

export { dashboardRouter };
