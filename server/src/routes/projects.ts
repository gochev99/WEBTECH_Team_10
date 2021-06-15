import * as express from 'express';
import * as projectController from '../controllers/project-controller'

const router = express.Router();


router.get('/:projectName', projectController.getProjects);


export default router;