'use client';
import React, { useState, useEffect } from "react";
import Header from "./componets/header";
import ReportUpload from "./componets/ReportUpload";
import ReportList, { Report } from "./componets/ReportList";
import "./report.css";

// Define user interface
interface User {
    id: number;
    name: string;
}

// Local storage key
const REPORTS_STORAGE_KEY = 'bloodwork_reports';

export default function ReportAnalysis() {
    // State for reports - initialize from local storage if available
    const [reports, setReports] = useState<Report[]>([]);
    
    // State for selected report details
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    
    // Load reports from local storage on component mount
    useEffect(() => {
        const loadReports = () => {
            try {
                const savedReports = localStorage.getItem(REPORTS_STORAGE_KEY);
                if (savedReports) {
                    setReports(JSON.parse(savedReports));
                } else {
                    // Set sample reports if no saved reports exist
                    setReports([
                        { ReportName: "Sample Report 1", ReportDate: "2024-01-01", ReportNumber: "RPT-123456-789" },
                        { ReportName: "Sample Report 2", ReportDate: "2024-02-15", ReportNumber: "RPT-234567-890" }
                    ]);
                }
            } catch (error) {
                console.error("Error loading reports from local storage:", error);
                // Set default reports on error
                setReports([
                    { ReportName: "Sample Report 1", ReportDate: "2024-01-01", ReportNumber: "RPT-123456-789" },
                    { ReportName: "Sample Report 2", ReportDate: "2024-02-15", ReportNumber: "RPT-234567-890" }
                ]);
            }
        };
        
        loadReports();
    }, []);
    
    // Save reports to local storage whenever they change
    useEffect(() => {
        localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(reports));
    }, [reports]);
    
    // Handle new report upload
    const handleReportUploaded = (newReport: Report) => {
        setReports(prevReports => [newReport, ...prevReports]);
    };
    
    // Handle view details
    const handleViewDetails = (report: Report) => {
        setSelectedReport(report);
        // Navigate to the report details page with the report number as a parameter
        window.location.href = `/report_analysis/report_page?reportNumber=${report.ReportNumber}`;
    };
    
    // Handle report deletion
    const handleDeleteReport = (reportNumber: string) => {
        setReports(prevReports => prevReports.filter(report => report.ReportNumber !== reportNumber));
        if (selectedReport && selectedReport.ReportNumber === reportNumber) {
            setSelectedReport(null);
        }
    };
    
    return (
        <div className="container mx-auto px-4 py-8">
            <div id="header-section"> 
                <Header/>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div id="report-upload" className="md:order-2">
                    <div className="report-upload-section">
                        <ReportUpload onReportUploaded={handleReportUploaded} />
                    </div>
                </div>
                
                <div id="report-summary" className="md:order-1">
                    <ReportList 
                        reports={reports} 
                        onViewDetails={handleViewDetails} 
                    />
                </div>
            </div>
            
            {/* Report Details Modal/Section */}
            {selectedReport && (
                <div className="mt-8 p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold mb-4">Report Details: {selectedReport.ReportName}</h2>
                        <button 
                            onClick={() => handleDeleteReport(selectedReport.ReportNumber)}
                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                        >
                            Delete Report
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p><strong>Report Name:</strong> {selectedReport.ReportName}</p>
                            <p><strong>Report Date:</strong> {selectedReport.ReportDate}</p>
                            <p><strong>Report Number:</strong> {selectedReport.ReportNumber}</p>
                            
                            {selectedReport.fileUrl && (
                                <div className="mt-4">
                                    <a 
                                        href={selectedReport.fileUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 inline-block"
                                    >
                                        View PDF
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {selectedReport.analysisResults && (
                        <div className="mt-4">
                            <h3 className="font-bold mb-2">Analysis Results</h3>
                            <div className="whitespace-pre-wrap p-4 border rounded-md bg-gray-50 max-h-96 overflow-y-auto">
                                {selectedReport.analysisResults}
                            </div>
                        </div>
                    )}
                    
                    <button 
                        onClick={() => setSelectedReport(null)}
                        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                        Close Details
                    </button>
                </div>
            )}
        </div>
    );
}   
