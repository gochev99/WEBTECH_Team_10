import * as express from 'express';
import connectDB from "./src/db/index";

import * as dotenv from 'dotenv';
import * as cors  from 'cors';


const bp = require('body-parser');

dotenv.config();

const app = express();



app.use(cors({ origin: '*' })); //!!! don't remove me
app.use(express.static('client'));

//body parser
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// app.use('/', userRoutes); //login & logout
// app.use(verifyTokenMiddleware);

app.use(express.json());

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

const SERVER_PORT = process.env.SERVER_PORT || 3002;

connectDB()
    .then(() => {
        console.log('Database connection successful');
        
        app.listen(SERVER_PORT, () => {
            console.log(`Server is listening on port ${SERVER_PORT}`);
        });

        
    })
    .catch(error => console.error(`Database connection error:${error}`));