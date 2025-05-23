import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    duration: { type: Number, default: 0 },
    description: String,
}, { _id: false });

const LessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String },
    videos: [VideoSchema],
    quizzes: [{ question: String, options: [String], answer: String }],
    module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
    duration: { type: Number, default: 0 },
    attachments: [{ type: String }],
}, { timestamps: true });

export const Lesson = mongoose.model('Lesson', LessonSchema);