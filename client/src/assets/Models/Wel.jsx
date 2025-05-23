import React from 'react'

const welcomeback = () => {
  return (
    <div class="bg-black text-white p-6 rounded-2xl flex justify-between items-center w-full max-w-6xl mx-auto mt-3">
  <div>
    <h1 class="text-2xl font-bold">Welcome back, Pragati!</h1>
    <p class="mt-2 text-base">
      You've completed <span class="font-semibold">75%</span> of your current course. Keep learning<br />
      track your progress.
    </p>
  </div>
  <button class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg">
    Continue Learning
  </button>
</div>
  )
}

export default welcomeback