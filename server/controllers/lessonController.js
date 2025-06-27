import { Lesson } from '../models/Lesson.js';
import { User } from '../models/User.js';
import { Course } from '../models/Course.js';
import mongoose from 'mongoose';
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export const getAllLessons = asyncHandler(async (req, res) => {
  const lessons = await Lesson.find({ ...req.query })
    .populate('module', 'title')
    .select('-__v');
  res.status(200).json({ count: lessons.length, data: lessons });
});

export const getLessonById = async (req, res) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid or missing lesson ID' });
  }
  try {
    const lesson = await Lesson.findById(id);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.create(req.body);
  res.status(201).json(lesson);
});

export const updateLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
  res.status(200).json(lesson);
});

export const deleteLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findByIdAndDelete(req.params.id);
  if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
  res.status(204).send();
});

export const addLessonVideoCloud = async (req, res) => {
  const lessonId = req.params.id;

  const videoData = {
    title: req.body.title || req.file.originalname,
    url: req.file.path,  // Cloudinary-hosted URL
    description: req.body.description || '',
    duration: parseInt(req.body.duration) || 0,
  };

  try {
    const lesson = await Lesson.findByIdAndUpdate(
      lessonId,
      { $push: { videos: videoData } },
      { new: true }
    );

    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

    res.status(200).json({ message: 'Video uploaded to Cloudinary', lesson });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const markLessonComplete = async (req, res) => {
  const { id } = req.params; // lessonId
  const userId = req.user._id;

  const user = await User.findById(userId);

  const existing = user.progress.find(p => p.lessonId.toString() === id);
  if (existing) {
    existing.completed = true;
    existing.watchedDuration = req.body.watchedDuration;
  } else {
    user.progress.push({
      lessonId: id,
      watchedDuration: req.body.watchedDuration,
      totalDuration: req.body.totalDuration,
      completed: true,
    });
  }

  await user.save();
  res.status(200).json({ message: 'Lesson marked complete' });
};