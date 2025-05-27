import React ,{useState} from 'react';
import CourseCard from '../assets/Models/CourseCard';
import CourseCategory from '../assets/Models/CourseCategory';
import Instructors from '../assets/Models/Instructor';
import PriceFilter from '../assets/Models/PriceFilter';
import ReviewFilter from '../assets/Models/ReviewFilter';
import LevelFilter from '../assets/Models/LeaveFilter';
import coursesData from '../assets/data/course.json';
import { FiSearch } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";

export default function Courses() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: [],
    instructor: [],
    price: "All",
    review: null,
    level: [],
  });

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const filteredCourses = coursesData.filter((course) => {
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

  return (
    <>
     
      <div className="flex justify-center bg-gray-100 border-gray-200">
        
      <div className="w-1/4 p-10 border-r space-y-4 ">
        <CourseCategory filters={filters} onChange={handleFilterChange} />
        <Instructors filters={filters} onChange={handleFilterChange} />
        <PriceFilter filters={filters} onChange={handleFilterChange} />
        <ReviewFilter filters={filters} onChange={handleFilterChange} />
        <LevelFilter filters={filters} onChange={handleFilterChange} />
      </div>
      <div className="p-8">
  <div className='flex justify-between items-center px-6 py-4'>
    <div>
      <h1 className="text-3xl font-bold">All Courses</h1>
    </div>
    <div className="relative w-72 mb-">
    <input
      type="text"
      placeholder="Search courses..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full pl-10 p-2 border rounded"
    />
    <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
  </div>
  </div>

  <div className="flex-1 space-y-6 pl-4">
    {filteredCourses.map((course) => (
      <CourseCard key={course.id} course={course} />
    ))}
  </div>
</div>

    </div>
     
    </>
  );
}
