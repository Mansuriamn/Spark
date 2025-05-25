import mongoose from 'mongoose';
import { QuizSchema } from './Quiz.js';

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  duration: { type: Number, default: 0 },
  description: String,
}, { _id: false });

/*const QuizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
}, { _id: false });*/

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  videos: [VideoSchema],
  quizzes: [QuizSchema],
  module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
  duration: { type: Number, default: 0 },
  attachments: [String],
}, { timestamps: true });

export const Lesson = mongoose.model('Lesson', LessonSchema);
