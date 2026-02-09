"use client";

import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface ExportProps {
  data: DashData | null;
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
    // Check if data exists and has content
    if (!data) {
      alert("No data available to export. Please wait for the dashboard to load.");
      return;
    }

    // Check if there's any actual data to export
    const hasData = 
      data.countries?.length > 0 || 
      data.cities?.length > 0 || 
      data.endpoints?.length > 0 || 
      data.timestamps?.length > 0;

    if (!hasData) {
      alert("No analytics data available. Please ensure the API has received some traffic.");
      return;
    }

    let csvContent = '';

    // Add Summary Section
    csvContent += 'ANALYTICS SUMMARY\n';
    csvContent += `Total Requests,${data.total_requests || 0}\n`;
    csvContent += `Generated At,${new Date().toLocaleString()}\n`;
    csvContent += '\n';

    // Add Countries Section
    if (data.countries && data.countries.length > 0) {
      csvContent += 'COUNTRY DISTRIBUTION\n';
      csvContent += 'Country,Request Count\n';
      data.countries.forEach(item => {
        csvContent += `"${item.country}",${item.count}\n`;
      });
      csvContent += '\n';
    }

    // Add Cities Section
    if (data.cities && data.cities.length > 0) {
      csvContent += 'CITY DISTRIBUTION\n';
      csvContent += 'City,Request Count\n';
      data.cities.forEach(item => {
        csvContent += `"${item.city}",${item.count}\n`;
      });
      csvContent += '\n';
    }

    // Add Endpoints Section
    if (data.endpoints && data.endpoints.length > 0) {
      csvContent += 'ENDPOINT USAGE\n';
      csvContent += 'Endpoint,Request Count\n';
      data.endpoints.forEach(item => {
        const endpoint = String(item.endpoint).replace(/"/g, '""');
        csvContent += `"${endpoint}",${item.count}\n`;
      });
      csvContent += '\n';
    }

    // Add Traffic Timeline Section
    if (data.timestamps && data.timestamps.length > 0) {
      csvContent += 'TRAFFIC TIMELINE\n';
      csvContent += 'Timestamp\n';
      data.timestamps.forEach(item => {
        csvContent += `"${item.timestamp}"\n`;
      });
    }

    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}-${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    console.log('✅ CSV export successful');
  };

  const exportToPDF = () => {
    // Check if data exists and has content
    if (!data) {
      alert("No data available to export. Please wait for the dashboard to load.");
      return;
    }

    // Check if there's any actual data to export
    const hasData = 
      data.countries?.length > 0 || 
      data.cities?.length > 0 || 
      data.endpoints?.length > 0 || 
      data.timestamps?.length > 0;

    if (!hasData) {
      alert("No analytics data available. Please ensure the API has received some traffic.");
      return;
    }

    try {
      const doc = new jsPDF() as any;
      
      // Add title
      doc.setFontSize(20);
      doc.setTextColor(16, 185, 129); // Emerald color
      doc.text("SaaS Monitoring Report", 14, 20);
      
      // Add metadata
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);
      doc.text(`Total Requests: ${data.total_requests || 0}`, 14, 34);
      
      // Reset text color
      doc.setTextColor(0, 0, 0);
      
      let yPosition = 45;

      // Country Distribution Section
      if (data.countries && data.countries.length > 0) {
        doc.setFontSize(14);
        doc.setTextColor(16, 185, 129);
        doc.text("Country Distribution", 14, yPosition);
        doc.setTextColor(0, 0, 0);
        yPosition += 7;

        const countryRows = data.countries.map(item => [
          item.country,
          String(item.count)
        ]);

        doc.autoTable({
          startY: yPosition,
          head: [['Country', 'Requests']],
          body: countryRows,
          theme: 'striped',
          styles: { 
            fontSize: 9,
            cellPadding: 3
          },
          headStyles: { 
            fillColor: [16, 185, 129],
            textColor: [255, 255, 255],
            fontStyle: 'bold'
          },
          margin: { left: 14, right: 14 }
        });

        yPosition = doc.lastAutoTable.finalY + 12;
      }

      // City Distribution Section
      if (data.cities && data.cities.length > 0) {
        // Add new page if needed
        if (yPosition > 240) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFontSize(14);
        doc.setTextColor(16, 185, 129);
        doc.text("City Distribution", 14, yPosition);
        doc.setTextColor(0, 0, 0);
        yPosition += 7;

        const cityRows = data.cities.map(item => [
          item.city,
          String(item.count)
        ]);

        doc.autoTable({
          startY: yPosition,
          head: [['City', 'Requests']],
          body: cityRows,
          theme: 'striped',
          styles: { 
            fontSize: 9,
            cellPadding: 3
          },
          headStyles: { 
            fillColor: [16, 185, 129],
            textColor: [255, 255, 255],
            fontStyle: 'bold'
          },
          margin: { left: 14, right: 14 }
        });

        yPosition = doc.lastAutoTable.finalY + 12;
      }

      // Endpoint Usage Section
      if (data.endpoints && data.endpoints.length > 0) {
        // Add new page if needed
        if (yPosition > 240) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFontSize(14);
        doc.setTextColor(16, 185, 129);
        doc.text("Endpoint Usage", 14, yPosition);
        doc.setTextColor(0, 0, 0);
        yPosition += 7;

        const endpointRows = data.endpoints.map(item => [
          String(item.endpoint),
          String(item.count)
        ]);

        doc.autoTable({
          startY: yPosition,
          head: [['Endpoint', 'Requests']],
          body: endpointRows,
          theme: 'striped',
          styles: { 
            fontSize: 9,
            cellPadding: 3
          },
          headStyles: { 
            fillColor: [16, 185, 129],
            textColor: [255, 255, 255],
            fontStyle: 'bold'
          },
          margin: { left: 14, right: 14 },
          columnStyles: {
            0: { cellWidth: 100 }
          }
        });

        yPosition = doc.lastAutoTable.finalY + 12;
      }

      // Traffic Timeline Section (show first 20 timestamps)
      if (data.timestamps && data.timestamps.length > 0) {
        // Add new page if needed
        if (yPosition > 240) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFontSize(14);
        doc.setTextColor(16, 185, 129);
        doc.text(`Traffic Timeline (Last ${Math.min(data.timestamps.length, 20)} entries)`, 14, yPosition);
        doc.setTextColor(0, 0, 0);
        yPosition += 7;

        // Only show last 20 timestamps to avoid PDF being too large
        const recentTimestamps = data.timestamps.slice(-20);
        const timestampRows = recentTimestamps.map(item => [
          item.timestamp
        ]);

        doc.autoTable({
          startY: yPosition,
          head: [['Timestamp']],
          body: timestampRows,
          theme: 'striped',
          styles: { 
            fontSize: 8,
            cellPadding: 2
          },
          headStyles: { 
            fillColor: [16, 185, 129],
            textColor: [255, 255, 255],
            fontStyle: 'bold'
          },
          margin: { left: 14, right: 14 }
        });
      }

      // Add footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        );
      }

      // Save PDF
      doc.save(`${filename}-${Date.now()}.pdf`);
      console.log('✅ PDF export successful');
      
    } catch (error) {
      console.error('❌ Error generating PDF:', error);
      alert('Error generating PDF. Please check console for details.');
    }
  };

  return (
    <div className="flex gap-2">
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
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Export analytics data as PDF file"
        disabled={!data}
      >
        📄 Export PDF
      </button>
    </div>
  );
};

export default ExportButtons;