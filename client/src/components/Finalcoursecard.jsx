import React, { useState, useEffect } from "react";
import { FaCode, FaDatabase, FaAndroid } from "react-icons/fa";
import { FiShare2, FiBookmark } from "react-icons/fi";
import { BsPlayCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const iconMap = {
  "front-end": <FaCode className="text-pink-500 text-xl" />,
  "back-end": <FaDatabase className="text-yellow-500 text-xl" />,
  android: <FaAndroid className="text-green-500 text-xl" />,
};

const TrackCard = (course) => {
  const [courseData,setCourseData]=useState({});
  useEffect(()=>{
    if(course){
      setCourseData(course.course);
    }
 console.log(courseData)
  })
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/track/${courseData.title.toLowerCase()}`);
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    const shareUrl = window.location.origin + `/track/${courseData.title.toLowerCase()}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `Check out this track: ${courseData.title}`, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      }
      setShared(true);
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer p-4 max-w-sm w-full group"
    >
      <div className="relative h-48 w-full bg-gray-200 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
        <img
          src={courseData.pictureUrl}
          alt="Loading.."
          className="absolute top-0 left-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity"
        />
        <BsPlayCircle className="text-white text-4xl relative z-10" />
      </div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {iconMap[courseData.key]}
          <h3 className="text-lg font-semibold text-gray-800">{courseData.title}</h3>
        </div>
        <div className="flex items-center gap-3 text-gray-500 z-20" onClick={(e) => e.stopPropagation()}>
          <FiShare2
            onClick={handleShare}
            className={`cursor-pointer hover:text-blue-500 ${shared ? "text-blue-600" : ""}`}
            title="Share"
          />
          <FiBookmark
            onClick={() => setSaved(!saved)}
            className={`cursor-pointer hover:text-purple-500 ${saved ? "text-purple-600" : ""}`}
            title="Save"
          />
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">{courseData.description}</p>
      <div className="flex justify-between text-sm text-gray-700 font-medium">
        {/* <span>{courseData.courses} Courses</span>
        <span>{courseData.lessons} Lessons</span>
        <span>{courseData.duration}</span> */}
      </div>
    </div>
  );
};

const TrackList = () => {
  const count=0;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch("/api/courses");
        const data = await response.json();
        setCourses(data.data);
      } catch (error) {
        console.error("Error fetching tracks:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  return (
    <div className="py-12 px-4 min-h-screen bg-[#f8f9ff]">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Our Tracks</h2>
      <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
        Develop your mind and skills with our intensive tracks covering all essential development areas.
      </p>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="ml-4 text-gray-500">Loading tracks...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {courses.length > 0 ? (
            courses.slice(0, 6).map((course) => (
              <TrackCard key={course._id} course={course} />
            ))
          ) : (
            <p className="text-gray-500 text-center">No courses available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackList;

