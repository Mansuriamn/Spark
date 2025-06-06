import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createMeeting, getMeeting, endMeeting } from '../controllers/meetController.js';

const router = express.Router();

router.post('/', protect, createMeeting);
router.get('/:roomName', protect, getMeeting);
router.patch('/:roomName/end', protect, endMeeting);

export default router;