import mongoose from 'mongoose';

const TestCaseSchema = new mongoose.Schema({
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    }
});

const CodingQuestionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    codingDetails: {
        discussionTab: String,
        starterCode: String,
        testCases: [TestCaseSchema]
    }
}, { timestamps: true });

export default mongoose.model('CodingQuestion', CodingQuestionSchema);