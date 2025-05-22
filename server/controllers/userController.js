import User from '../models/User.js';
import bcrypt from 'bcrypt';
import JsonWebTokenError from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword, role:'user' });
    await user.save();

    const token = JsonWebTokenError.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});

    res.status(201).json(user, token);
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
};

