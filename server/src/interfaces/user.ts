import { Document } from 'mongoose'

interface IUsers extends Document {
    fullName: string,
    username: string,
    email: string,
    password: string
};

export default IUsers;