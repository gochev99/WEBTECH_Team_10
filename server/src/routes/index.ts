import * as express from 'express';

import login from './login';
import register from './register';

const routes = express.Router();

routes.use('/login', login);
routes.use('/register', register);

routes.get('/', (request: express.Request, response: express.Response) => {
    const rememberUser: string = request.cookies.remember;

    if (rememberUser) {
        // {success: true}
        response.redirect('studets/marks');
    } else {
        // {success: false}
        response.redirect('login');
    }
});

export default routes;