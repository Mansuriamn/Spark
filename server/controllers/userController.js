
import { User } from '../models/User.js';
import { Course } from '../models/Course.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import dotenv from 'dotenv';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword, role:'user' });
    await user.save();

    const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
    console.log(`✅ New user registered: ${name} (${email}`);
    res.status(201).json({user, token});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const softDeleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(userId, { deleted: true }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User soft deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
// In userController.js
export const enrollInCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { enrolledCourses: courseId } },
      { new: true }
    ).populate('enrolledCourses');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Returns the number of courses a user has enrolled in
export const getEnrolledCoursesCount = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const count = user.enrolledCourses.length;
    res.json({ enrolledCoursesCount: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCompletedCoursesCount = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Get all enrolled courses with their lessons
    const courses = await Course.find({ _id: { $in: user.enrolledCourses } }).populate('lessons');
    let completedCount = 0;

    for (const course of courses) {
      const lessonIds = course.lessons.map(lesson => lesson._id.toString());
      const completedLessonIds = user.completedLessons ? user.completedLessons.map(id => id.toString()) : [];
      // Check if every lesson in the course is in user's completedLessons
      const allLessonsCompleted = lessonIds.every(id => completedLessonIds.includes(id));
      if (allLessonsCompleted && lessonIds.length > 0) completedCount++;
    }

    res.json({ completedCoursesCount: completedCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const changeUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    const validRoles = ['user', 'instructor', 'admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User role updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllInstructors = async (req, res) => {
  /**try {
    const instructors = await User.find({ role: 'instructor', deleted: false });
    res.status(200).json(instructors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }*/
};

export const getInProgressCoursesCount = async (req, res) => {
  const userId = req.params.id;
  // Replace with your actual logic:
  const count = await Course.countDocuments({ createdBy: userId, status: 'in-progress' });
  res.json({ count });
};

export const getTotalCoursesCount = async (req, res) => {
  try {
    const userId = req.params.id;
    // Count all courses created by this user (adjust filter as needed)
    const count = await Course.countDocuments({ createdBy: userId });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getLearningHours = async (req, res) => {
  try {
    const userId = req.params.id;
    // Example: sum all course durations for this user
    // You may need to adjust this logic based on your schema
    const courses = await Course.find({ createdBy: userId });

    let totalMinutes = 0;
    courses.forEach(course => {
      if (course.duration) {
        const match = course.duration.match(/(\d+)h\s*(\d+)?m?/);
        if (match) {
          totalMinutes += parseInt(match[1] || 0) * 60 + parseInt(match[2] || 0);
        }
      }
    });
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    res.json(`{hours: ${hours}h ${minutes}m }`);
  } catch (err) {
    res.status(500).json({ message: err.message});
}
};

