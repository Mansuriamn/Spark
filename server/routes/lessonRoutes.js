import express from 'express';
import {
  getAllLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
} from '../controllers/lessonController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllLessons);
router.get('/:id', getLessonById);
router.post('/', protect, authorize('Admin', 'Mentor'), createLesson);
router.put('/:id', protect, authorize('Admin', 'Mentor'), updateLesson);
router.delete('/:id', protect, authorize('Admin', 'Mentor'), deleteLesson);

export default router;
