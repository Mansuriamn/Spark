import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        reuired: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'instructor', 'admin'],
        reuired: true
    }
});

const User = mongoose.model('User', userSchema);
export default User;