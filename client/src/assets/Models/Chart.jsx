
// components/Chart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const data = {
    labels: ['Courses', 'Prototypes', 'Learning', 'Community Score'],
    datasets: [
      {
        data: [20, 7, 25, 40],
        backgroundColor: [
          'rgba(59,130,246,0.6)',    // blue
          'rgba(34,197,94,0.6)',     // green
          'rgba(234,179,8,0.6)',     // yellow
          'rgba(239,68,68,0.6)',     // red
        ],
        borderColor: 'rgba(255,255,255,0.8)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  return (
    <div className="w-[50%] h-[300px] mx-auto mb-10">
      <Pie data={data} options={options} />
    </div>
  );
};

export default Chart;
