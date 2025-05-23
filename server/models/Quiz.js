import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [String],
    correctAnswer: String,
    explanation: String,
    type: { type: String, enum: ['normal', 'coding'], required: true },
    codingDetails: {
        discussionTab: String,
        starterCode: String,
        testCases: [{ input: String, output: String }],
    },
}, { _id: false });

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    questions: [QuestionSchema],
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const Quiz = mongoose.model('Quiz', QuizSchema);