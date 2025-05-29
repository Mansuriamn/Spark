import CodingQuestion from '../models/codingQuestion.js';

// Create a new coding question
export const createCodingQuestion = async (req, res) => {
    try {
        const codingQuestion = new CodingQuestion(req.body);
        await codingQuestion.save();
        res.status(201).json(codingQuestion);
    } catch (error) {
        res.status(500).json({ message: 'Error creating coding question', error: error.message });
    }
};

// Get a coding question by ID
export const getCodingQuestionById = async (req, res) => {
    try {
        const codingQuestion = await CodingQuestion.findById(req.params.id);
        if (!codingQuestion) return res.status(404).json({ message: 'Coding question not found' });
        res.json(codingQuestion);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching coding question', error: error.message });
    }
};

// Update a coding question
export const updateCodingQuestion = async (req, res) => {
    try {
        const updatedCodingQuestion = await CodingQuestion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCodingQuestion) return res.status(404).json({ message: 'Coding question not found' });
        res.json(updatedCodingQuestion);
    } catch (error) {
        res.status(500).json({ message: 'Error updating coding question', error: error.message });
    }
};

// Delete a coding question
export const deleteCodingQuestion = async (req, res) => {
    try {
        const deletedCodingQuestion = await CodingQuestion.findByIdAndDelete(req.params.id);
        if (!deletedCodingQuestion) return res.status(404).json({ message: 'Coding question not found' });
        res.json({ message: 'Coding question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting coding question', error: error.message });
    }
};