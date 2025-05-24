import mongoose from 'mongoose';
import slugify from 'slugify';

const VersionHistorySchema = new mongoose.Schema({
  version: Number,
  title: String,
  description: String,
  updatedAt: Date,
}, { _id: false });

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 180 },
  slug:  { type: String, unique: true, index: true },
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  tags: [String],
  level: { type: String, enum: ['Beginner','Intermediate','Advanced'], default: 'Beginner' },
  language: { type: String, default: 'en' },
  thumbnailUrl: String,
  pictureUrl: String,               // <‑‑ banner / cover image
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  version: { type: Number, default: 1 },
  versionHistory: [VersionHistorySchema],
  status: { type: String, enum: ['draft','published','archived'], default: 'draft' },
  estimatedDuration: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  skillTags: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

CourseSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export const Course = mongoose.model('Course', CourseSchema);