"use client";

import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface ExportProps {
  data: any[];
  filename?: string;
}

const ExportButtons = ({ data, filename = "monitoring-report" }: ExportProps) => {
  const exportToCSV = () => {
    if (!data || data.length === 0) return alert("No data to export");
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(row => 
      Object.values(row).map(value => `"${value}"`).join(",")
    ).join("\n");
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    if (!data || data.length === 0) return alert("No data to export");
    const doc = new jsPDF() as any;
    doc.text("SaaS Monitoring Report", 14, 15);
    doc.autoTable({
      head: [Object.keys(data[0])],
      body: data.map(item => Object.values(item)),
      startY: 20,
    });
    doc.save(`${filename}.pdf`);
  };

  return (
    <div className="flex gap-2 my-4">
      <button 
        onClick={exportToCSV}
        className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm font-medium"
      >
        Export CSV
      </button>
      <button 
        onClick={exportToPDF}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
      >
        Export PDF
      </button>
    </div>
  );
};

export default ExportButtons;