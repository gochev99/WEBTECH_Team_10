import { Router, Request, Response } from 'express';
import { postTicket } from '../controllers/ticket-controller'

const router = Router();

router.get('/:name/tickets/assignee', postTicket); 
//router.get('/:name/tickets/status/:status', ); 
//router.get('/:name/tickets/tasks', getByTasks); 

//router.get('/:name/tickets/tasks/:category', getByCategory);
export default router;