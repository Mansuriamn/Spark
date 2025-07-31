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

// Add a question to a quiz
export const addQuestion = async (req, res) => {
  try {
    const { quizId } = req.params;
    const {
      questionText,
      option1,
      option2,
      option3,
      option4,
      answer,
      level
    } = req.body;

    const missingFields = [];
    if (!questionText) missingFields.push('questionText');
    if (!option1) missingFields.push('option1');
    if (!option2) missingFields.push('option2');
    if (!option3) missingFields.push('option3');
    if (!option4) missingFields.push('option4');
    if (!answer) missingFields.push('answer');

    if (missingFields.length > 0) {
      console.log('Received Body:', req.body);
      return res.status(400).json({
        message: `Missing or invalid required fields: ${missingFields.join(', ')}`
      });
    }

    const quiz = await QuizCard.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const newQuestion = {
      questionText,
      option1,
      option2,
      option3,
      option4,
      answer,
      level: level || 'easy',
    };

    quiz.questions.push(newQuestion);
    await quiz.save();

    res.json(quiz);
  } catch (error) {
    console.error("Add Question Error:", error);
    res.status(400).json({ message: error.message });
  }
};



export const getQuestions = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await QuizCard.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz.questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const quiz = await QuizCard.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const question = quiz.questions.id(questionId);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    Object.assign(question, req.body);
    await quiz.save();
    res.json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const quiz = await QuizCard.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const question = quiz.questions.id(questionId);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    question.deleteOne();
    await quiz.save();
    res.json({ message: 'Question deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};