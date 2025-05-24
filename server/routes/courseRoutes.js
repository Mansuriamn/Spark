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
import { protect, authorize } from '../middleware/auth.js';

// Multer disk storage
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post(
  '/',
  protect,
  authorize('Admin', 'Mentor'),
  upload.single('picture'),   // <‑‑ handle image upload
  createCourse,
);
router.put(
  '/:id',
  protect,
  authorize('Admin', 'Mentor'),
  upload.single('picture'),   // <‑‑ optional new picture
  updateCourse,
);
router.delete('/:id', protect, authorize('Admin', 'Mentor'), deleteCourse);

export default router;