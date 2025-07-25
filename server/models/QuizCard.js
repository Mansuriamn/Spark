// QuizCard.js
import mongoose from 'mongoose';


export const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  category: String,
  level: { type: String, enum: ['easy', 'mid', 'hard'], default: 'easy' },
  status: { type: String, enum: ['correct', 'Not correct','Not attempted'], default: 'Not attempted' },
  questionURL: { type: String }, // optional: for image/audio/video questions
  options: [{ type: String, required: true }], // <-- MCQ options
  answer: { type: String},    // <-- correct answer (or use Number for index)
}, { timestamps: true });

const QuizCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  description: String,
  questions: [QuestionSchema],
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course'}
}, { timestamps: true });

export const QuizCard = mongoose.model('QuizCard', QuizCardSchema);