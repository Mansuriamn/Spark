import express from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', protect, authorize('Admin', 'Mentor'), createCourse);
router.put('/:id', protect, authorize('Admin', 'Mentor'), updateCourse);
router.delete('/:id', protect, authorize('Admin', 'Mentor'), deleteCourse);

export default router;
