import express from 'express';
import { protect } from '../middleware/auth.js';
import { createMeeting, getMeeting, endMeeting } from '../controllers/meetingController.js';

const router = express.Router();

router.post('/', protect, createMeeting);
router.get('/:roomName', protect, getMeeting);
router.patch('/:roomName/end', protect, endMeeting);

export default router;