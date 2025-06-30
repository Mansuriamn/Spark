import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Star, User, BookOpen, Play, Download, Smartphone, Award, Calendar, Users, Globe, ChevronDown, ChevronUp, ShoppingCart, CreditCard } from 'lucide-react';
import { AuthContext } from '../pages/AuthContext';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const coursedata = {
  id: 'professional-python',
  title: 'Professional Python Development',
  subtitle: 'Master Python for real-world applications with advanced projects',
  image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  rating: 4.7,
  totalRatings: 21530,
  students: 120450,
  instructor: 'Michael Rodriguez',
  instructorRole: 'Senior Python Developer',
  lastUpdated: '6/2025',
  languages: ['English', 'Spanish', 'German'],
  free: false,
  price: 89.99,
  discountPrice: 59.99,
  duration: '15h 30m',
  sections: 18,
  lectures: 72,
  whatYouLearn: [
    'Build professional-grade Python applications',
    'Master advanced Python concepts and design patterns',
    'Work with databases and ORM systems',
    'Create RESTful APIs with Flask and Django',
    'Implement testing and debugging strategies',
    'Deploy applications to production environments',
    'Optimize Python code for performance',
    'Develop real-world projects'
  ],
  courseIncludes: [
    { icon: Play, text: '15 hours on-demand video' },
    { icon: BookOpen, text: '32 coding exercises' },
    { icon: Download, text: '42 downloadable resources' },
    { icon: Smartphone, text: 'Access on mobile and TV' },
    { icon: Award, text: 'Certificate of completion' }
  ],
  requirements: [
    'Basic Python knowledge',
    'A computer with internet connection',
    'Experience with command line'
  ],
  topics: ['Python', 'Web Development', 'APIs', 'Django', 'Flask'],
  reviews: [
    {
      name: 'Rajesh P.',
      comment: 'Advanced content that took my skills to the next level',
      rating: 5
    },
    {
      name: 'Emily T.',
      comment: 'Worth every penny! The projects are amazing.',
      rating: 5
    },
    {
      name: 'Thomas K.',
      comment: 'Professional content from an industry expert',
      rating: 4
    }
  ],
  courseContent: [
    {
      section: 1,
      title: 'Advanced Python Concepts',
      lectures: 6,
      duration: '1hr 20min',
      lessons: [
        { title: 'Decorators and Context Managers', duration: '12:30' },
        { title: 'Metaclasses and Abstract Base Classes', duration: '15:45' },
        { title: 'Concurrency and Parallelism', duration: '18:20' },
        { title: 'Advanced Generators', duration: '14:15' },
        { title: 'Type Hinting and Static Analysis', duration: '10:40' },
        { title: 'Performance Optimization Techniques', duration: '09:10' }
      ]
    },
    {
      section: 2,
      title: 'Web Development with Django',
      lectures: 7,
      duration: '2hr 15min',
      lessons: [
        { title: 'Django ORM Deep Dive', duration: '18:30' },
        { title: 'Building REST APIs with Django REST Framework', duration: '22:15' },
        { title: 'Authentication and Authorization', duration: '15:20' },
        { title: 'Testing in Django', duration: '12:45' },
        { title: 'Deployment Strategies', duration: '20:30' },
        { title: 'Performance Tuning', duration: '16:40' },
        { title: 'Real-world Django Project', duration: '29:20' }
      ]
    }
  ]
};

