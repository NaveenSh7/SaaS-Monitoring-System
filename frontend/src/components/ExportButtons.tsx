"use client";

import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ExportProps {
  data: {
    traffic: any[];
    endpoints: any[];
    countries: any[];
    cities: any[];
  } | null;
  filename?: string;
}

type DashData = {
  total_requests: number;
  countries: CountriesData[];
  cities: CitiesData[];
  endpoints: EndpointsData[];
  timestamps: TimestampData[];
}

type CountriesData = {
  country: string;
  count: number;
}

type CitiesData = {
  city: string;
  count: number;
}

type EndpointsData = {
  endpoint: string;
  count: number | string;
}

interface TimestampData {
  timestamp: string;
}

const ExportButtons = ({ data, filename = "monitoring-report" }: ExportProps) => {
  
  const exportToCSV = () => {
    if (!data) return alert("No data to export");

    const sectionToCSV = (title: string, rows: any[]) => {
      if (!rows || rows.length === 0) return "";

      const headers = Object.keys(rows[0]).join(",");
      const values = rows
        .map(row =>
          Object.values(row)
            .map(v => `"${v}"`)
            .join(",")
        )
        .join("\n");

      return `${title}\n${headers}\n${values}\n\n`;
    };

    const csvContent =
      sectionToCSV("Traffic", data.traffic) +
      sectionToCSV("Endpoints", data.endpoints) +
      sectionToCSV("Countries", data.countries) +
      sectionToCSV("Cities", data.cities);

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.csv`;
    link.click();
  };

  const exportToPDF = () => {
    if (!data) return alert("No data to export");

    const doc = new jsPDF();
    let y = 14;

    doc.setFontSize(16);
    doc.text("SaaS Monitoring Report", 14, y);
    y += 10;

    const addTable = (title: string, rows: any[]) => {
      if (!rows || rows.length === 0) return;

      doc.setFontSize(13);
      doc.text(title, 14, y);
      y += 4;

      autoTable(doc, {
        startY: y,
        head: [Object.keys(rows[0])],
        body: rows.map(row => Object.values(row)),
        theme: "grid",
      });

      // move Y below table
      // @ts-ignore
      y = doc.lastAutoTable.finalY + 10;
    };

    addTable("Traffic", data.traffic);
    addTable("Endpoints", data.endpoints);
    addTable("Countries", data.countries);
    addTable("Cities", data.cities);

    doc.save(`${filename}.pdf`);
  };

  return (
    <div className="flex gap-2 my-4">
      <button
        onClick={exportToCSV}
        className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Export analytics data as CSV file"
        disabled={!data}
      >
        📊 Export CSV
      </button>

      <button
        onClick={exportToPDF}
        className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-500 hover:text-white text-sm font-medium"
      >
        📄 Export PDF
      </button>
    </div>
  );
};

export default ExportButtons;
