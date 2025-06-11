import axios from 'axios';
import React, { useEffect, useState } from 'react';

function LiveSessionsPage() {
  const liveSessions = [
    {
      id: 1,
      title: 'Advanced React Hooks',
      instructor: 'Dr. Jane Doe',
      date: 'June 10, 2025',
      time: '14:00 IST',
      status: 'Upcoming',
      description: 'Dive deep into custom hooks and context API.',
      link: '#'
    },
    {
      id: 2,
      title: 'Python for Data Science',
      instructor: 'Prof. Alex Lee',
      date: 'June 12, 2025',
      time: '11:00 IST',
      status: 'Upcoming',
      description: 'An interactive session on Pandas and NumPy.',
      link: '#'
    },
    {
      id: 3,
      title: 'Web Security Basics',
      instructor: 'Eng. Sarah Connor',
      date: 'May 28, 2025',
      time: '16:00 IST',
      status: 'Ended',
      description: 'Understanding common web vulnerabilities.',
      link: '#'
    },
  ];
  const [sessionData,setSessionData]=useState([]);
  useEffect(()=>{
    axios.get("").then((res)=>{
      setSessionData(res.data);
    }).catch((err)=>{
      console.error("Error feching live sessions:",err);
    })
  },[])

  return (
    <div className="container mx-auto py-8 md:py-12 space-y-8 md:space-y-12">
      <section className="bg-white rounded-xl shadow-lg p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">Live Sessions</h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Join our expert-led live sessions to enhance your learning.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveSessions.map(session => (
            <div key={session.id} className="bg-purple-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{session.title}</h3>
              <p className="text-gray-600 text-sm mb-1">Instructor: {session.instructor}</p>
              <p className="text-gray-600 text-sm mb-3">
                {session.date} at {session.time}
              </p>
              <p className="text-gray-700 text-sm mb-4">{session.description}</p>
              <div className="flex justify-between items-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    session.status === 'Upcoming' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {session.status}
                </span>
                {session.status === 'Upcoming' && (
                  <a href={session.link} className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                    Join Now
                  </a>
                )}
                {session.status === 'Ended' && (
                  <a href={session.link} className="bg-gray-400 text-white py-2 px-4 rounded-lg cursor-not-allowed">
                    View Recording
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default LiveSessionsPage;