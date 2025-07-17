import express from 'express';
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  addQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion
} from '../controllers/quizController.js';

const router = express.Router();

router.post('/', createQuiz);
router.get('/', getAllQuizzes);
router.get('/:id', getQuizById);
router.put('/:id', updateQuiz);
router.delete('/:id', deleteQuiz);
router.post('/:quizId/questions', addQuestion);
router.get('/:quizId/questions', getQuestions);
router.put('/:quizId/questions/:questionId', updateQuestion);
router.delete('/:quizId/questions/:questionId', deleteQuestion);

export default router;