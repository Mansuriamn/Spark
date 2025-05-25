import React ,{useState} from 'react';
import CourseCard from '../Models/CourseCard';
import CourseCategory from '../Models/CourseCategory';
import Instructors from '../Models/Instructor';
import PriceFilter from '../Models/PriceFilter';
import ReviewFilter from '../Models/ReviewFilter';
import LevelFilter from '../Models/LeaveFilter';
import coursesData from '../../assets/data/course.json';

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
     <div className='w-full h-max '><h1 className =' p-4 text-3xl font-bold  m-4'>All Courses</h1>
      <div className="flex">
      <div className="w-1/4 p-9 border-r space-y-4 ">
        <CourseCategory filters={filters} onChange={handleFilterChange} />
        <Instructors filters={filters} onChange={handleFilterChange} />
        <PriceFilter filters={filters} onChange={handleFilterChange} />
        <ReviewFilter filters={filters} onChange={handleFilterChange} />
        <LevelFilter filters={filters} onChange={handleFilterChange} />
      </div>
      <div className=" p-7 w-4xl">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex-1 space-y-6 pl-4">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
     </div>
    </>
  );
}

