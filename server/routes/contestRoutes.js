import express from 'express';
import {protect } from '../middlewares/authMiddleware.js'; // ✅ New role-check middleware
import {
  createContest,
  getAllContests,
  getContestById,
  deleteContest,
getRegisteredUserCount,
enrollInContest} from '../controllers/contestController.js';

const router = express.Router();

router.get('/', getAllContests);
router.get('/:id', getContestById);
router.post('/', protect, createContest);
router.delete('/:id', protect, deleteContest);
// GET /api/contests/:id/registered-users-count
router.get('/:id/registered-users-count', getRegisteredUserCount);
// POST /api/contests/enroll
router.post('/enroll', enrollInContest);
export default router;