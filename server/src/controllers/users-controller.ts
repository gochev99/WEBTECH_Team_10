import { Request, Response } from 'express';
import UserFunction from '../functions/user';
import User from '../models/user';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';


//register
export const register = async (req: Request, res: Response) => {
    const body = req.body;
    if ((req.body.constructor === Object && Object.keys(req.body).length === 0) || !req.body.password || !req.body.email) {
        res.status(406).send("Invalid input");
        return;
    }

    await UserFunction.addUser(body).then(() => {
        const token = jwt.sign(
            { email: body.email },
            process.env.TOKEN_SECRET,
            { expiresIn: '5h' }
        );

        res.setHeader('Authorization', token);
        res.status(200).json({ "token": token });
        return;
    }).catch((err: Error) => {
        res.status(406).json({ "error": err });
        return; 
    });
}

//login
export const login = async (req: Request, res: Response) => {
    const body = req.body;
    //body check
    if ((req.body.constructor === Object && Object.keys(req.body).length === 0) || !req.body.email || !req.body.password) {
        res.status(406).send("Invalid input");
        
        return;
    } 

    UserFunction.login(body.email, body.password)
        .then(() => {
            const token = jwt.sign(
                { email: body.email },
                process.env.TOKEN_SECRET,
                { expiresIn: '5h' }
            );

            res.setHeader('Authorization', token);
            res.status(200).json({ "token": token });
            return;
        }).catch((err: Error) => {
            res.status(401).json({ "error": err });
            return;
        });
};

export const logout = async (req: Request, res: Response) => {
    //delete token    
    res.status(200).send("Logout success!");
    return;
};