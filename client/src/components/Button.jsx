import React from 'react'

export default function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative px-12 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <span className="relative z-10">{label}</span>
    </button>
  )
}
