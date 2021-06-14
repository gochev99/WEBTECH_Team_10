import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import * as mongoose from 'mongoose';
import IUser from '../interfaces/user';
import { read, write } from '../utils/file-utils';
import { UserDocument, User } from '../models/user';


class UserController {
    construct() {} 

    public async createUser(user: IUser): Promise<void> {
        bcrypt.hash(user.password, 10, async (error: Error, hash: string) => {
            if (error) {
                return;
            }

            user.password = hash;

            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                password: user.password
            });

            await newUser.save();
        });
    }

    public async findUser(user: string): Promise<UserDocument> {
        
        return User.findOne({ username: user }).exec();
    }


    public validateUser(user: IUser, confirmPassword: string): string[] {
        const errors: string[] = [];

        if (!user.username) {
            errors.push('Please input user name');
        } else if (user.username.length > 15) {
            errors.push('User name must be less than 15 symbols');
        }

        if (!user.password) {
            errors.push('Please input password');
        } else if (!user.password.match(/[a-zA-z0-9]?/)) {
            errors.push('Password must contain letters and digits');
        } else if (user.password.length < 5) {
            errors.push('Password must be longer than 5 symbols');
        } else if (confirmPassword && user.password !== confirmPassword) {
            errors.push('Passwords must match.');
        }

        return errors;
    }
}

export default UserController;