const PaidCourseDetails = () => {
  const navigate = useNavigate();
  const { courseId: id } = useParams();
  const { lessonId: lessonid } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState([]);
  const [expandedSection, setExpandedSection] = useState(null);
  const [videoDurations, setVideoDurations] = useState({});

  const {
    isAuthenticated,
    enrolledCourses,
    updateEnrolledCourses,
    user,
    token,
    enrolledCourseIds,
    cartCourses,
    updateCartCourses,
    isCourseInCart
  } = useContext(AuthContext);

  // Helper function to add debug information
  const addDebugInfo = (message) => {
    console.log(message);
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Helper function to validate MongoDB ObjectId
  const isValidObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      addDebugInfo("Starting fetchCourseDetails");

      if (!id) {
        addDebugInfo("ERROR: Course ID not provided");
        setError("Course ID not provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        addDebugInfo(`Original ID from URL params: ${id}`);

        // Decode the URL parameter in case it's encoded
        const decodedId = decodeURIComponent(id);
        addDebugInfo(`Decoded ID: ${decodedId}`);

        // Validate if it's a valid MongoDB ObjectId
        const isValidId = isValidObjectId(decodedId);
        addDebugInfo(`Is valid ObjectId: ${isValidId}`);

        // Try multiple API endpoints that might work
        const possibleEndpoints = [
          `/api/courses/${decodedId}`,
          `/api/course/${decodedId}`,
          `/api/track/${decodedId}`, // Since your URL uses /track/
          `/api/course/${decodedId}`,
          `/api/courses/details/${decodedId}`,
          `/api/v1/courses/${decodedId}`
        ];

        let courseData = null;
        let successfulEndpoint = null;

        // Try each endpoint until one works
        for (const endpoint of possibleEndpoints) {
          try {
            addDebugInfo(`Trying endpoint: ${endpoint}`);

            const response = await axios.get(endpoint, {
              timeout: 8000,
              headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
              }
            });

            addDebugInfo(`✅ Success with ${endpoint} - Status: ${response.status}`);

            if (response.data) {
              courseData = response.data.data || response.data.course || response.data;
              successfulEndpoint = endpoint;
              break;
            }

          } catch (endpointError) {
            addDebugInfo(`❌ Failed ${endpoint}: ${endpointError.response?.status || endpointError.message}`);
            continue; // Try next endpoint
          }
        }

        let studentsCount = courseData?.students;
        if (studentsCount === undefined && courseData?._id) {
          try {
            const studentsRes = await axios.get(`/api/courses/${courseData._id}/enrolled-users`);
            if (studentsRes.data && typeof studentsRes.data.count === 'number') {
              studentsCount = studentsRes.data.count;
              addDebugInfo(`Fetched students count: ${studentsCount}`);
            }
          } catch (err) {
            addDebugInfo("Failed to fetch students count separately");
          }
        }

        if (courseData && successfulEndpoint) {
          addDebugInfo(`Course data retrieved from: ${successfulEndpoint}`);
          addDebugInfo(`Course title: ${courseData.title || 'No title found'}`);

          // Transform backend data to match component expectations
          const transformedCourse = {
            // Basic info
            id: courseData._id || courseData.id,
            _id: courseData._id || courseData.id,
            title: courseData.title,
            subtitle: courseData.description, // Map description to subtitle
            description: courseData.description,
            image: courseData.thumbnailUrl || courseData.pictureUrl,

            // Category and tags
            category: courseData.category?.name,
            tags: courseData.tags || [],
            skillTags: courseData.skillTags || [],

            // Course details
            level: courseData.level,
            language: courseData.language,
            duration: courseData.estimatedDuration ? `${Math.floor(courseData.estimatedDuration / 60)}h ${courseData.estimatedDuration % 60}m` : '0 min',
            estimatedDuration: courseData.estimatedDuration,

            // Pricing
            free: courseData.price === 0,
            price: courseData.price || 0,
            discountPrice: courseData.discountPrice || null,

            // Course status
            status: courseData.status,
            version: courseData.version,

            // Metadata
            createdAt: courseData.createdAt,
            updatedAt: courseData.updatedAt,
            lastUpdated: courseData.updatedAt ? new Date(courseData.updatedAt).toLocaleDateString() : 'N/A',

            // Instructor info
            instructor: courseData.createdBy?.email || 'Unknown Instructor',
            instructorRole: 'Course Creator',

            // Lessons
            lessons: courseData.lessons || [],
            lecturesCount: courseData.lessons?.length || 0,

            // Default values for missing fields
            rating: 4.5, // Default rating since not in backend
            totalRatings: 0,
            students: studentsCount || 0,
            languages: [courseData.language === 'en' ? 'English' : courseData.language || 'English'],
            sections: 1,
            lectures: courseData.lessons?.length || 0,

            // Course content - we'll need to fetch lessons separately or structure differently
            whatYouLearn: [
              `Learn ${courseData.title}`,
              `Understand ${courseData.category?.name || 'programming'} concepts`,
              `Build practical skills in ${courseData.skillTags?.join(', ') || 'development'}`,
              `Complete hands-on projects and exercises`
            ],

            courseIncludes: [
              { icon: Play, text: `${courseData.estimatedDuration || 0} minutes of content` },
              { icon: BookOpen, text: `${courseData.lessons?.length || 0} lessons` },
              { icon: Download, text: 'Downloadable resources' },
              { icon: Smartphone, text: 'Access on mobile and TV' },
              { icon: Award, text: 'Certificate of completion' }
            ],

            requirements: courseData.prerequisites?.length > 0 ? courseData.prerequisites : [
              'No prior experience required',
              'A computer with internet connection',
              'Willingness to learn and practice'
            ],

            topics: courseData.tags || [],

            // Default reviews
            reviews: [
              {
                name: 'Student',
                comment: `Great introduction to ${courseData.title}!`,
                rating: 5
              }
            ],

            // Course content structure - simplified since we don't have detailed lesson data
            courseContent: [
              {
                section: 1,
                title: courseData.title,
                lectures: courseData.lessons?.length || 0,
                duration: courseData.estimatedDuration ? `${courseData.estimatedDuration}min` : '0 min',
                lessons: courseData.lessons || []
              }
            ]
          };

          addDebugInfo(`Transformed course data: ${JSON.stringify(transformedCourse, null, 2).substring(0, 200)}...`);
          setCourse(transformedCourse);
        } else {
          throw new Error("All API endpoints failed");
        }

      } catch (err) {
        addDebugInfo(`All API calls failed: ${err.message}`);

        // Additional debugging for network issues
        if (err.code === 'ECONNABORTED') {
          addDebugInfo("⚠️ Request timed out - Backend might be slow");
        } else if (err.code === 'ERR_NETWORK') {
          addDebugInfo("⚠️ Network error - Check if backend is running");
        } else if (!err.response) {
          addDebugInfo("⚠️ No response received - Possible CORS or network issue");
        }

        setError(`Failed to load course details: ${err.message}`);
        addDebugInfo("Using fallback course data");
        setCourse(coursedata);

      } finally {
        setLoading(false);
        addDebugInfo("fetchCourseDetails completed");
      }
    };

    fetchCourseDetails();
  }, [id, token]);


  const handleLoadedMetadata = (lessonId, e) => {
    setVideoDurations(prev => ({
      ...prev,
      [lessonId]: e.target.duration
    }));
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course details...</p>
          {/* Debug info in loading state */}
          <div className="mt-4 text-xs text-gray-500 max-w-md">
            <details>
              <summary className="cursor-pointer">Debug Info ({debugInfo.length})</summary>
              <div className="text-left bg-gray-100 p-2 rounded mt-2 max-h-40 overflow-y-auto">
                {debugInfo.map((info, i) => (
                  <div key={i} className="font-mono text-xs">{info}</div>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
    );
  }

  // Error state when course not found
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-4">The course you're looking for doesn't exist.</p>
          <p className="text-gray-500 mb-4">Tried to find course with ID: <code className="bg-gray-100 px-2 py-1 rounded">{id}</code></p>

          <div className="space-y-4">
            <button
              onClick={() => navigate('/courses')}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Browse Courses
            </button>

            <div className="text-sm text-gray-500">
              <p>💡 <strong>For Developers:</strong></p>
              <ul className="list-disc list-inside text-left mt-2 space-y-1">
                <li>Check if your backend API is running</li>
                <li>Verify the correct API endpoint path</li>
                <li>Ensure the course ID exists in your database</li>
                <li>Check CORS configuration if running locally</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check if user is already enrolled
  const isAlreadyEnrolled = enrolledCourses.some(c =>
    c.id === course.id || c._id === course._id || c.id === course._id || c._id === course.id
  );

  // Handle course enrollment
  const handleEnroll = async () => {
    if (!isAuthenticated) {
      alert('Please login to enroll in this course');
      return;
    }

    if (!isAlreadyEnrolled && user) {
      try {
        // Optimistically update UI first
        const updatedCourses = [...enrolledCourses, course];
        updateEnrolledCourses(updatedCourses);

        // API call to enroll user
        const response = await axios.post('/api/users/enroll', {
          userId: user.id || user._id,
          courseId: course.id || course._id,
          courseTitle: course.title,
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });

        if (response.status === 200 || response.status === 201) {
          console.log('Enrollment successful:', response.data);
          alert('Successfully enrolled in the course!');

          // Optionally update with server response data
          if (response.data.enrolledCourses) {
            updateEnrolledCourses(response.data.enrolledCourses);
          }
        }
      } catch (error) {
        console.error('Enrollment failed:', error);

        // Revert optimistic update in case of error
        updateEnrolledCourses(enrolledCourses);

        // Show user-friendly error message
        const errorMessage = error.response?.data?.message ||
          error.response?.data?.error ||
          'Failed to enroll in course. Please try again.';
        alert(errorMessage);
      }
    } else if (isAlreadyEnrolled) {
      alert('You are already enrolled in this course!');
    }
  };

  // Handle purchase (buy now)
  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      alert('Please login to purchase this course');
      return;
    }

    try {
      // In a real app, this would integrate with a payment gateway
      // For now, we'll simulate a successful payment
      await handleEnroll();
      alert('Purchase successful! You are now enrolled in this course.');
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed. Please try again.');
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('Please login to add courses to your cart');
      return;
    }

    if (isCourseInCart(course.id || course._id)) {
      alert('This course is already in your cart');
      return;
    }

    const newCart = [...cartCourses, course];
    updateCartCourses(newCart);
    alert('Course added to cart!');
  };

  // Handle start course
  const handleStartCourse = () => {
    if (course && course.lessons && course.lessons.length > 0) {
      // lessons could be objects or IDs, adjust accordingly
      const firstLesson = course.lessons[0];
      const firstLessonId = typeof firstLesson === "object" ? (firstLesson._id || firstLesson.id) : firstLesson;
      if (firstLessonId) {
        navigate(`/courses/${course._id}/lesson/${firstLessonId}`);
      } else {
        alert("No valid lessons found for this course.");
      }
    } else {
      alert("No lessons found for this course.");
    }
  };

  const safeArray = (arr) => Array.isArray(arr) ? arr : [];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Course Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {course.free ? (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Free Course
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    ₹{course.discountPrice || course.price}
                  </span>
                  {course.discountPrice && (
                    <span className="line-through text-gray-500">${course.price}</span>
                  )}
                </div>
              )}

              {course.level && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  {course.level}
                </span>
              )}

              {course.status && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${course.status === 'published'
                  ? 'bg-green-100 text-green-800'
                  : course.status === 'draft'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                  }`}>
                  {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                </span>
              )}

              {course.category && (
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </span>
              )}

              {course.rating && (
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 font-semibold">{course.rating}</span>
                </div>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold mb-4">{course.title}</h1>
            {(course.subtitle || course.description) && (
              <p className="text-gray-700 text-lg mb-6">{course.subtitle || course.description}</p>
            )}

            {/* Pricing Information */}
            {!course.free && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">Limited Time Offer</h3>
                    <p className="text-gray-700">
                      {course.discountPrice
                        ? `Get this course for ₹${course.discountPrice} (₹${course.price - course.discountPrice} off!)`
                        : `Price: ₹${course.price}`}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">30-day money-back guarantee</p>
                  </div>
                  <div className="flex items-center text-yellow-500 mt-2 md:mt-0">
                    <Clock className="h-5 w-5 mr-1" />
                    <span>Offer ends in 2 days</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              {course.instructor && (
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  Created by <span className="text-purple-600 ml-1">{course.instructor}</span>
                </div>
              )}
              {course.lastUpdated && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Last updated {course.lastUpdated}
                </div>
              )}
              {course.languages && (
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  {safeArray(course.languages).join(', ')}
                </div>
              )}
              {course.duration && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration} Total length
                </div>
              )}
            </div>

            {/* Skills and Tags */}
            {(course.skillTags?.length > 0 || course.tags?.length > 0) && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Skills you'll learn:</h3>
                <div className="flex flex-wrap gap-2">
                  {safeArray(course.skillTags).map((skill, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                  {safeArray(course.tags).map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {isAuthenticated ? (
                isAlreadyEnrolled ? (
                  <button
                    onClick={handleStartCourse}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Start Course
                  </button>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <button
                      onClick={handleBuyNow}
                      className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex-1 flex items-center justify-center"
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      Buy Now
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="bg-white border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex-1 flex items-center justify-center"
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                )
              ) : (
                <div className="flex flex-col w-full">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => alert('Please login to purchase this course')}
                      className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex-1"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => alert('Please login to add courses to your cart')}
                      className="bg-white border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex-1"
                    >
                      Add to Cart
                    </button>
                  </div>
                  <p className="text-red-500 text-sm mt-2 text-center">Login required to purchase</p>
                </div>
              )}
            </div>

            {/* Payment Security Info */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Secure payment</span>
              </div>
            </div>
          </div>

          {/* Course Video */}
          {course.videoId && (
            <div className="w-full aspect-video rounded overflow-hidden mb-8">
              <iframe
                src={`https://www.youtube.com/embed/${course.videoId}`}
                title={course.title}
                allowFullScreen
                className="w-full h-full rounded"
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* What You'll Learn */}
            {course.whatYouLearn && course.whatYouLearn.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">What you'll learn</h2>
                <div className="space-y-3">
                  {safeArray(course.whatYouLearn).map((item, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-green-600 mr-3 mt-1">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* This Course Includes */}
            {course.courseIncludes && course.courseIncludes.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">This course includes:</h2>
                <div className="space-y-4">
                  {safeArray(course.courseIncludes).map((item, index) => (
                    <div key={index} className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3 text-gray-600" />
                      <span className="text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Requirements */}
          {course.requirements && course.requirements.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
              <h2 className="text-xl font-bold mb-4">Requirements</h2>
              <ul className="space-y-2">
                {safeArray(course.requirements).map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gray-400 mr-3 mt-1">•</span>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Course Content */}
          {course.courseContent && course.courseContent.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Course content</h2>
                <button
                  className="text-purple-600 text-sm hover:underline"
                  onClick={() => setExpandedSection(expandedSection === 'all' ? null : 'all')}
                >
                  {expandedSection === 'all' ? 'Collapse all' : 'Expand all'} sections
                </button>
              </div>
              <p className="text-gray-600 mb-4">
                {course.sections || safeArray(course.courseContent).length} sections • {course.lectures || 0} lectures • {course.duration || '0 min'} total length
              </p>

              {safeArray(course.courseContent).map((section, index) => (
                <div key={index} className="border rounded-lg mb-4">
                  <button
                    className="w-full p-4 text-left hover:bg-gray-50 flex justify-between items-center"
                    onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                  >
                    <div>
                      <h3 className="font-medium">
                        Section {section.section || index + 1}: {section.title}
                      </h3>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span>{section.lectures || 0} lectures • {section.duration || 'N/A'}</span>
                      {(expandedSection === index || expandedSection === 'all') ? (
                        <ChevronUp className="h-4 w-4 ml-2" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-2" />
                      )}
                    </div>
                  </button>

                  {(expandedSection === index || expandedSection === 'all') && section.lessons && (
                    <div className="border-t">
                      {safeArray(section.lessons).map((lesson, lessonIndex) => {
                        const lessonId = lesson._id || lesson.id || lessonIndex;
                        return (
                          <div
                            className="p-3 border-b last:border-b-0 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                              // Only allow navigation if user is enrolled or has bought the course
                              if (isAlreadyEnrolled) {
                                if (lesson._id || lesson.id) {
                                  navigate(`/courses/${course._id}/lesson/${lesson._id || lesson.id}`);
                                } else if (course.lessons && course.lessons.length > 0) {
                                  const firstLesson = course.lessons[0];
                                  const firstLessonId = typeof firstLesson === "object" ? (firstLesson._id || firstLesson.id) : firstLesson;
                                  if (firstLessonId) {
                                    navigate(`/courses/${course._id}/lesson/${firstLessonId}`);
                                  } else {
                                    alert("No valid lessons found for this course.");
                                  }
                                } else {
                                  alert("No valid lesson ID found for this lesson.");
                                }
                              } else {
                                alert("Please enroll or purchase the course to access lessons.");
                              }
                            }}
                          >
                            <div className="flex items-center">
                              <Play className="h-4 w-4 mr-2 text-gray-400" />
                              <span className="text-sm">{lesson.title}</span>
                              {lesson.preview && (
                                <span className="ml-2 text-purple-600 text-xs">Preview</span>
                              )}
                            </div>
                            <span className="text-sm text-gray-600">
                              {lesson.videoUrl && (
                                <>
                                  <video
                                    src={lesson.videoUrl}
                                    style={{ display: 'none' }}
                                    onLoadedMetadata={e => handleLoadedMetadata(lessonId, e)}
                                  />
                                  {videoDurations[lessonId]
                                    ? `${Math.floor(videoDurations[lessonId] / 60)}m ${Math.round(videoDurations[lessonId] % 60)}s`
                                    : (lesson.duration || 'N/A')}
                                </>
                              )}
                              {!lesson.videoUrl && (lesson.duration || 'N/A')}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Student Reviews */}
          {course.reviews && course.reviews.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
              <h2 className="text-xl font-bold mb-4">Student Reviews</h2>
              <div className="space-y-4">
                {safeArray(course.reviews).map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(review.rating || 5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 font-medium">{review.name}</span>
                    </div>
                    <p className="text-gray-700">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaidCourseDetails;