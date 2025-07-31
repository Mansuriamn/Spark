// QuizCard.js
import mongoose from 'mongoose';


export const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  category: String,
  level: { type: String, enum: ['easy', 'mid', 'hard'], default: 'easy' },
  status: { type: String, enum: ['correct', 'Not correct', 'Not attempted'], default: 'Not attempted' },
  questionURL: { type: String }, // optional: for image/audio/video questions
  option1: { type: String, required: true },
  option2: { type: String, required: true },
  option3: { type: String, required: true },
  option4: { type: String, required: true },
  answer: { type: String }, // You may validate this to match one of the options
}, { timestamps: true });


const QuizCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  description: String,
  questions: [QuestionSchema],
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course'}
}, { timestamps: true });

export const QuizCard = mongoose.model('QuizCard', QuizCardSchema);