import mongoose from 'mongoose';

const MeetingSchema = new mongoose.Schema({
  roomName: { type: String, required: true, unique: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  scheduledAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export const Meeting = mongoose.model('Meeting', MeetingSchema);
