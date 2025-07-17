import { QuizCard } from '../models/QuizCard.js';
import { Course } from '../models/Course.js';

// Create Quiz
export const createQuiz = async (req, res) => {
  try {
    const quiz = await QuizCard.create(req.body);

    // Optionally add quiz to a course if courseId is provided
    if (req.body.courseId) {
      await Course.findByIdAndUpdate(
        req.body.courseId,
        { $push: { quizzes: quiz._id } }
      );
    }

    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await QuizCard.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Quiz By ID
export const getQuizById = async (req, res) => {
  try {
    const quiz = await QuizCard.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Quiz
export const updateQuiz = async (req, res) => {
  try {
    const quiz = await QuizCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Quiz
export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await QuizCard.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json({ message: 'Quiz deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};