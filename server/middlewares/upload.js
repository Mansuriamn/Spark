import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'media/video/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 9999)}${ext}`);
  }
});

const videoFilter = (req, file, cb) => {
  const allowed = ['.mp4', '.webm', '.ogg'];
  const ext = path.extname(file.originalname).toLowerCase();
  cb(null, allowed.includes(ext));
};

export const uploadVideo = multer({
  storage,
  fileFilter: videoFilter
});
