import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
     profilePic: { // <-- Add this field
        type: String,
        default: "https://www.picwand.ai/images/index/banner-pic3.png" // or you can set a default profile image URL
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'instructor', 'admin'],
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
    ,enrolledCourses: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
    ],achievements: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' }
    ],
    completedLessons: [
  { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }
]

});

export const User = mongoose.model('User', userSchema);
