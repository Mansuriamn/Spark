
import React, { useEffect, useState } from 'react';
import CourseCard from '../assets/Models/CourseCard'; // Ensure this path is correct
import CourseCategory from '../assets/Models/CourseCategory';
import Instructors from '../assets/Models/Instructor';
import PriceFilter from '../assets/Models/PriceFilter';
import ReviewFilter from '../assets/Models/ReviewFilter';
import LevelFilter from '../assets/Models/LeaveFilter';// Assuming your file is named LevelFilter.js/tsx
import { FiSearch } from "react-icons/fi";
import Pagination from '../assets/Models/Pagination'; // Ensure this path is correct
import Footer from '../components/Footer'; // Ensure this path is correct
import axios from 'axios';


export default function Courses() {
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

  // State to hold the courses fetched from the API
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  // Effect to fetch courses from the API when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true); // Set loading to true before fetching
      setError(null); // Clear any previous errors

      try {
        const res = await fetch('/api/courses'); // Make the API call to your backend
        if (!res.ok) { // Check if the HTTP response was successful
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json(); // Parse the JSON response

        // Assuming your API returns data in the format { data: [...] }
        // Adjust `data.data` if your API response structure is different (e.g., just `data`)
        setAllCourses(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
        setError('Failed to load courses. Please try again later.'); // User-friendly error message
      } finally {
        setLoading(false); // Set loading to false whether fetch succeeded or failed
      }
    };
    fetchCourses();




  }, []); // Empty dependency array ensures this runs only once on mount

  // Handles changes from filter components (e.g., category, instructor, price)
  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1); // Reset to the first page whenever filters change
  };

  // Handles page changes from the Pagination component
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filters the `allCourses` array based on current search term and selected filters
  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filters.category.length === 0 || filters.category.includes(course.category);
    const matchesInstructor = filters.instructor.length === 0 || filters.instructor.includes(course.instructor);
    const matchesPrice =
      filters.price === "All" ||
      (filters.price === "Free" && course.price === "Free") ||
      (filters.price === "Paid" && course.price !== "Free");
    const matchesReview = filters.review === null || course.review >= filters.review;
    const matchesLevel = filters.level.length === 0 || filters.level.includes(course.level);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesInstructor &&
      matchesPrice &&
      matchesReview &&
      matchesLevel
    );
  });

  // Calculate total pages for pagination based on filtered courses



  // Determine which courses to display on the current page
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  if (currentCourses) {
    currentCourses.map((v, i) => {
      console.log(v);
    })
  }



  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // You can adjust the breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      <div className="flex justify-center bg-gray-100 border-gray-200 course_op_card">
        {/* Left Sidebar for Filters */}
        {isMobile ? (
          <div>
            {/* Mobile view - show nothing or a message */}
          </div>
        ) : (
          <div className="w-1/4 p-10 border-r space-y-4 course_options">
            <CourseCategory filters={filters} onChange={handleFilterChange} />
            <Instructors filters={filters} onChange={handleFilterChange} />
            <PriceFilter filters={filters} onChange={handleFilterChange} />
            <ReviewFilter filters={filters} onChange={handleFilterChange} />
            <LevelFilter filters={filters} onChange={handleFilterChange} />
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
                    <CourseCard course={course} />
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
            {filteredCourses.length > 0 && ( // Only show pagination if there are courses to paginate
              <Pagination

                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>

        </div>
      </div>
      <Footer /> {/* Your footer component */}
    </>
  );
}