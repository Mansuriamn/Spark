import express from 'express';
import {
  getAllLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
} from '../controllers/lessonController.js';

import {protect, checkRole } from '../middlewares/authMiddleware.js'; // make sure this file exports the function

const router = express.Router();

// Public Routes
router.get('/', getAllLessons);              // GET all lessons
router.get('/:id', getLessonById);           // GET a single lesson by ID

// Protected Routes (Admin or Mentor only)
router.post('/', protect, checkRole(['Admin', 'Mentor']), createLesson);
router.put('/:id', protect, checkRole(['Admin', 'Mentor']), updateLesson);
router.delete('/:id', protect, checkRole(['Admin', 'Mentor']), deleteLesson);

export default router;
