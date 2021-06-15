import * as mongoose from 'mongoose'
import IUsers from '../interfaces/user'
import User from '../models/user'
import * as bcrypt from 'bcrypt'
const fs = require('fs');

mongoose.set('useFindAndModify', false);

const SALT_ROUNDS = 10;

class UserService {
    contructor() { }

    async addUser(user: IUsers) {
        return new Promise(async (res, rej) => {

            this.notExists(user.email).then(async () => {

                let passRegex = new RegExp(".{5,}");
                if (!passRegex.test(user.password)) {
                    rej("Invalid pass");
                    return;
                }
                const newUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    fullName: user.fullName,
                    username: user.username,
                    email: user.email,
                    password: user.password
                }); 

                newUser.password = await bcrypt.hash(user.password, SALT_ROUNDS);
                await newUser.save();

                res(true);
                return;

            }).catch((err) => {
                console.log(`UserFunctions: addUser: Error: ${err}`);
                rej({ "error": err });
            });
        })
    }

    notExists = (email: string) => {
        return new Promise(async (res, rej) => {
            const user = await User.findOne({ email: email }).exec();
            if (user) {
                rej("User exists gv");
                return;
            }
            res(true);
        });
    };

    exists = (email: string) => {
        return new Promise(async (res, rej) => {
            const user = await User.findOne({ email: email }).exec();
            if (user) {
                res(true);
                return;
            }
            rej("User does not exists");
        })
    };


    async login(email: string, password: string): Promise<IUsers> {
        return new Promise((res, rej) => {
            this.exists(email).then(async () => {
                const user: IUsers = await User.findOne({ email: email }).select('password').exec();
                const pass = user.get('password', null, { getters: false });

                const isOK = await bcrypt.compare(password, pass);
                if (isOK) {
                    res(user);
                    return;
                }
                rej("Invalid password");
                return;
            }).catch(() => {
                rej("Invalid user");
            })
        })

    };

    

    private validatePass = (pass: string) => {
        return new Promise(async (res, rej) => {
            // Minimum eight characters, at least one letter, one number and one special character:
            let passRegex = new RegExp("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$");

            if (pass && !pass.match(passRegex)) {
                rej("Invalid pass");
                return;
            }

            res(true);
        });
    }

};

export default new UserService();