import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ActivityCard = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Hours spent',
        data: [3.5, 2.5, 4, 5, 5.2, 4.8, 4.4],
        backgroundColor: '#C084FC',
        borderRadius: 8,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        grid: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-full">
      <h2 className="text-lg font-bold mb-2">Activity</h2>
      <div className="h-72">
        <Bar data={data} options={options} />
      </div>
      <div className="mt-4 text-sm text-gray-600 space-y-1">
        <p>Course 12 : Java Essentials— 1.5 h</p>
        <p>Course 8 : The Python Series — 6.8 h</p>
        <p>Course 9 : Java Essentials— 4.2 h</p>
        <p>Course 1 : Java Essentials — 2.5 h</p>
      </div>
    </div>
  );
};

export default ActivityCard;
