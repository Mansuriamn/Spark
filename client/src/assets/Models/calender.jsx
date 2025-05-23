import React from 'react';
import { FaClock, FaVideo, FaChalkboardTeacher, FaBriefcase } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";

const events = [
  {
    date: '15',
    day: 'MON',
    title: 'Advanced JavaScript Programming',
    by: 'David Miller',
    time: '3 A.M. - 5 A.M.',
    type: 'Live Session',
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    icon: <FaVideo />
  },
  {
    date: '17',
    day: 'WED',
    title: 'Advanced JavaScript Programming',
    by: 'David Miller',
    time: '3 A.M. - 5 A.M.',
    type: 'Webinar',
    color: 'text-purple-600',
    bg: 'bg-purple-100',
    icon: <FaChalkboardTeacher />
  },
  {
    date: '15',
    day: 'MON',
    title: 'Advanced JavaScript Programming',
    by: 'David Miller',
    time: '3 A.M. - 5 A.M.',
    type: 'Placement Drive',
    color: 'text-blue-500',
    bg: 'bg-blue-100',
    icon: <FaBriefcase />
  },
];

const UpcomingEvents = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl mx-auto border border-gray-200">
      <h2 className="text-2xl font-bold flex items-center mb-6">
        <span className="mr-2 text-black text-3xl"><SlCalender /></span>
        Upcoming Events
      </h2>

      {events.map((event, index) => (
        <div key={index} className="mb-6">
          <div className="flex justify-between items-start">
            {/* Date Box */}
            <div className="flex items-center w-20 h-20 flex-col justify-center bg-blue-100 rounded-md font-bold text-center">
              <span className="text-gray-800">{event.day}</span>
              <span className="text-xl text-gray-600">{event.date}</span>
            </div>

            {/* Event Info */}
            <div className="flex-1 ml-4">
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">By {event.by}</p>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <FaClock className="mr-1" /> {event.time}
              </div>
            </div>

            {/* Tag */}
            <div className={`flex items-center text-xs font-semibold px-3 py-1 rounded-full ${event.bg} ${event.color}`}>
              {event.icon}
              <span className="ml-1">{event.type}</span>
            </div>
          </div>
          {index !== events.length - 1 && <hr className="my-5 border-gray-200" />}
        </div>
      ))}

      <div className="text-center mt-8">
        <button className="bg-gray-100 text-gray-900  px-25 py-3 rounded-b-md text-sm hover:bg-gray-200">
            View All Events
          </button>
      </div>
    </div>
  );
};

export default UpcomingEvents;
