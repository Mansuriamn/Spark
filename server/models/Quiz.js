import mongoose from 'mongoose';

export const TestCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true },
}, { _id: false });

export const CodingDetailsSchema = new mongoose.Schema({
  discussionTab: { type: String, default: '' },
  starterCode: { type: String, default: '' },
  testCases: [TestCaseSchema],
}, { _id: false });

export const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: {
    type: [String],
    validate: {
      validator: function (arr) {
        return this.type === 'normal' ? arr.length >= 2 : true;
      },
      message: 'Normal questions must have at least two options',
    },
  },
  correctAnswer: { type: String, required: true },
  explanation: { type: String, default: '' },
  type: {
    type: String,
    enum: ['normal', 'coding'],
    required: true,
  },
  codingDetails: {
    type: CodingDetailsSchema,
    required: function () {
      return this.type === 'coding';
    },
  },
}, { _id: false });

export const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  questions: {
    type: [QuestionSchema],
    validate: {
      validator: arr => arr.length > 0,
      message: 'Quiz must have at least one question',
    },
  },
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
