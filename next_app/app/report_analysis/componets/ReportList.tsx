'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";

// Define the Report interface
export interface Report {
    ReportName: string;
    ReportDate: string;
    ReportNumber: string;
    fileUrl?: string;
    analysisResults?: string;
    client_id?: number | null;
}

interface ReportListProps {
    reports: Report[];
    onDeleteReport?: (reportNumber: string) => void;
    onViewDetails?: (report: Report) => void;
}

export default function ReportList({ reports = [], onDeleteReport, onViewDetails }: ReportListProps) {
    const [clientId, setClientId] = useState<number | null>(null);
    const [filteredReports, setFilteredReports] = useState<Report[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const clientData = localStorage.getItem("client");
        if (clientData) {
            try {
                const client = JSON.parse(clientData);
                if (client && client.client_id) {
                    setClientId(client.client_id);
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error("Error parsing client data:", error);
            }
        }
    }, []);

    useEffect(() => {
        // Filter reports by client_id if logged in
        if (isLoggedIn && clientId) {
            // If client_id is not set on a report, it's a legacy report (show to everyone)
            // Otherwise, only show reports that match the client's ID
            const filtered = reports.filter(report => 
                !report.client_id || report.client_id === clientId
            );
            setFilteredReports(filtered);
        } else {
            // If not logged in, show all reports (for backward compatibility)
            setFilteredReports(reports);
        }
    }, [reports, clientId, isLoggedIn]);

    // Load reports from the database for the logged-in client
    useEffect(() => {
        const loadReportsFromDB = async () => {
            if (isLoggedIn && clientId) {
                try {
                    const response = await fetch(`/api/get-reports?client_id=${clientId}`);
                    if (response.ok) {
                        const data = await response.json();
                        if (data.reports && Array.isArray(data.reports)) {
                            // Convert database reports to the Report format
                            const dbReports = data.reports.map((report: any) => ({
                                ReportName: report.title || `Report ${report.report_id}`,
                                ReportDate: new Date(report.upload_date || Date.now()).toISOString().split('T')[0],
                                ReportNumber: report.report_number || `DB-${report.report_id}`,
                                fileUrl: report.file_url,
                                analysisResults: report.analysis_results || report.results,
                                client_id: report.client_id
                            }));
                            
                            // Add database reports to filtered reports if they don't already exist
                            setFilteredReports(prevReports => {
                                const combinedReports = [...prevReports];
                                
                                dbReports.forEach((dbReport: Report) => {
                                    const exists = combinedReports.some(r => 
                                        r.ReportNumber === dbReport.ReportNumber || 
                                        (r.fileUrl === dbReport.fileUrl && r.client_id === dbReport.client_id)
                                    );
                                    
                                    if (!exists) {
                                        combinedReports.push(dbReport);
                                    }
                                });
                                
                                return combinedReports;
                            });
                        }
                    }
                } catch (error) {
                    console.error("Error loading reports from database:", error);
                }
            }
        };
        
        loadReportsFromDB();
    }, [clientId, isLoggedIn]);

    if (filteredReports.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No reports available.</p>
                {!isLoggedIn && (
                    <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded-md inline-block">
                        <p className="text-yellow-700">Log in to view your reports.</p>
                        <a href="/login" className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            Log In
                        </a>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Your Reports</h2>
            {filteredReports.map((report, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold text-lg">{report.ReportName}</h3>
                            <p className="text-gray-600 text-sm">Date: {report.ReportDate}</p>
                            <p className="text-gray-600 text-sm">Report #: {report.ReportNumber}</p>
                        </div>
                        <div className="flex space-x-2">
                            <Link 
                                href={`/report_analysis/report_page?reportNumber=${report.ReportNumber}`}
                                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                                onClick={(e) => {
                                    if (onViewDetails) {
                                        e.preventDefault();
                                        onViewDetails(report);
                                    }
                                }}
                            >
                                View Details
                            </Link>
                            {onDeleteReport && (
                                <button
                                    onClick={() => onDeleteReport(report.ReportNumber)}
                                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
