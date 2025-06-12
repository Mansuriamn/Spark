// src/services/courseService.js
import api from '../../../server/src/utils/api';

export const createCourse = formData =>
  api.post('/courses', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }, // if uploading files
  });
