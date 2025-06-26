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
    const counts: number[] = Array(mode === "24hrs" ? 24 : 7).fill(0);
    const labels =
      mode === "24hrs"
        ? [...Array(24)].map((_, i) => `${i}:00`)
        : [...Array(7)].map((_, i) =>
            new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })
          );

    timestamps.forEach(({ timestamp }) => {
      const date = new Date(timestamp);
      const curr = new Date();
      
      if (mode === "24hrs" && (curr.getTime() - date.getTime()) <= 24 * 60 * 60 * 1000) {
        const hour = date.getHours();
        counts[hour]++;
      }
      else if(mode === "7days"){
          const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tsDate = new Date(date);
        tsDate.setHours(0, 0, 0, 0);
        const diff = Math.floor((today.getTime() - tsDate.getTime()) / 86400000);
        if (diff >= 0 && diff < 7) {
          counts[6 - diff]++; // reverse index for ascending order
        }
      }
    });

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
          className="border px-2 py-1 rounded bg-gray-200"
          value={mode}
          onChange={(e) => setMode(e.target.value as "24hrs" | "7days")}
        >
          <option value="24hrs" className="text-black">Last 24 Hours</option>
          <option value="7days" className="text-black">Last 7 Days</option>
        </select>
      </div>

      <Bar data={processedData} />
    </div>
  );
}
