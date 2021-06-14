import * as express from 'express';
import connectDB from "./src/db/index";

import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 3002;

connectDB()
    .then(() => {
        console.log('Database connection successful');
        
        app.listen(SERVER_PORT, () => {
            console.log(`Server is listening on port ${SERVER_PORT}`);
        });
    })
    .catch(error => console.error(`Database connection error:${error}`));