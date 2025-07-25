
import mongoose from 'mongoose';
const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  category: String,
  level: { type: String, enum: ['easy', 'mid', 'hard'], default: 'easy' },
  status: { type: String, enum: ['correct', 'Not correct','Not attempted'], default: 'Not attempted' },
  questionURL: { type: String }, // optional: for image/audio/video questions
  options: [{ type: String, required: true }], // <-- MCQ options
  answer: { type: String, required: true },    // <-- correct answer (or use Number for index)
}, { timestamps: true });

export const Question = mongoose.model('Question', QuestionSchema);