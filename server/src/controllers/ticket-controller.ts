import * as mongoose from 'mongoose'
import { Request, Response } from 'express'
import Ticket from '../models/ticket'

import ITicket from '../interfaces/ticket';
import TicketFunction from '../functions/ticket'
//import Project from '../schemas/ProjectSchema'


export const postTicket = async (req: Request, res: Response) => {
    const name = req.params.name;
    const newTicket = req.body;

    if ((req.body.constructor === Object && Object.keys(req.body).length === 0) || !name || !newTicket.taskName || !newTicket.status) {
        res.status(400).json("error: Invalid input");
        return;
    }

    if (!name || !newTicket) {
        res.status(400).json("error: Invalid input");
        return;
    }

    await TicketFunction.addTicket(name, newTicket)
        .then(() => {
            res.status(200).json({ 'msg': 'Ticked is added' });
        })
        .catch((err: Error) => {
            res.status(304).json({ "error": err });
        });
}
