import React from 'react'
import state from '../../constants'

const Progress = () => {
  return (
     <div className="px-20 py-10">
      <h2 className="text-3xl font-bold text-black mb-6">Progress Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {state.map((state, index) => (
          <div
            key={index}
            className="bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] rounded-lg p-6 flex flex-col items-start space-y-2 border border-gray-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition duration-300 ease-in-out"
          >
            <div className="flex items-center space-x-2">
              <span className="text-xl">{state.icon}</span>
              <span className="text-sm text-gray-500">{state.label}</span>
            </div>
            <div className="text-2xl font-medium text-gray-800">{state.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Progress;