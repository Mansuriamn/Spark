const express = require('express');
const router = express.Router();
const codingQuestionController = require('../controllers/codingQuestionController');

// Create a new coding question
router.post('/', codingQuestionController.createCodingQuestion);

// Get a coding question by ID
router.get('/:id', codingQuestionController.getCodingQuestionById);

// Update a coding question
router.put('/:id', codingQuestionController.updateCodingQuestion);

// Delete a coding question
router.delete('/:id', codingQuestionController.deleteCodingQuestion);

module.exports = router;