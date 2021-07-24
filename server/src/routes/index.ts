import * as express from 'express';

import login from './login';
import register from './register';
// import UserController from '../controllers/users-controller';
//import ProjectFunctions, { getProjects } from '../controllers/project-controller';

const routes = express.Router();

/* routes.use('/login', login);
routes.use('/register', register);
routes.get('/', (request: express.Request, response: express.Response) => {
    const rememberUser: string = request.cookies.remember;
    if (rememberUser) {
        response.redirect('../html/home');
    } else {
        response.redirect('login');
    }
}); */

// routes.get('/:projectName', getProjects);


export default routes;