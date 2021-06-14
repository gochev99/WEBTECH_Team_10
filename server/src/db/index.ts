import * as mongoose from "mongoose";

const connectDB = () =>{
    return mongoose.connect(`${process.env.CLOUD_DB_URL}/${process.env.DB_NAME}`);
};

export default connectDB;

