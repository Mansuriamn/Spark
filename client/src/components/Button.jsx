import React from 'react'

export default function Button({ label, onClick, className }) {
  return (
   <button onClick={onClick} className={`group relative bg-purple-600 hover:bg-purple-700 ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 `}></div>
      <span className="relative z-10">{label}</span>
    </button>
  )
}
