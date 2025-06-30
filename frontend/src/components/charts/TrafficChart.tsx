"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useMemo } from "react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type Timestamp = {
  timestamp: string;
};

export default function TrafficChart({ timestamps }: { timestamps: Timestamp[] }) {
  const [mode, setMode] = useState<"24hrs" | "7days">("24hrs");

  const processedData = useMemo(() => {
    let counts: number[];
    let labels: string[];

    if (mode === "24hrs") {
      counts = Array(24).fill(0);
      const now = new Date();
      const currentHour = now.getHours();

      // Labels ending at current hour, 24 hours back
      labels = [...Array(24)].map((_, i) => {
        const hour = (currentHour - 23 + i + 24) % 24;
        return `${hour}:00`;
      });

      timestamps.forEach(({ timestamp }) => {
        const date = new Date(timestamp);
        const diffMs = now.getTime() - date.getTime();

        if (diffMs <= 24 * 60 * 60 * 1000) {
          const hourDiff = Math.floor(diffMs / (60 * 60 * 1000));
          const index = 23 - hourDiff;
          if (index >= 0 && index < 24) {
            counts[index]++;
          }
        }
      });
    } else {
      // Keep 7-day logic as is
      counts = Array(7).fill(0);
      labels = [...Array(7)].map((_, i) =>
        new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );

      timestamps.forEach(({ timestamp }) => {
        const date = new Date(timestamp);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tsDate = new Date(date);
        tsDate.setHours(0, 0, 0, 0);
        const diff = Math.floor((today.getTime() - tsDate.getTime()) / 86400000);
        if (diff >= 0 && diff < 7) {
          counts[6 - diff]++;
        }
      });
    }

    return {
      labels,
      datasets: [
        {
          label: mode === "24hrs" ? "Requests per Hour" : "Requests per Day",
          data: counts,
          backgroundColor: "#60a5fa",
        },
      ],
    };
  }, [timestamps, mode]);

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <select
          className="border px-2 py-1 rounded bg-gray-200 text-black"
          value={mode}
          onChange={(e) => setMode(e.target.value as "24hrs" | "7days")}
        >
          <option value="24hrs">Last 24 Hours</option>
          <option value="7days">Last 7 Days</option>
        </select>
      </div>

      <Bar data={processedData} />
    </div>
  );
}
