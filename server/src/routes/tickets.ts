import { Router, Request, Response } from 'express';
import { addTicket, deleteTicket } from '../controllers/ticket-controller'

const router = Router();

router.get('/:name/tickets/assignee', addTicket); 
router.get('/:name/tickets/status/:status', deleteTicket); 
//router.get('/:name/tickets/tasks', getByTasks); 

//router.get('/:name/tickets/tasks/:category', getByCategory);
export default router;