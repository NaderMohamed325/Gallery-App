import {NextFunction, Request, Response} from 'express';
import AppError from './AppError';

const ErrorHandler = (err: AppError, _req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    console.log(err);
    res.jsonp(err).status(err.statusCode);
};

export {ErrorHandler};