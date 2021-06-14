import * as mongoose from "mongoose";


const connectDB = () =>{ 
  return mongoose.connect(`${process.env.CLOUD_DB_URL}`, { useUnifiedTopology: true , useNewUrlParser: true });
};

export default connectDB;