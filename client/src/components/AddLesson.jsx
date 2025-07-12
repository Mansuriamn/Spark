import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Plus, X, Upload, Save } from 'lucide-react';
import { AuthContext } from '../pages/AuthContext';
import Footer from './Footer';
import '../assets/style/UserProfile.css';

export default function AddLesson() {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId, courseTitle } = location.state || {};
  const { token } = useContext(AuthContext);

  const [lesson, setLesson] = useState({
    title: '',
    content: '',
    duration: '',
    video: null
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'video' && files && files[0]) {
      setLesson(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setLesson(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lesson.title.trim() || !lesson.content.trim() || !lesson.duration.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    if (!courseId) {
      setError('Course ID is missing');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', lesson.title);
      formData.append('content', lesson.content);
      formData.append('duration', lesson.duration);
      formData.append('courseId', courseId);

      if (lesson.video) {
        formData.append('video', lesson.video);
      }

      console.log('Sending lesson data:', {
        title: lesson.title,
        content: lesson.content,
        duration: lesson.duration,
        courseId: courseId
      });

      const response = await fetch('http://localhost:5000/api/lessons', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create lesson');
      }

      const createdLesson = await response.json();
      console.log('Lesson created successfully:', createdLesson);

      setSuccess('Lesson added successfully!');
      setTimeout(() => {
        navigate('/instructor');
      }, 2000);

    } catch (err) {
      console.error('Error creating lesson:', err);
      setError('Failed to add lesson: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/instructor')}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Add Lesson</h1>
                <p className="text-gray-600">Course: {courseTitle}</p>
              </div>
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
              {error}
              <button
                onClick={() => setError('')}
                className="float-right font-bold"
              >
                ×
              </button>
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-6">
              {success}
            </div>
          )}

          {/* Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={lesson.title}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Enter lesson title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
                  <input
                    type="text"
                    name="duration"
                    value={lesson.duration}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="e.g., 30 mins"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Content *</label>
                <textarea
                  name="content"
                  value={lesson.content}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  rows="4"
                  placeholder="Describe what this lesson covers..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Video</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    name="video"
                    accept="video/*"
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <Upload className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Upload a video file for this lesson (optional)</p>
              </div>

              <div className="flex space-x-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl transition-all duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding Lesson...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Add Lesson</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/instructor')}
                  disabled={loading}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-xl transition-all duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <X className="w-5 h-5" />
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 