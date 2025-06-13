import express from 'express';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { 
registerUser,
updateUser, 
softDeleteUser,
getEnrolledCoursesCount, 
getCompletedCoursesCount ,
 enrollInCourse
} from '../controllers/userController.js';
=======
import { registerUser, updateUser, softDeleteUser, changeUserRole, getAllInstructors } from '../controllers/userController.js';
>>>>>>> Stashed changes
=======
import { registerUser, updateUser, softDeleteUser, changeUserRole, getAllInstructors } from '../controllers/userController.js';
>>>>>>> Stashed changes
import { loginUser } from '../controllers/loginController.js'

const router = express.Router();

// Route to create a user
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/users/:userId', updateUser);
router.delete('/users/:userId', softDeleteUser);
router.patch('/users/:userId/role', changeUserRole);
router.get('/instructors', getAllInstructors);
<<<<<<< Updated upstream


// Route to enroll a user in a course
router.post('/enroll', enrollInCourse);

// Route to get number of enrolled courses
router.get('/:userId/enrolled-courses-count', getEnrolledCoursesCount);

// Route to get number of completed courses
router.get('/:userId/completed-courses-count', getCompletedCoursesCount);

=======
>>>>>>> Stashed changes

export default router;