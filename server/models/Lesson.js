import mongoose from 'mongoose';
import { QuizQuestionSchema } from './quizQuestion.js';
import { User } from './User.js';
import { Course } from './Course.js';

const VideoSchema = new mongoose.Schema({
  title: { type: String },
  url: { type: String },
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
  video: { type: String },
  quizzes: { type: mongoose.Schema.Types.ObjectId, ref: 'VideoSchema' },
  module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
  duration: { type: String, default: '0 mins' },
  attachments: [String],

}, { timestamps: true });

export const Lesson = mongoose.model('Lesson', LessonSchema);
