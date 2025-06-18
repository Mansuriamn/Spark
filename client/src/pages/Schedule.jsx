import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa'; 

function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); 

  const scheduleEvents = {
    '2025-06-01': [{ time: '10:00 AM', title: 'Web Development Basics - Q&A' }],
    '2025-06-03': [{ time: '02:00 PM', title: 'App Development - Debugging Session' }],
    '2025-06-05': [{ time: '09:00 AM', title: 'Data Science - Project Review' }],
    '2025-06-10': [{ time: '01:00 PM', title: 'Advanced React Hooks Live Session' }], 
  };

  const currentDayEvents = scheduleEvents[selectedDate] || [];

  return (
    <div className="container mx-auto py-8 md:py-12 space-y-8 md:space-y-12">
      <section className="bg-white rounded-xl shadow-lg p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">Your Schedule</h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Manage your classes, live sessions, and study times.
        </p>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Calendar/Date Picker (Simplified) */}
          <div className="md:w-1/3 bg-purple-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <FaCalendarAlt className="text-purple-600" />
              <span>Select Date</span>
            </h2>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-4">
              Use the date picker to see your schedule for a specific day.
            </p>
          </div>

         
          <div className="md:w-2/3 bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Events for {new Date(selectedDate).toDateString()}
            </h2>
            {currentDayEvents.length > 0 ? (
              <ul className="space-y-4">
                {currentDayEvents.map((event, index) => (
                  <li key={index} className="bg-white p-4 rounded-md shadow-sm border border-purple-100">
                    <p className="font-semibold text-gray-800">{event.time} - {event.title}</p>
                   
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 italic">No events scheduled for this day.</p>
            )}
          </div>
        </div>

        
      </section>
    </div>
  );
}

export default SchedulePage;