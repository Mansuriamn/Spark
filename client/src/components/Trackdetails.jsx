import React, { useState, useContext } from 'react';
import { Clock, Star, User, BookOpen, Play, Download, Smartphone, Award, Calendar, Users, Globe, ChevronDown, ChevronUp, Heart, Share, Gift, Tag } from 'lucide-react';
import Footer from './Footer';
import { AuthContext } from '../pages/AuthContext';

const Trackdetails = () => {
  const {
    isAuthenticated,
    enrolledCourses,
    cartCourses,
    updateCartCourses
  } = useContext(AuthContext);

  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Personal');
  const [couponCode, setCouponCode] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Define course object first
  const course = {
    id: 'python-bootcamp-100-days', // Added unique ID
    title: '100 Days of Code: The Complete Python Pro Bootcamp',
    subtitle: 'Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.7,
    totalRatings: 372755,
    students: 1590488,
    instructor: 'Dr. Angela Yu',
    instructorRole: 'Developer and Lead Instructor',
    lastUpdated: '6/2025',
    languages: ['English', 'Arabic [Auto]', '27 more'],
    bestseller: true,
    premium: true,
    price: '₹3,279',
    monthlyPrice: '₹850',
    duration: '56h 22m',
    sections: 101,
    lectures: 592,
    
    whatYouLearn: [
      'You will master the Python programming language by building 100 unique projects over 100 days.',
      'You will be able to program in Python professionally',
      'Create a portfolio of 100 Python projects to apply for developer jobs',
      'Be able to use Python for data science and machine learning',
      'Build GUIs and Desktop applications with Python',
      'You will learn automation, game, app and web development, data science and machine learning all using Python.',
      'You will learn Selenium, Beautiful Soup, Request, Flask, Pandas, NumPy, Scikit Learn, Plotly, and Matplotlib.',
      'Be able to build fully fledged websites and web apps with Python',
      'Build games like Blackjack, Pong and Snake using Python'
    ],

    courseIncludes: [
      { icon: Play, text: '52 hours on-demand video' },
      { icon: BookOpen, text: '23 coding exercises' },
      { icon: Download, text: '164 downloadable resources' },
      { icon: Smartphone, text: 'Access on mobile and TV' },
      { icon: Award, text: 'Certificate of completion' },
      { icon: Calendar, text: 'Assignments' }
    ],

    topics: ['Python', 'Programming Languages', 'Development'],
    
    reviews: [
      {
        name: 'Priya S.',
        comment: 'Amazing course! The projects are very practical and well-structured.',
        rating: 5
      },
      {
        name: 'Ankit R.',
        comment: 'Dr. Angela explains everything so clearly. Best Python course out there!',
        rating: 5
      },
      {
        name: 'Rohit K.',
        comment: 'Great balance between theory and hands-on projects.',
        rating: 4
      }
    ],

    courseContent: [
      {
        day: 1,
        title: 'Beginner - Working with Variables in Python to Manage Data',
        lectures: 12,
        duration: '1hr 12min',
        lessons: [
          { title: 'What you\'re going to get from this course', duration: '03:27', preview: true },
          { title: 'START HERE', duration: '02:53' },
          { title: 'Downloadable Resources and Tips for Taking the Course', duration: '04:22', preview: true },
          { title: 'Day 1 Goals: what we will make by the end of the day', duration: '02:30' },
          { title: 'Download and Setup PyCharm for Learning', duration: '01:34' },
          { title: 'Printing to the Console in Python', duration: '11:25' },
          { title: 'String Manipulation and Code Intelligence', duration: '09:13' },
          { title: 'The Python Input Function', duration: '12:35' },
          { title: 'Python Variables', duration: '13:02' }
        ]
      }
    ]
  };

  // Now check enrollment and cart status after course is defined
  const isAlreadyEnrolled = enrolledCourses.some(c => c.id === course.id) || false;
  const isInCart = cartCourses.some(c => c.id === course.id) || false;

  const handleEnroll = () => {
    alert('Redirecting to enrollment page...');
  };

  const handleAddToCart = () => {
    if (!isAlreadyEnrolled && !isInCart) {
      const updatedCart = [...cartCourses, course];
      updateCartCourses(updatedCart);
      alert('Added to cart successfully!');
    }
  };

  const handleBuyNow = () => {
    alert('Redirecting to checkout...');
  };

  const handleCouponApply = () => {
    if (couponCode.trim()) {
      alert(`Coupon "${couponCode}" applied successfully!`);
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: course.subtitle,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gray-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-lg md:text-xl font-semibold">{course.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {course.bestseller && (
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    Bestseller
                  </span>
                )}
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 font-semibold">{course.rating}</span>
                  <span className="ml-1 text-gray-600">({course.totalRatings.toLocaleString()} ratings)</span>
                </div>
                <span className="text-gray-600">{course.students.toLocaleString()} students</span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-gray-700 text-lg mb-6">{course.subtitle}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  Created by <span className="text-purple-600 ml-1">{course.instructor}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Last updated {course.lastUpdated}
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  {course.languages.join(', ')}
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.whatYouLearn.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Course content</h2>
                <button className="text-purple-600 text-sm hover:underline">
                  Expand all sections
                </button>
              </div>
              <p className="text-gray-600 mb-4">
                {course.sections} sections • {course.lectures} lectures • {course.duration} total length
              </p>
              
              {course.courseContent.map((section, index) => (
                <div key={index} className="border rounded-lg mb-4">
                  <button
                    className="w-full p-4 text-left hover:bg-gray-50 flex justify-between items-center"
                    onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                  >
                    <div>
                      <h3 className="font-medium">
                        Day {section.day} - {section.title}
                      </h3>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span>{section.lectures} lectures • {section.duration}</span>
                      {expandedSection === index ? (
                        <ChevronUp className="h-4 w-4 ml-2" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-2" />
                      )}
                    </div>
                  </button>
                  
                  {expandedSection === index && (
                    <div className="border-t">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="p-3 border-b last:border-b-0 flex justify-between items-center hover:bg-gray-50">
                          <div className="flex items-center">
                            <Play className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm">{lesson.title}</span>
                            {lesson.preview && (
                              <span className="ml-2 text-purple-600 text-xs">Preview</span>
                            )}
                          </div>
                          <span className="text-sm text-gray-600">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* This Course Includes */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">This course includes:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.courseIncludes.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <item.icon className="h-5 w-5 mr-3 text-gray-600" />
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Reviews */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Student Reviews</h2>
              <div className="space-y-4">
                {course.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
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
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              {/* Course Preview Card */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <button className="bg-white rounded-full p-4 hover:bg-gray-100 transition-colors">
                      <Play className="h-6 w-6 text-gray-800" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    Preview this course
                  </div>
                </div>

                <div className="p-6">
                  {/* Tabs */}
                  <div className="flex mb-4 border-b">
                    {['Enroll Now'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`flex-1 py-2 text-center font-medium ${
                          selectedTab === tab
                            ? 'text-purple-600 border-b-2 border-purple-600'
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {course.premium && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center text-purple-700 text-sm">
                        <Award className="h-4 w-4 mr-2" />
                        This Premium course is included in plans
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="font-bold text-lg mb-2">Subscribe to LearnoHub's top courses</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Get this course, plus 26,000+ of our top-rated courses, with Personal Plan.
                    </p>
                    <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors mb-2">
                      Start subscription
                    </button>
                    <p className="text-center text-sm text-gray-600">
                      Starting at {course.monthlyPrice} per month<br />
                      Cancel anytime
                    </p>
                  </div>

                  <div className="text-center mb-4">
                    <span className="text-gray-500">or</span>
                  </div>

                  <div className="mb-4">
                    <div className="text-3xl font-bold text-center mb-4">{course.price}</div>
                    
                    <div className="space-y-2">
                      <button
                        onClick={handleAddToCart}
                        className={`w-full border-2 py-3 px-4 rounded-lg font-semibold transition-colors ${
                          isAlreadyEnrolled
                            ? 'border-green-600 text-green-600 bg-green-50 cursor-not-allowed'
                            : isInCart
                            ? 'border-yellow-500 text-yellow-500 bg-yellow-50 cursor-not-allowed'
                            : 'border-purple-600 text-purple-600 hover:bg-purple-50'
                        }`}
                        disabled={isAlreadyEnrolled || isInCart}
                      >
                        {isAlreadyEnrolled
                          ? 'Enrolled'
                          : isInCart
                          ? 'In Cart'
                          : 'Add to Cart'}
                      </button>
                      <button
                        onClick={handleBuyNow}
                        className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                      >
                        Buy now
                      </button>
                    </div>

                    <div className="flex justify-center mt-3">
                      <button
                        onClick={toggleWishlist}
                        className={`p-2 rounded-full border ${
                          isWishlisted
                            ? 'text-red-500 border-red-500 bg-red-50'
                            : 'text-gray-500 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <div className="text-center text-sm text-gray-600 space-y-1 mb-4">
                    <p>30-Day Money-Back Guarantee</p>
                    <p>Full Lifetime Access</p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <button onClick={handleShare} className="text-purple-600 hover:underline flex items-center text-sm">
                      <Share className="h-4 w-4 mr-1" />
                      Share
                    </button>
                    <button className="text-purple-600 hover:underline flex items-center text-sm">
                      <Gift className="h-4 w-4 mr-1" />
                      Gift this course
                    </button>
                    <button className="text-purple-600 hover:underline flex items-center text-sm">
                      <Tag className="h-4 w-4 mr-1" />
                      Apply Coupon
                    </button>
                  </div>

                  {/* Coupon Section */}
                  <div className="border-t pt-4">
                    <div className="flex items-center mb-2">
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        KEEPLEARNING is applied
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mb-3">Udemy coupon</div>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Enter Coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        onClick={handleCouponApply}
                        className="bg-purple-600 text-white px-4 py-2 rounded-r-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <Footer />
     </>
  );
};

export default Trackdetails;