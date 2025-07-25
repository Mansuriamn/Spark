import { Question } from '../models/Questions.js'; // <-- Correct import

// Create a new quiz question
export const createQuizQuestion = async (req, res) => {
    try {
        const quizQuestion = new Question(req.body);
        await quizQuestion.save();
        res.status(201).json(quizQuestion);
    } catch (error) {
        res.status(500).json({ message: 'Error creating quiz question', error: error.message });
    }
};

// Get a quiz question by ID
export const getQuizQuestionById = async (req, res) => {
    try {
        const quizQuestion = await Question.findById(req.params.id);
        if (!quizQuestion) return res.status(404).json({ message: 'Quiz question not found' });
        res.json(quizQuestion);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quiz question', error: error.message });
    }
};

// Update a quiz question

export const getQuizQuestionByTopic = async (req, res) => {
    try{
        const quizQuestion = await Question.find({topic: req.params.topic});
        if (!quizQuestion) return res.status(404).json({ message: 'Quiz question not found' });
        res.json(quizQuestion);
    }
    catch(error) {
        res.status(500).json({ message: 'Error fetching quiz question', error: error.message });
    }
}

export const updateQuizQuestion = async (req, res) => {
    try {
        const updatedQuizQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuizQuestion) return res.status(404).json({ message: 'Quiz question not found' });
        res.json(updatedQuizQuestion);
    } catch (error) {
        res.status(500).json({ message: 'Error updating quiz question', error: error.message });
    }
};

// Delete a quiz question
export const deleteQuizQuestion = async (req, res) => {
    try {
        const deletedQuizQuestion = await Question.findByIdAndDelete(req.params.id);
        if (!deletedQuizQuestion) return res.status(404).json({ message: 'Quiz question not found' });
        res.json({ message: 'Quiz question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting quiz question', error: error.message });
    }
};