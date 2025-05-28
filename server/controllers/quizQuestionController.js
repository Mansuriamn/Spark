import QuizQuestion from '../models/quizQuestion.js';

// Create a new quiz question
export const createQuizQuestion = async (req, res) => {
    try {
        const quizQuestion = new QuizQuestion(req.body);
        await quizQuestion.save();
        res.status(201).json(quizQuestion);
    } catch (error) {
        res.status(500).json({ message: 'Error creating quiz question', error: error.message });
    }
};

// Get a quiz question by ID
export const getQuizQuestionById = async (req, res) => {
    try {
        const quizQuestion = await QuizQuestion.findById(req.params.id);
        if (!quizQuestion) return res.status(404).json({ message: 'Quiz question not found' });
        res.json(quizQuestion);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quiz question', error: error.message });
    }
};

// Update a quiz question
export const updateQuizQuestion = async (req, res) => {
    try {
        const updatedQuizQuestion = await QuizQuestion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuizQuestion) return res.status(404).json({ message: 'Quiz question not found' });
        res.json(updatedQuizQuestion);
    } catch (error) {
        res.status(500).json({ message: 'Error updating quiz question', error: error.message });
    }
};

// Delete a quiz question
export const deleteQuizQuestion = async (req, res) => {
    try {
        const deletedQuizQuestion = await QuizQuestion.findByIdAndDelete(req.params.id);
        if (!deletedQuizQuestion) return res.status(404).json({ message: 'Quiz question not found' });
        res.json({ message: 'Quiz question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting quiz question', error: error.message });
    }
};