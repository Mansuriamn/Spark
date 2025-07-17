// QuizCard.js
import mongoose from 'mongoose';


export const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
 category : String,
 level: { type: String, enum: ['easy', 'mid', 'hard'], default: 'easy' },
 status : { type: String, enum: ['Solve', 'Not Solve'], default: 'Not Solve' }, 
 questionURL: { type: String, required: true },
}, { timestamps: true });

const QuizCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  description: String,
  questions: [QuestionSchema],
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course'}
}, { timestamps: true });

export const QuizCard = mongoose.model('QuizCard', QuizCardSchema);