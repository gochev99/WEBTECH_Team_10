import * as mongoose from 'mongoose'
import { Request, Response } from 'express'
import Ticket from '../models/ticket'
import ITicket from '../interfaces/ticket';
import TicketFunction from '../functions/ticket'

export const postTicket = async (req: Request, res: Response) => {
    const name = req.params.name;
    const newTicket = req.body;

    await TicketFunction.addTicket(name, newTicket)
        .then(() => {
            res.status(200).json({ 'msg': 'Ticked is added' });
        })
        .catch((err: Error) => {
            res.status(304).json({ "error": err });
        });
}
