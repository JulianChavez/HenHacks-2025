'use client'
import React from "react";

export default function ReportList() {
    const [reports, setReports] = React.useState([
        { ReportName: "Report 1", ReportDate: "2024-01-01", ReportNumber: "1234"},
        { ReportName: "Report 2", ReportDate: "2025-02-02", ReportNumber: "5678"}
    ]);
    return (
        <div className="report-list">
            <h2 className="text-xl font-bold mb-4 text-center">Bloodwork List</h2>
            <div className="space-y-4">
                {reports.map((report, index) => (
                    <div key={index} className="p-4 border rounded-md shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">{report.ReportName}</h3>
                                <p className="text-sm text-gray-600">Date: {report.ReportDate}</p>
                                <p className="text-sm text-gray-600">Report #: {report.ReportNumber}</p>
                            </div>
                            <button className="px-4 py-2 text-blue-600 hover:text-blue-800">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
