import express from 'express';
import { loginViewer, registerViewer, registerUser } from '../controllers/viewController';

const viewRouter = express.Router();

viewRouter.get('/api/v1/login', loginViewer);
viewRouter.get('/api/v1/register', registerViewer);
viewRouter.post('/api/v1/register', registerUser);

export { viewRouter };