import {createQuizQuestion,
    getQuizQuestionById,
    getQuizQuestionByTopic,
    updateQuizQuestion,
    deleteQuizQuestion
} from '../controllers/quizQuestionController.js';
import express from 'express';
const router = express.Router();


// Create a new quiz question
router.post('/', createQuizQuestion);

// Get a quiz question by ID
router.get('/:id', getQuizQuestionById);

// Update a quiz question
router.put('/:id',updateQuizQuestion);

// Delete a quiz question
router.delete('/:id', deleteQuizQuestion);

router.get('/:topic', getQuizQuestionByTopic)

export default router;