import * as express from 'express';
import connectDB from "./db/index";

const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 3001;

connectDB()
    .then(() => {
        console.log('Database connection successful');
        
        app.listen(SERVER_PORT, () => {
            console.log(`Server is listening on port ${SERVER_PORT}`);
        });
    })
    .catch(error => console.error('Database connection error'));