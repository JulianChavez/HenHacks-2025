'use client'
import React from "react";

// Define the Report interface
export interface Report {
    ReportName: string;
    ReportDate: string;
    ReportNumber: string;
    fileUrl?: string;
    analysisResults?: string;
}

interface ReportListProps {
    reports: Report[];
    onViewDetails?: (report: Report) => void;
}

export default function ReportList({ reports, onViewDetails }: ReportListProps) {
    return (
        <div className="report-list">
            <h2 className="text-xl font-bold mb-4 text-center">Bloodwork List</h2>
            {reports.length === 0 ? (
                <div className="text-center p-4 border rounded-md text-gray-500">
                    No reports available. Upload a report to get started.
                </div>
            ) : (
                <div className="space-y-4">
                    {reports.map((report, index) => (
                        <div key={index} className="p-4 border rounded-md shadow-sm">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold">{report.ReportName}</h3>
                                    <p className="text-sm text-gray-600">Date: {report.ReportDate}</p>
                                    <p className="text-sm text-gray-600">Report #: {report.ReportNumber}</p>
                                </div>
                                <button 
                                    className="px-4 py-2 text-blue-600 hover:text-blue-800"
                                    onClick={() => onViewDetails && onViewDetails(report)}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
