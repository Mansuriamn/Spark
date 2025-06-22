import { Course } from '../models/Course.js';
import { User } from '../models/User.js';
import  Category  from '../models/Category.js';
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ ...req.query })
    .populate('category', 'name')
    .populate('createdBy', 'fullName email')
    .select('-__v');
  res.status(200).json({ count: courses.length, data: courses });
});

export const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate('category', 'name')
    .populate('lessons')
    .populate('prerequisites', 'title slug')
    .populate('createdBy', 'fullName email');
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.status(200).json(course);
});

// 👉 Create Course with optional picture upload
export const createCourse = asyncHandler(async (req, res) => {
  let payload = { ...req.body, createdBy: req.user.id };

  // If a file was uploaded via Multer, build its public URL
  if (req.file) {
    payload.pictureUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  }

  const course = await Course.create(payload);
  res.status(201).json(course);
});

// 👉 Update Course with versioning + optional new picture
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

  if (req.file) {
    req.body.pictureUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    id,
    {
      ...req.body,
      version: oldCourse.version + 1,
      $push: { versionHistory: versionSnapshot },
    },
    { new: true, runValidators: true },
  );
  res.status(200).json(updatedCourse);
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.status(204).send();
});

export const getCoursesByInstructor = asyncHandler(async (req, res) => {
  const courses = await Course.find({ 
    createdBy: req.params.instructorId,
    status: 'published'
  })
  .populate('category', 'name')
  .select('-__v');
  
  res.status(200).json({ count: courses.length, data: courses });
});

export const getCoursesByCategory = asyncHandler(async (req, res) => {
  const courses = await Course.find({ 
    category: req.params.categoryId,
    status: 'published'
  })
  .populate('category', 'name')
  .select('-__v');
  
  res.status(200).json({ count: courses.length, data: courses });
});



// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing category
export const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const updates = req.body;
    const category = await Category.findByIdAndUpdate(categoryId, updates, { new: true });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// View (get) all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};