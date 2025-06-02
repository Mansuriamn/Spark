import mongoose from 'mongoose';

export const QuizQuestionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
    explanation: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model('QuizQuestion', QuizQuestionSchema);