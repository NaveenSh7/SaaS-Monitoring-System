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

type Props = {
  data: ApiEvent[];
};

export default function ApiStatusChart({ data }: Props) {
  const [range, setRange] = useState<'24h' | '7d'>('24h');
  const now = moment();

  if (!data || data.length === 0) {
    return <div className="text-zinc-400 text-sm italic">No uptime data available</div>;
  }

  const rangeStart = range === '24h'
    ? now.clone().subtract(24, 'hours')
    : now.clone().subtract(7, 'days');

  const events = data
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
        label: `API ${data[0].api_id} Status`,
        data: points,
        borderColor: '#10b981',
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
          callback: function (value: string | number) {
            if (value === 1) return 'Up';
            if (value === 0) return 'Down';
            return '';
          },
        },
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
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-end">
        <select
          className="border px-2 py-1 rounded bg-zinc-900 text-white"
          value={range}
          onChange={(e) => setRange(e.target.value as '24h' | '7d')}
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
        </select>
      </div>

      <div className="w-full">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
