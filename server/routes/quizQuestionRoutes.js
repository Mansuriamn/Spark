const express = require('express');
const router = express.Router();
const quizQuestionController = require('../controllers/quizQuestionController');

// Create a new quiz question
router.post('/', quizQuestionController.createQuizQuestion);

// Get a quiz question by ID
router.get('/:id', quizQuestionController.getQuizQuestionById);

// Update a quiz question
router.put('/:id', quizQuestionController.updateQuizQuestion);

// Delete a quiz question
router.delete('/:id', quizQuestionController.deleteQuizQuestion);

router.get('/:topic', quizQuestionController.getQuizQuestionByTopic)

module.exports = router;