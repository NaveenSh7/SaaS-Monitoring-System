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
import { count } from "console";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface CountryDataItem {
  country: string;
  count: string | number;
}

interface Props {
  countries: CountryDataItem[];
}

// Helper function for colors
const generateColors = (count: number): string[] => {
  const colors: string[] = [];

  for (let i = 0; i < count; i++) {
    const hue = Math.floor((360 / count) * i);
    colors.push(`hsl(${hue}, 70%, 70%)`);
  }

  return colors;
};

const CountryData: FC<Props> = ({ countries }) => {
  {countries}
  
  const formatted = (countries ?? []).map((c) => ({
    label: c.country,
    value: c.count,
  }));
  

  const labels = formatted.map((d) => d.label);
  const values = formatted.map((d) => Number(d.value));
  const colors = generateColors(formatted.length);

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

  if (formatted.length === 0) {
    return (
      <div className="text-sm text-zinc-400 italic mt-10 text-center">
        No country data available.
      </div>
    );
  }

  return (
    <div className="w-[350px] mx-auto">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default CountryData;
