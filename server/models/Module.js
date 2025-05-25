import mongoose from 'mongoose';

const ModuleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    order: { type: Number, default: 0 },
    resources: [{ type: String }],
}, { timestamps: true });

export const Module = mongoose.model('Module', ModuleSchema);