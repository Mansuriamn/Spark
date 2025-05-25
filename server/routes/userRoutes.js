import express from 'express';
import { registerUser, updateUser, softDeleteUser } from '../controllers/userController.js';
import { loginUser } from '../controllers/loginController.js'

const router = express.Router();

// Route to create a user
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/users/:userId', updateUser);
router.delete('/users/:userId', softDeleteUser);

export default router;