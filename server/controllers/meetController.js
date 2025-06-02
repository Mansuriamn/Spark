import { Meeting } from '../models/Meeting.js';

export const createMeeting = async (req, res) => {
  try {
    const roomName = `lms-${Date.now()}-${Math.floor(Math.random() * 9999)}`;
    const meeting = await Meeting.create({
      roomName,
      courseId: req.body.courseId,
      createdBy: req.user._id,
    });
    res.status(201).json({ roomName: meeting.roomName });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({ roomName: req.params.roomName });
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
    res.status(200).json(meeting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const endMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findOneAndUpdate(
      { roomName: req.params.roomName },
      { isActive: false },
      { new: true }
    );
    res.status(200).json({ message: 'Meeting ended', meeting });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};