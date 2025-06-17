import express from 'express';

import { 
  getLearningHours ,
registerUser,
updateUser, 
softDeleteUser,
getEnrolledCoursesCount, 
getCompletedCoursesCount ,
enrollInCourse,
changeUserRole, getAllInstructors,
getInProgressCoursesCount,
 getTotalCoursesCount,
} from '../controllers/userController.js';

import { loginUser } from '../controllers/loginController.js'

const router = express.Router();

// Route to create a user
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/users/:userId', updateUser);
router.delete('/users/:userId', softDeleteUser);
router.patch('/users/:userId/role', changeUserRole);
router.get('/instructors', getAllInstructors);


// Route to enroll a user in a course
router.post('/enroll', enrollInCourse);

router.get('/:id/in-progress-courses-count', getInProgressCoursesCount);

// Route to get number of enrolled courses
router.get('/:userId/enrolled-courses-count', getEnrolledCoursesCount);

// Route to get number of completed courses
router.get('/:userId/completed-courses-count', getCompletedCoursesCount);

router.get('/:id/total-courses-count', getTotalCoursesCount);

router.get('/:id/learning-hours', getLearningHours);
export default router;
