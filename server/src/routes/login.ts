import { Router, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import loginAuth from '../authentication/login-auth';
import errorCatch from '../authentication/error-handler';
import validateUser from '../authentication/validateUser';
import UsersController from '../controllers/users-controller';
import IUser from '../interfaces/user';

const login: Router = Router();

let controller: UsersController;

const getUsersController = (req: Request, res: Response, next: () => void) => {
    controller = new UsersController();
    next();
};

login.use(getUsersController);
login.post('/', validateUser, loginAuth, errorCatch(async (request: Request, response: Response) => {

    const user: IUser = response.locals.user;

    const JWT_KEY = process.env.JWT_KEY || '';
    const token = jwt.sign({ user }, JWT_KEY, { expiresIn: '24h' });

    const cookieConfig = { path: '/', domain: '127.0.0.1', maxAge: 24 * 60 * 60 * 1000, secure: false };

    response.cookie('auth', token, cookieConfig);
    response.status(200).json({success: true});
}));



export default login;