// components/EndpointPieChart.tsx
"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type EndpointData = {
  endpoint: string;
  count: number | string;
};

export default function EndpointChart({ data }: { data: EndpointData[] }) {
    // console.log(data)
  const chartData = {
    labels: data.map((item) => item.endpoint),
    datasets: [
      {
        label: "API Hits",
        data: data.map((item) => Number(item.count)),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
}
