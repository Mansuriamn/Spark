import { Lesson } from '../models/Lesson.js';

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export const getAllLessons = asyncHandler(async (req, res) => {
  const lessons = await Lesson.find({ ...req.query })
    .populate('module', 'title')
    .select('-__v');
  res.status(200).json({ count: lessons.length, data: lessons });
});

export const getLessonById = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findById(req.params.id)
    .populate('module', 'title');
  if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
  res.status(200).json(lesson);
});

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