import React, { useEffect, useState } from 'react';
import { Clock, Users, BarChart3, Book, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../style/CourseCard.css';

export default function CourseCard({ course }) {
  const navigate = useNavigate();
  const [studentCount, setStudentCount] = useState(0);

  // Convert minutes to "Xh Ym" format
  const getDurationString = (minutes) => {
     if (minutes === 0) return '0 min';
    if (!minutes || isNaN(minutes)) return '2h 0m';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h > 0 ? `${h}h ` : ''}${m}m`;
  };

  const lessonsCount = course.lessons ? course.lessons.length : 0;
  const estimatedDuration = getDurationString(course.estimatedDuration);
  const rating = course.rating || 4.5;
  const maxRating = 5.0;
  const price = course.price || 0;
  const title = course.title || 'Intro to Node.js';
  const instructor = course.createdBy?.email || 'Darkd1@gmail.com';
  const level = course.level || 'Beginner';
  const category = course.category?.name || 'Development';
  const isCompleted = course.isCompleted || false;

  // Fetch enrolled users count
  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/${course._id}/enrolled-users`);
        const data = await res.json();
        setStudentCount(Array.isArray(data.users) ? data.users.length : (Array.isArray(data.students) ? data.students.length : 0));
      } catch {
        setStudentCount(0);
      }
    };
    if (course._id) fetchStudentCount();
  }, [course._id]);

  const handleNavigation = () => {
    navigate(`/courses/${course._id}`);
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    // Horizontal Card with wider image section
    <div
      id="courseCard"
      className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row w-full cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100"
      onClick={handleNavigation}
    >
      {/* Left Image Section - Wider (60% on desktop) */}
<div className="relative w-full md:w-3/5 h-64 md:h-auto bg-white flex items-center justify-center overflow-hidden">
  <div
    className="w-full h-[256px] flex items-center justify-center bg-white"
    style={{
      minHeight: "256px",
      maxHeight: "256px",
      height: "256px",
      width: "100%",
    }}
  >
    <img
      src={course.pictureUrl}
      alt="Course"
      className="object-cover h-full w-full"
      style={{
        display: "block",
        background: "white",
      }}
    />
  </div>
  {/* Category Badge */}
  <span className="absolute top-4 left-4 bg-green-500 text-white text-sm px-3 py-1 rounded-lg font-medium shadow-lg">
    {category}
  </span>
  {/* Level Badge */}
  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 text-sm px-3 py-1 rounded-lg font-medium shadow-lg">
    {level}
  </span>
</div>
      {/* Right Content Section - Narrower (40% on desktop) */}
      <div className="p-6 w-full md:w-2/5 flex flex-col justify-between">
        <div className="flex-1">
          {/* Instructor */}
          <p className="text-sm text-gray-500 mb-2">by {instructor}</p>

          {/* Course Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{title}</h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {renderStars()}
            </div>
            <span className="text-sm font-medium text-gray-700">
              {rating} ({studentCount} reviews)
            </span>
          </div>

          {/* Course Stats */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-purple-500" />
              <span>{estimatedDuration}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4 text-purple-500" />
              <span>{studentCount} Students Enrolled</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Book className="w-4 h-4 text-purple-500" />
              <span>{lessonsCount} Lessons</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            {price === 0 ? (
              <span className="text-xl font-bold text-purple-600">FREE</span>
            ) : (
              <span className="text-xl font-bold text-green-600">₹{price}</span>
            )}
          </div>

          <a
  onClick={(e) => {
    e.stopPropagation();
    handleNavigation();
  }}
  className="text-blue-600 hover:text-blue-800 text-sm font-medium underline cursor-pointer"
>
  View Course
</a>
        </div>
      </div>
    </div>
  );
}