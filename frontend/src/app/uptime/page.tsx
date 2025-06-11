'use client';

import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';
import 'chartjs-adapter-moment';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { useState } from 'react';

ChartJS.register(TimeScale, LinearScale, LineElement, PointElement, Tooltip, Legend, CategoryScale);

type ApiEvent = {
  id: number;
  api_id: number;
  status: 'up' | 'down';
  latency: number | null;
  started_at: string;
  ended_at: string | null;
};

// type Props = {
//   data: ApiEvent[];
//   apiId: number;
//   range: '24h' | '7d'; // new prop
// };

const data = [
  {
    "id": 48,
    "api_id": 3,
    "status": "up",
    "latency": null,
    "started_at": "2025-06-10 16:25:09",
    "ended_at": null
  },
  {
    "id": 7,
    "api_id": 3,
    "status": "down",
    "latency": null,
    "started_at": "2025-06-09 14:50:49",
    "ended_at": "2025-06-09 15:09:10"
  },
  {
    "id": 9,
    "api_id": 6,
    "status": "down",
    "latency": 26,
    "started_at": "2025-06-09 14:51:22",
    "ended_at": "2025-06-09 15:09:31"
  },
  {
    "id": 11,
    "api_id": 3,
    "status": "up",
    "latency": 90,
    "started_at": "2025-06-09 15:09:10",
    "ended_at": "2025-06-09 15:11:10"
  },
  {
    "id": 13,
    "api_id": 3,
    "status": "down",
    "latency": 99,
    "started_at": "2025-06-09 15:11:10",
    "ended_at": "2025-06-09 15:11:30"
  },
  {
    "id": 12,
    "api_id": 6,
    "status": "up",
    "latency": 535,
    "started_at": "2025-06-09 15:09:31",
    "ended_at": "2025-06-10 15:05:44"
  },
  {
    "id": 15,
    "api_id": 6,
    "status": "down",
    "latency": 4021,
    "started_at": "2025-06-10 15:05:44",
    "ended_at": "2025-06-10 15:06:13"
  },
  {
    "id": 16,
    "api_id": 6,
    "status": "up",
    "latency": 2136,
    "started_at": "2025-06-10 15:06:13",
    "ended_at": null
  },
  {
    "id": 17,
    "api_id": 7,
    "status": "up",
    "latency": null,
    "started_at": "2025-06-10 15:56:23",
    "ended_at": "2025-06-10 15:56:54"
  },
  {
    "id": 18,
    "api_id": 7,
    "status": "down",
    "latency": null,
    "started_at": "2025-06-10 15:56:54",
    "ended_at": null
  },
  {
    "id": 14,
    "api_id": 3,
    "status": "up",
    "latency": 190,
    "started_at": "2025-06-09 15:11:30",
    "ended_at": "2025-06-10 16:00:39"
  },
  {
    "id": 19,
    "api_id": 3,
    "status": "down",
    "latency": null,
    "started_at": "2025-06-10 16:00:39",
    "ended_at": "2025-06-10 16:00:46"
  },
  {
    "id": 20,
    "api_id": 3,
    "status": "up",
    "latency": 149,
    "started_at": "2025-06-10 16:00:47",
    "ended_at": "2025-06-10 16:01:29"
  },
  {
    "id": 21,
    "api_id": 3,
    "status": "down",
    "latency": null,
    "started_at": "2025-06-10 16:01:29",
    "ended_at": "2025-06-10 16:01:36"
  },
  {
    "id": 22,
    "api_id": 3,
    "status": "up",
    "latency": 140,
    "started_at": "2025-06-10 16:01:37",
    "ended_at": "2025-06-10 16:02:14"
  },
  {
    "id": 23,
    "api_id": 3,
    "status": "down",
    "latency": null,
    "started_at": "2025-06-10 16:02:14",
    "ended_at": "2025-06-10 16:02:22"
  },
  {
    "id": 24,
    "api_id": 3,
    "status": "up",
    "latency": 163,
    "started_at": "2025-06-10 16:02:22",
    "ended_at": "2025-06-10 16:02:19"
  },
  {
    "id": 25,
    "api_id": 3,
    "status": "down",
    "latency": null,
    "started_at": "2025-06-10 16:02:20",
    "ended_at": "2025-06-10 16:02:27"
  },
  {
    "id": 26,
    "api_id": 3,
    "status": "up",
    "latency": 491,
    "started_at": "2025-06-10 16:02:27",
    "ended_at": "2025-06-10 16:09:05"
  }
]
const apiId =7;


export default function ApiStatusChart() {
    const [range, setRange] = useState<'24h' | '7d'>('24h');

  const now = moment();
  const rangeStart = range === '24h'
    ? now.clone().subtract(24, 'hours')
    : now.clone().subtract(7, 'days');
  // Filter and normalize entries
  const events = data
    .filter(e => e.api_id === apiId)
    .map(e => ({
      ...e,
      ended_at: e.ended_at || now.format('YYYY-MM-DD HH:mm:ss'),
    }))
    .filter(e => moment(e.ended_at!).isAfter(rangeStart));

  const points: { x: string; y: number }[] = [];

  events.forEach(e => {
    const status = e.status === 'up' ? 1 : 0;
    const start = moment(e.started_at).toISOString();
    const end = moment(e.ended_at!).toISOString();
    points.push({ x: start, y: status });
    points.push({ x: end, y: status });
  });

  points.sort((a, b) => moment(a.x).valueOf() - moment(b.x).valueOf());

  const chartData = {
    datasets: [
      {
        label: `API ${apiId} Status`,
        data: points,
        borderColor: '#10b981', // green
        backgroundColor: '#10b981',
        stepped: true,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'minute',
          tooltipFormat: 'HH:mm:ss',
        },
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        ticks: {
callback: (val: number) => {
  if (val === 1) return 'Up';
  if (val === 0) return 'Down';
  return '';
}        },
        min: 0,
        max: 1.2,
        title: {
          display: true,
          text: 'Status',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx: any) => (ctx.raw.y === 1 ? 'Up' : 'Down'),
        },
      },
    },
  };

  return (
    <div className='flex flex-row'>
      <div className="w-1/2 h-1/2 flex">
 <Line data={chartData} options={chartOptions} />

  <div className='mr-10  mt-1 relative right-32 '> 
       <select
          className="border px-2 py-1 rounded "
          value={range}
          onChange={(e) => setRange(e.target.value as '24h' | '7d')}
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
        </select></div>
           
    </div>
      </div>
     

     
  );
}
