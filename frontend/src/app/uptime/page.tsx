'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

// Mock data
const mockData = [
  { timestamp: '10:00', status: 'up', apiName: 'Google' },
  { timestamp: '11:05', status: 'up', apiName: 'Google' },
  { timestamp: '12:10', status: 'up', apiName: 'YouTube' },
  { timestamp: '13:15', status: 'up', apiName: 'YouTube' },
  { timestamp: '14:20', status: 'down', apiName: 'GitHub' },
  { timestamp: '15:25', status: 'down', apiName: 'GitHub' },
  { timestamp: '1630', status: 'up', apiName: 'Google' },
  { timestamp: '17:35', status: 'down', apiName: 'YouTube' },
  { timestamp: '18:40', status: 'up', apiName: 'GitHub' },
];

const UptimeAnalyticsPage = () => {
  const timestamps = mockData.map((d) => d.timestamp);
  const statuses = mockData.map((d) => (d.status === 'up' ? 1 : 0));

  const totalUp = statuses.filter((s) => s === 1).length;
  const totalDown = statuses.filter((s) => s === 0).length;

  const apiNames = [...new Set(mockData.map((d) => d.apiName))];
  const uptimePerApi = apiNames.map((api) => {
    const apiData = mockData.filter((d) => d.apiName === api);
    const upCount = apiData.filter((d) => d.status === 'up').length;
    return Math.round((upCount / apiData.length) * 100);
  });

  return (
    <div className="p-6 space-y-12 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold">📈 Uptime Analytics</h1>

      {/* Line Chart */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-md">
        <h2 className="text-xl mb-2">Uptime Over Time</h2>
       <Line
        data={{
          labels: timestamps,
          datasets: [
            {
              label: 'Uptime (1 = Up, 0 = Down)',
              data: statuses,
              borderColor: 'rgb(34, 197, 94)', // Tailwind green-500
              backgroundColor: 'rgba(34, 197, 94, 0.3)',
              borderWidth: 2,
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true },
          },
          elements: {
            line: { tension: 0 }, // Sharp rise and fall
            point: { radius: 4 },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 1,
              ticks: {
                callback: (value) => (value === 1 ? 'Up' : 'Down'),
              },
            },
          },
        }}
      />
      </div>


      {/* Pie Chart */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-md max-w-md">
        <h2 className="text-xl mb-2">Overall Uptime vs Downtime</h2>
        <Pie
          data={{
            labels: ['Uptime', 'Downtime'],
            datasets: [
              {
                data: [totalUp, totalDown],
                backgroundColor: ['green', 'red'],
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default UptimeAnalyticsPage;
