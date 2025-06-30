import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useMemo } from "react";
import 'chartjs-adapter-date-fns';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
  Legend
);

type UptimeStampData = {
  status: "up" | "down";
  started_at: string;
  ended_at: string | null;
};

export default function UptimeChart({ timestamps }: { timestamps: UptimeStampData[] }) {
  const now = new Date();

  const data = useMemo(() => {
    const points: { x: string; y: number }[] = [];

    for (let i = 23; i >= 0; i--) {
      const hourStart = new Date(now.getTime() - i * 3600000);
      const hourEnd = new Date(hourStart.getTime() + 3600000);

      const isDown = timestamps.some(({ status, started_at, ended_at }) => {
        const start = new Date(started_at);
        const end = ended_at ? new Date(ended_at) : now;
        return status === "down" && start < hourEnd && end > hourStart;
      });

      points.push({
        x: hourStart.toISOString(),
        y: isDown ? 0 : 1,
      });
    }

    return {
      datasets: [
        {
          label: "API Status (Past 24 Hours)",
          data: points,
          borderColor: "#22c55e",
          backgroundColor: "rgba(34,197,94,0.2)",
          stepped: true,
          fill: true,
        },
      ],
    };
  }, [timestamps]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          tooltipFormat: "MMM d, h:mm a",
        },
        title: {
          display: true,
          text: "Time (Last 24 Hours)",
        },
      },
      y: {
        min: 0,
        max: 1,
        ticks: {
          stepSize: 1,
          callback: (value: any) => (value === 1 ? "UP" : "DOWN"),
        },
        title: {
          display: true,
          text: "Status",
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px] h-[350px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
