import express from 'express';
import { loginViewer, registerViewer } from '../controllers/viewController';

const viewRouter = express.Router();

viewRouter.get('/api/v1/login', loginViewer).get('/api/v1/register', registerViewer);

export { viewRouter };
