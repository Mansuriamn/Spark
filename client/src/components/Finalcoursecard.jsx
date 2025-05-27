import React from "react";
import { FaCode, FaDatabase, FaAndroid } from "react-icons/fa";
import { FiShare2, FiBookmark } from "react-icons/fi";
import { BsPlayCircle } from "react-icons/bs";

const tracks = [
  {
    icon: <FaCode className="text-pink-500 text-xl" />,
    title: "Front-End",
    description: "Front-end development focuses on the user interface and user experience, using HTML, CSS, and JavaScript frameworks.",
    courses: 6,
    lessons: 18,
    duration: "25 hr, 30 minutes",
  },
  {
    icon: <FaDatabase className="text-yellow-500 text-xl" />,
    title: "Back-End",
    description: "Back-end development involves server-side logic, databases, and application integration, using languages like Node.js, Python, or Java.",
    courses: 5,
    lessons: 15,
    duration: "22 hr, 10 minutes",
  },
  {
    icon: <FaAndroid className="text-green-500 text-xl" />,
    title: "Android",
    description: "Android development focuses on building applications for Android devices using Java, Kotlin, and Android Studio.",
    courses: 4,
    lessons: 12,
    duration: "19 hr, 45 minutes",
  },
];

const TrackCard = ({ icon, title, description, courses, lessons, duration }) => (
  <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-sm hover:shadow-lg transition">
    <div className="relative h-48 w-full bg-gray-200 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
      <img
        src="https://images.unsplash.com/photo-1518770660439-4636190af475"
        alt="Track"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
      />
      <BsPlayCircle className="text-white text-4xl relative z-10" />
    </div>
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="flex items-center gap-3 text-gray-500">
        <FiShare2 className="cursor-pointer" />
        <FiBookmark className="cursor-pointer"  />
      </div>
    </div>
    <p className="text-sm text-gray-600 mb-4">{description}</p>
    <div className="flex justify-between text-sm text-gray-700 font-medium">
      <span>{courses} Courses</span>
      <span>{lessons} Lessons</span>
      <span>{duration}</span>
    </div>
  </div>
);

const TrackList = () => (
  <div className="py-7 px-4 min-h-screen">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Our Tracks</h2>
    <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
      Develop your mind and skills with our intensive tracks covering all essential development areas.
    </p>
    <div className="flex justify-center gap-8">
      {tracks.map((track, index) => (
        <TrackCard key={index} {...track} />
      ))}
    </div>
  </div>
);

export default TrackList;
