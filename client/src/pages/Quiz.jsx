import React from 'react'
import Footer from '../components/Footer'

export default function Quiz() {
         const QuizeData={
         title: "Sample Quiz",
         level: "Beginner",
         description: "This is a sample quiz description.",
         }
  return (
    <>
    <div className="flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md w-1/2">
        <h1 className="text-2xl font-bold mb-4 text-center">Quiz</h1>
      <h2 className="text-xl">{QuizeData.title}</h2>
      <p className="text-gray-600">Level: {QuizeData.level}</p>
      <p className="text-gray-600">{QuizeData.description}</p>
    </div>
    {/* <Footer/> */}
    </>
  )
}
