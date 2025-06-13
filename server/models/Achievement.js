import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  icon: String, // URL or icon name
  dateAwarded: { type: Date, default: Date.now }
});

export const Achievement = mongoose.model('Achievement', achievementSchema);