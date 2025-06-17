<<<<<<< Updated upstream
import React, { useState } from 'react';
import { UserMinus } from 'lucide-react';

export default function StudentPage() {
  const [courses, setCourses] = useState([
    {
      id: 2,
      title: 'Intro to AI',
      price: 200,
      enrolledStudents: [
        { id: 6, name: 'Anita Desai', email: 'anita@email.com', enrolledDate: '2024-02-01', progress: 82 },
        { id: 7, name: 'Rajesh Mehta', email: 'rajesh@email.com', enrolledDate: '2024-02-03', progress: 65 },
        { id: 8, name: 'Kavya Nair', email: 'kavya@email.com', enrolledDate: '2024-02-05', progress: 91 }
      ]
    }
  ]);

 
  const removeStudent = (courseId, studentId) => {
    setCourses(prevCourses =>
      prevCourses.map(course => {
        if (course.id === courseId) {
          const updatedStudents = course.enrolledStudents.filter(s => s.id !== studentId);
          return {
            ...course,
            enrolledStudents: updatedStudents
          };
        }
        return course;
      })
    );
  };

  const course = courses[0]; 

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Enrolled Students</h2>

      {course.enrolledStudents.map(student => (
        <div key={student.id} className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-4 ">
          <div>
            <h4 className="font-semibold text-purple-600">{student.name}</h4>
            <p className="text-gray-600 text-sm">({student.email})</p>
            <p className="text-sm text-gray-500">Enrolled: {new Date(student.enrolledDate).toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-700 font-semibold">Progress: {student.progress}%</p>
            <button
              className="ml-3 bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg"
              onClick={() => removeStudent(course.id, student.id)}
              title="Remove student"
            >
              <UserMinus className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
=======
import React from "react";



const EnrolledStudentsList = ({ courses }) => (
  <div className="max-w-2xl mx-auto py-8">
    <h2 className="text-2xl font-bold mb-6 text-center">Enrolled Students by Course</h2>
    {courses && courses.length > 0 ? (
      courses.map(course => (
        <div key={course._id} className="mb-8 bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
          {course.students && course.students.length > 0 ? (
            <ul className="list-disc pl-6">
              {course.students.map(student => (
                <li key={student._id || student.email} className="mb-1">
                  <span className="font-medium">{student.name || "Unnamed Student"}</span>
                  {student.email && <span className="text-gray-500 ml-2">({student.email})</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No students enrolled.</p>
          )}
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500">No courses found.</p>
    )}
  </div>
);

export default EnrolledStudentsList;
>>>>>>> Stashed changes
