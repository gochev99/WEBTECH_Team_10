import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required field.'],
        maxlength:  [60, 'Full name must be less than  60 characters.']
    },
    username: {
        type: String,
        required: [true, 'User name is required field.'],
        minlength: [2, 'User name must be at least 2 characters.'],
        maxlength: [15, 'User name must be less then 15 characters.']
    },
    password: {
        type: String,
        required: [true, 'Password is required field.'],
        minlength: [5, 'Password must be at least 5 characters.'],
        maxlength: [30, 'Password must be less then 30 characters.']
    },
    email: {
        type: String,
        validate: {
            validator: (value) => /^\S+@\S+\.\S+$/.test(value),
            message: 'Email must be a valid email address.'
        }
    }
});

const User = mongoose.model('User', userSchema);

export { userSchema };

export default User;