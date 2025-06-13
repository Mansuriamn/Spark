import { Contest } from '../models/Contest.js';

export const createContest = async (req, res) => {
  try {
    const contest = await Contest.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json(contest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllContests = async (req, res) => {
  try {
    const contests = await Contest.find().sort({ time: 1 });
    res.status(200).json(contests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getContestById = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id);
    if (!contest) return res.status(404).json({ message: 'Contest not found' });
    res.status(200).json(contest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteContest = async (req, res) => {
  try {
    await Contest.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRegisteredUserCount = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id);
    if (!contest) return res.status(404).json({ message: 'Contest not found' });
    const count = contest.registeredUsers ? contest.registeredUsers.length : 0;
    res.json({ registeredUserCount: count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const enrollInContest = async (req, res) => {
  try {
    const { contestId, userId } = req.body;
    const contest = await Contest.findByIdAndUpdate(
      contestId,
      { $addToSet: { registeredUsers: userId } }, // prevents duplicates
      { new: true }
    ).populate('registeredUsers');
    if (!contest) return res.status(404).json({ message: 'Contest not found' });
    res.status(200).json({ message: 'User enrolled successfully', contest });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};