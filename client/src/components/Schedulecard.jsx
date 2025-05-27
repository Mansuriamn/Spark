import React from 'react'

const scheduleData = [
  {
    time: '10:30 – 12:00',
    title: 'Technical English for Beginners',
    level: 'Beginner',
    mentor: 'Kristin Watson',
  },
  {
    time: '13:00 – 14:00',
    title: 'English punctuation made easy',
    level: 'Advanced',
    mentor: 'Cody Fisher',
  },
];

const ScheduleCard = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col">
      <h2 className="text-lg font-bold mb-4">My schedule</h2>
      <div className="flex gap-4 overflow-x-auto">
        {scheduleData.map((item, idx) => (
          <div key={idx} className="min-w-[250px] bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-500">{item.time}</p>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-indigo-600">{item.level}</p>
            <p className="text-sm text-gray-500">Mentor: {item.mentor}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleCard;

