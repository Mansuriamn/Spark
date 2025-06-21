
import React, { useState } from 'react';
import { Play, Clock, CheckCircle, User, Calendar, TrendingUp, BookOpen, Award, Video } from 'lucide-react';
import Footer from './Footer';

const VideoDashboard = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');

  const videoSections = [
    {
      id: 1,
      title: "Getting Started",
      lessons: 4,
      duration: "27min",
      progress: 100,
      videos: [
        { id: 1, title: "Introduction to Data Science", duration: "8:30", completed: true },
        { id: 2, title: "Setting up Environment", duration: "6:45", completed: true },
        { id: 3, title: "Course Overview", duration: "7:20", completed: true },
        { id: 4, title: "Resources & Materials", duration: "4:25", completed: true }
      ]
    },
    {
      id: 2,
      title: "Python Programming Language",
      lessons: 8,
      duration: "1hr 24min",
      progress: 75,
      videos: [
        { id: 5, title: "Python Basics", duration: "12:30", completed: true },
        { id: 6, title: "Variables and Data Types", duration: "10:15", completed: true },
        { id: 7, title: "Operators", duration: "8:45", completed: true },
        { id: 8, title: "String Manipulation", duration: "15:20", completed: false },
        { id: 9, title: "Lists and Tuples", duration: "13:40", completed: false },
        { id: 10, title: "Dictionaries", duration: "11:25", completed: false },
        { id: 11, title: "Python Functions", duration: "9:30", completed: false },
        { id: 12, title: "Error Handling", duration: "12:35", completed: false }
      ]
    },
    {
      id: 3,
      title: "Python Control Flow",
      lessons: 3,
      duration: "49min",
      progress: 33,
      videos: [
        { id: 13, title: "If Statements", duration: "16:20", completed: true },
        { id: 14, title: "Loops", duration: "18:40", completed: false },
        { id: 15, title: "Advanced Control Flow", duration: "14:00", completed: false }
      ]
    },
    {
      id: 4,
      title: "Data Structures in Python",
      lessons: 9,
      duration: "2hr 9min",
      progress: 22,
      videos: [
        { id: 16, title: "Introduction to Data Structures", duration: "12:45", completed: true },
        { id: 17, title: "Working with Arrays", duration: "15:30", completed: true },
        { id: 18, title: "Linked Lists", duration: "18:20", completed: false },
        { id: 19, title: "Stacks and Queues", duration: "16:40", completed: false },
        { id: 20, title: "Trees", duration: "22:15", completed: false },
        { id: 21, title: "Hash Tables", duration: "14:35", completed: false },
        { id: 22, title: "Graphs", duration: "19:25", completed: false },
        { id: 23, title: "Algorithm Complexity", duration: "13:50", completed: false },
        { id: 24, title: "Performance Optimization", duration: "16:00", completed: false }
      ]
    }
  ];

  const stats = {
    totalHours: 99,
    completedLessons: 12,
    inProgress: 8,
    upcoming: 14,
    overallProgress: 64
  };

  const recentActivity = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 1.8 },
    { day: 'Wed', hours: 3.2 },
    { day: 'Thu', hours: 2.1 },
    { day: 'Fri', hours: 4.2 },
    { day: 'Sat', hours: 3.8 },
    { day: 'Sun', hours: 2.9 }
  ];

  const maxHours = Math.max(...recentActivity.map(day => day.hours));

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Complete Data Science Bootcamp
                </h1>
                <p className="text-gray-600 text-lg">
                  Master the theory, practice, and math behind Data Science, Machine Learning, Deep Learning, NLP
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-medium">4.6 Rating</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">80,397 Students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-6 mb-8 border-b border-gray-200">
            {['overview', 'progress', 'schedule'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSection(tab)}
                className={`pb-4 px-2 text-sm font-medium capitalize transition-colors ${activeSection === tab
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            <div className="lg:col-span-3">
              {activeSection === 'overview' && (
                <div className="space-y-6">


                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Video Section */}
                    <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center relative">

                      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

                      <div className="w-full aspect-video rounded overflow-hidden mb-0 z-10">
                        <iframe
                          src="https://www.youtube.com/embed/rjfchLPJ3m8"
                          title='loading'
                          allowFullScreen
                          className="w-full h-full rounded"
                        ></iframe>
                      </div>

                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">Current Lesson: Python Basics</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>15:45 remaining</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '79%' }}></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Progress: 79%</span>
                        <span>Next: Variables and Data Types</span>
                      </div>
                    </div>
                  </div>

                  {/*course*/}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
                    {videoSections.map((section) => (
                      <div key={section.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="bg-purple-100 rounded-lg p-2">
                                <BookOpen className="w-5 h-5 text-purple-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  Section {section.id}: {section.title}
                                </h3>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                  <span>{section.lessons} lessons</span>
                                  <span>{section.duration}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-purple-600 mb-1">
                                {section.progress}%
                              </div>
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${section.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          {/*video*/}
                          <div className="space-y-2">
                            {section.videos.map((video) => (
                              <div
                                key={video.id}
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                                onClick={() => setSelectedVideo(video)}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className={`p-2 rounded-lg ${video.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                                    {video.completed ? (
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <Play className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">{video.title}</div>
                                    <div className="text-sm text-gray-500">{video.duration}</div>
                                  </div>
                                </div>
                                {video.completed && (
                                  <div className="text-green-600 text-sm font-medium">Completed</div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'progress' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6">Learning Progress</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                          <CheckCircle className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{stats.completedLessons}</div>
                        <div className="text-sm text-gray-500">Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-3">
                          <Clock className="w-8 h-8 text-orange-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{stats.inProgress}</div>
                        <div className="text-sm text-gray-500">In Progress</div>
                      </div>
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
                          <Video className="w-8 h-8 text-gray-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{stats.upcoming}</div>
                        <div className="text-sm text-gray-500">Upcoming</div>
                      </div>
                    </div>

                    {/*chart*/}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-4">Weekly Activity</h3>
                      <div className="flex items-end space-x-2 h-40">
                        {recentActivity.map((day, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div
                              className="w-full bg-purple-600 hover:bg-purple-500 rounded-t-lg transition-all duration-500"
                              style={{ height: `${(day.hours / maxHours) * 100}%`, minHeight: '20px' }}
                            ></div>
                            <div className="text-xs text-gray-500 mt-2">{day.day}</div>
                            <div className="text-xs font-medium text-gray-700">{day.hours}h</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'schedule' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6">Learning Schedule</h2>
                    <div className="space-y-4">
                      <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-blue-900">Today's Session</h3>
                          <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">13:00 - 14:00</span>
                        </div>
                        <p className="text-blue-800">Python Control Flow - Advanced Topics</p>
                        <div className="flex items-center mt-2 text-sm text-blue-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>60 minutes</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-700">Upcoming Sessions</h4>
                        {[
                          { time: "15:00 - 16:30", title: "Data Structures Introduction", date: "Today" },
                          { time: "10:00 - 11:00", title: "Functions in Python", date: "Tomorrow" },
                          { time: "14:00 - 15:30", title: "Error Handling", date: "Wednesday" }
                        ].map((session, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900">{session.title}</h4>
                                <p className="text-sm text-gray-500">{session.date} • {session.time}</p>
                              </div>
                              <Calendar className="w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/*sidebar */}
            <div className="space-y-6">
              {/*Overall Progress*/}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Overall Progress</h3>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{stats.overallProgress}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-purple-600 h-3 rounded-full transition-all duration-700"
                      style={{ width: `${stats.overallProgress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 text-center">
                  {stats.completedLessons} of 34 lessons completed
                </div>
              </div>

              {/*quick*/}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Course Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Total Duration</span>
                    </div>
                    <span className="font-medium">{stats.totalHours} hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Video className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Total Lectures</span>
                    </div>
                    <span className="font-medium">429</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Skill Level</span>
                    </div>
                    <span className="font-medium">All Levels</span>
                  </div>
                </div>
              </div>

              {/*achivement*/}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-yellow-100 rounded-full p-2">
                    <Award className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-yellow-900">Achievement Unlocked!</div>
                    <div className="text-sm text-yellow-700">Python Fundamentals Master</div>
                  </div>
                </div>
                <div className="text-xs text-yellow-600">
                  Completed all basic Python programming lessons
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default VideoDashboard;