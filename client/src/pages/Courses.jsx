import React, { useEffect, useState } from 'react';
import CourseCard from '../assets/Models/CourseCard';
import CourseCategory from '../assets/Models/CourseCategory';
import Instructors from '../assets/Models/Instructor';
import PriceFilter from '../assets/Models/PriceFilter';
import ReviewFilter from '../assets/Models/ReviewFilter';
import LevelFilter from '../assets/Models/LeaveFilter';
import { FiSearch } from "react-icons/fi";
import Pagination from '../assets/Models/Pagination';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/style/Courses.css'

export default function Courses() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: [],
    instructor: [],
    price: "All",
    review: null,
    level: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10; // Number of courses to display per page

  //courses fetched from the API
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  

  // Effect to fetch courses from the API when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/courses');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        setAllCourses(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();




  }, []); // Empty dependency array ensures this runs only once on mount

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1); // Reset to the first page whenever filters change
  };

  // Handles page changes from the Pagination component
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };




  const filteredCourses = allCourses.filter((course) => {
    let courseCategoryId = '';
    let courseCategoryName = '';

    if (course.category) {
      if (typeof course.category === 'object') {
        courseCategoryId = course.category._id || course.category.id || '';
        courseCategoryName = course.category.name || '';
      } else {
        courseCategoryId = course.category;
        courseCategoryName = course.category;
      }
      console.log('courseCategoryId:', courseCategoryId, 'courseCategoryName:', courseCategoryName);
    }

    let courseInstructor = '';
    if (course.instructor) {
      if (typeof course.instructor === 'object') {
        courseInstructor = course.instructor._id || course.instructor.id || '';
      } else {
        courseInstructor = course.instructor;
      }
    }

    const courseLevel = course.level || (course.difficulty && course.difficulty.level);


    const isFree = course.price === 0 || course.price === "Free";
    const isPaid = !isFree;

    const courseRating = Number(course.rating) || 0;

    const matchesSearch = course.title?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
  filters.category.length === 0 ||
  filters.category.some(
    (cat) =>
      courseCategoryName && String(cat).toLowerCase() === String(courseCategoryName).toLowerCase()
  );
    const matchesInstructor = filters.instructor.length === 0 || filters.instructor.includes(courseInstructor);
    const matchesPrice =
      filters.price === "All" ||
      (filters.price === "Free" && isFree) ||
      (filters.price === "Paid" && isPaid);
    const matchesReview = filters.review === null || courseRating >= filters.review;
    const matchesLevel = filters.level.length === 0 || filters.level.includes(courseLevel);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesInstructor &&
      matchesPrice &&
      matchesReview &&
      matchesLevel
    );
  });

  // Determine which courses to display on the current page
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  if (currentCourses) {
    currentCourses.map((v, i) => {
      console.log(v);
    })
  }

  <div className="md:hidden flex justify-end mb-4 px-4">
    <button
      onClick={() => setShowMobileFilters(true)}
      className="p-2 rounded bg-white border shadow"
      aria-label="Show filters"
    >
      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>

  return (
    <>


      <div className="md:hidden flex justify-end  px-4 bg-gray-100">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="p-2 rounded bg-white border shadow"
          aria-label="Show filters"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center bg-gray-100 border-gray-200 course_op_card ">
        {/* Left Sidebar for Filters */}
        <div className="Options hidden md:block">
          <CourseCategory filters={filters} onChange={handleFilterChange} />
          <Instructors filters={filters} onChange={handleFilterChange} />
          <PriceFilter filters={filters} onChange={handleFilterChange} />
          <ReviewFilter filters={filters} onChange={handleFilterChange} />
          <LevelFilter filters={filters} onChange={handleFilterChange} />
        </div>
        {/* Mobile Filters Drawer */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 bg-opacity-40 flex">
            <div className="bg-white w-4/5 max-w-xs h-full p-6 shadow-lg flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">Filters</span>
                <button onClick={() => setShowMobileFilters(false)} className="text-gray-500 text-2xl">&times;</button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <CourseCategory filters={filters} onChange={handleFilterChange} />
                <Instructors filters={filters} onChange={handleFilterChange} />
                <PriceFilter filters={filters} onChange={handleFilterChange} />
                <ReviewFilter filters={filters} onChange={handleFilterChange} />
                <LevelFilter filters={filters} onChange={handleFilterChange} />
              </div>

              <button
                onClick={() => setShowMobileFilters(false)}
                className="mt-6 w-full bg-purple-600 text-white py-2 rounded sticky bottom-0"
              >
                Apply Filters
              </button>
            </div>

            <div className="flex-1" onClick={() => setShowMobileFilters(false)} />
          </div>
        )}

        {/* Main Content Area for Course Listings */}
        <div className="p-8 flex-grow">
          <div className='flex flex-col justify-between items-center px-6 py-4'>
            <div>
              <h1 className="text-3xl font-bold mb-3">All Courses</h1>
            </div>
            {/* Search Input Field */}
            <div className="relative w-72 mb-5">
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1); // Reset to first page on new search
                }}
                className="w-full pl-10 p-2 border rounded"
              />
              <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Course Listing Area */}
          <div className="space-y-6 pl-4">
            {loading ? (
              <p className="text-gray-500 text-center text-lg mt-15">Loading courses...</p>
            ) : error ? (
              <p className="text-red-500 text-center text-lg mt-15">{error}</p>
            ) : currentCourses.length > 0 ? (
              currentCourses.map((course, i) => {
                if (!course) return null;
                return (
                  <div key={i}>
                    <div
                      key={i}
                      onClick={() => {
                        if (course.price === 0 || course.price === "Free") {
                          navigate(`/courses/${course._id || course.id}`);
                        } else {
                          navigate(`/paidcourses/${course._id || course.id}`);
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <CourseCard course={course} />
                    </div>
                  </div>
                );
              })
            ) : (
              // Message if no courses are found after loading/filtering
              <p className="text-gray-500 text-center text-lg mt-15">No results found</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className='mt-8 '>
            {filteredCourses.length > 0 && (
              <Pagination

                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}