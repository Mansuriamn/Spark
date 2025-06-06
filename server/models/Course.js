/*const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export const getAllCourses = asyncHandler(async (req, res) => {
  const query = { ...req.query };
  const courses = await Course.find(query)
    .populate('category', 'name')
    .populate('createdBy', 'fullName email')
    .select('-__v');
  res.status(200).json({ count: courses.length, data: courses });
});

export const getCourseById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id)
    .populate('category', 'name')
    .populate('lessons')
    .populate('prerequisites', 'title slug')
    .populate('createdBy', 'fullName email');
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.status(200).json(course);
});

export const createCourse = asyncHandler(async (req, res) => {
  const course = await Course.create({ ...req.body, createdBy: req.user.id });
  res.status(201).json(course);
});

export const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const oldCourse = await Course.findById(id);
  if (!oldCourse) return res.status(404).json({ message: 'Course not found' });

  const versionSnapshot = {
    version: oldCourse.version,
    title: oldCourse.title,
    description: oldCourse.description,
    updatedAt: new Date(),
  };

  const updatedCourse = await Course.findByIdAndUpdate(
    id,
    {
      ...req.body,
      version: oldCourse.version + 1,
      $push: { versionHistory: versionSnapshot },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatedCourse);
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const course = await Course.findByIdAndDelete(id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.status(204).send();
});
*/

import mongoose from 'mongoose';
import slugify from 'slugify';
import Category from '../models/Category.js';
// ...existing code...


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
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false },
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