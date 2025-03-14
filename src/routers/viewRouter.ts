import express from 'express';
import { loginViewer, registerViewer, registerUser, Login } from '../controllers/viewController';

const viewRouter = express.Router();

viewRouter.get('/api/v1/login', loginViewer);
viewRouter.post('/api/v1/login', Login);
viewRouter.get('/api/v1/register', registerViewer);
viewRouter.post('/api/v1/register', registerUser);

export { viewRouter };
