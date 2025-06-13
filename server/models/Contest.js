import mongoose from 'mongoose';

const ContestSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['featured', 'research', 'hackathon'],
    required: true
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  prize: { type: String, default: 'Certificate / Swag' },
  topic: { type: String, required: true },
  time: { type: Date, required: true },
  registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export const Contest = mongoose.model('Contest', ContestSchema);
