import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'lesson_videos',
    resource_type: 'video', // 👈 very important
    format: async (req, file) => 'mp4', // optional
  },
});

export const uploadToCloudinary = multer({ storage });
