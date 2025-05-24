import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController.js';

import { checkRole, protect } from '../middlewares/authMiddleware.js'; // ✅ New role-check middleware

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

// Public Routes
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

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
