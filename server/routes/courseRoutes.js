import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCoursesByInstructor,
  createCategory, updateCategory, getAllCategories,
  getSingleLessonFromCourse,
  getLessonsOfCourse,
  getUsersEnrolledInCourse,
  getCourseProgress
} from '../controllers/courseController.js';

import { checkRole, protect } from '../middlewares/authMiddleware.js'; // ✅ New role-check middleware

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({ storage});


const router = express.Router();

// Public Routes
router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.get('/instructor/:instructorId', getCoursesByInstructor);
router.get('/:id/progress', protect, getCourseProgress);

router.post('/category', createCategory);
router.put('/category/:categoryId', updateCategory);
router.get('/category', getAllCategories);
router.get('/:id/lessons', getLessonsOfCourse);
router.get('/:courseId/lessons/:lessonId', getSingleLessonFromCourse);
router.get('/:courseId/enrolled-users', getUsersEnrolledInCourse);
// Protected Routes (Admin or Mentor only)
router.post(
  '/',
  protect,
  checkRole(['Admin', 'Mentor']),
  upload.single('picture'),
  createCourse
);
router.put(
  '/:id',
  protect,
  checkRole(['Admin', 'Mentor']),
  upload.single('picture'),
  updateCourse
);
router.delete('/:id', protect, checkRole(['Admin', 'Mentor']), deleteCourse);

export default router;