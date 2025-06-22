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
export const storage2 = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'courses_pic',
    resource_type: 'picture', // or 'users' for user profile pics
    format: async (req, file) => ['jpg', 'png', 'jpeg'], // optional ['jpg', 'png', 'jpeg'],
  },
});

export const uploadToCloudinary = multer({ storage,storage2 });
