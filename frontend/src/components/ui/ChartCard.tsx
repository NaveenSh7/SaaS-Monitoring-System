"use client";

import { FC } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface DataItem {
  label: string;
  value: string | number;
}

interface ChartCardProps {
  title?: string;
  data: DataItem[];
}

const generateColors = (count: number): string[] => {
  const colors: string[] = [];

  for (let i = 0; i < count; i++) {
    const hue = Math.floor((360 / count) * i);
    colors.push(`hsl(${hue}, 70%, 70%)`);
  }

  return colors;
};

const ChartCard: FC<ChartCardProps> = ({ data, title }) => {
  const labels = data.map((d) => d.label);
  const values = data.map((d) => Number(d.value));
  const colors = generateColors(data.length);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Count",
        data: values,
        backgroundColor: colors,
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#FFFFFF",
          font: { size: 12 },
        },
      },
      datalabels: {
        color: "#fff",
        font: { weight: "bold", size: 12 },
        formatter: (value: number) => `${value}`,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed}`,
        },
      },
    },
  };

  if (data.length === 0) {
    return (
      <div className="text-sm text-zinc-400 italic mt-10 text-center">
        No {title || "chart"} data available.
      </div>
    );
  }

  return (
    <div className="w-[350px] mx-auto">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default ChartCard;
