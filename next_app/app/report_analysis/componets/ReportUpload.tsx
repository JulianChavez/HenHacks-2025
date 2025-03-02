'use client'

import React, { useState } from "react";
import { Report } from "./ReportList";

interface ReportUploadProps {
    onReportUploaded?: (report: Report) => void;
}

export default function ReportUpload({ onReportUploaded }: ReportUploadProps) {
    const [reportName, setReportName] = useState("");
    const [reportDate, setReportDate] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [reportNumber, setReportNumber] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);
    const [uploadStatus, setUploadStatus] = useState("");
    const [analysisResults, setAnalysisResults] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [fileUrl, setFileUrl] = useState("");

    // Generate a random report number
    const generateReportNumber = () => {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        return `RPT-${timestamp.toString().slice(-6)}-${random}`;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedFile && reportName && reportDate) {
            // Generate report number on submission
            const newReportNumber = generateReportNumber();
            setReportNumber(newReportNumber);
            
            try {
                setUploadStatus("Uploading...");
                setIsAnalyzing(true);
                
                // Create a FormData object to send the file
                const formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("reportName", reportName);
                formData.append("reportDate", reportDate);
                formData.append("reportNumber", newReportNumber);
                
                // Send the file to the API route
                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });
                
                if (!response.ok) {
                    throw new Error("Upload failed");
                }
                
                const data = await response.json();
                console.log("Upload successful:", data);
                console.log("HELLLO");
                
                // Store the analysis results if available
                let analysisText = null;
                if (data.analysis) {
                    console.log("Analysis results received:");
                    console.log(data.analysis);
                    
                    // Log the actual analysis text
                    if (data.analysis.analysis) {
                        console.log("Analysis text:");
                        console.log(data.analysis.analysis);
                        analysisText = data.analysis.analysis;
                    }
                    
                    setAnalysisResults(analysisText || "No analysis available");
                    setUploadStatus("Upload and analysis successful!");
                } else if (data.analysisError) {
                    console.log("Analysis error:", data.analysisError);
                    setAnalysisResults("Analysis failed: " + data.analysisError);
                    setUploadStatus("Upload successful, but analysis failed.");
                } else {
                    console.log("No analysis results in response");
                    setUploadStatus("Upload successful!");
                }
                
                // Set the file URL
                setFileUrl(data.fileUrl || "");
                
                // Call the onReportUploaded callback if provided
                if (onReportUploaded) {
                    const newReport: Report = {
                        ReportName: reportName,
                        ReportDate: reportDate,
                        ReportNumber: newReportNumber,
                        fileUrl: data.fileUrl,
                        analysisResults: analysisText
                    };
                    onReportUploaded(newReport);
                }
                
                setIsUploaded(true);
                setIsAnalyzing(false);
            } catch (error) {
                console.error("Error uploading file:", error);
                setUploadStatus("Upload failed. Please try again.");
                setIsAnalyzing(false);
            }
        }
    };

    return (
        <div className="upload-container">
            <h1 className="text-xl font-bold mb-4">Bloodwork Upload</h1>
            
            {!isUploaded ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-group">
                        <label htmlFor="reportName" className="block text-sm font-medium mb-1">
                            Report Name
                        </label>
                        <input
                            type="text"
                            id="reportName"
                            value={reportName}
                            onChange={(e) => setReportName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="reportDate" className="block text-sm font-medium mb-1">
                            Report Date
                        </label>
                        <input
                            type="date"
                            id="reportDate"
                            value={reportDate}
                            onChange={(e) => setReportDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="pdfUpload" className="block text-sm font-medium mb-1">
                            Upload PDF Report
                        </label>
                        <input
                            type="file"
                            id="pdfUpload"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        disabled={!selectedFile || !reportName || !reportDate || isAnalyzing}
                    >
                        {isAnalyzing ? "Processing..." : "Upload Report"}
                    </button>
                </form>
            ) : (
                <div className="success-message space-y-4">
                    <div className="p-4 bg-green-100 border border-green-400 rounded-md">
                        <p className="text-green-700">{uploadStatus || "Report uploaded successfully!"}</p>
                    </div>
                    
                    <div className="report-details p-4 border rounded-md">
                        <h2 className="font-bold mb-2">Report Details</h2>
                        <p><strong>Report Number:</strong> {reportNumber}</p>
                        <p><strong>Report Name:</strong> {reportName}</p>
                        <p><strong>Report Date:</strong> {reportDate}</p>
                        <p><strong>File Name:</strong> {selectedFile?.name}</p>
                        <div className="mt-4">
                            <a 
                                href={fileUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 inline-block"
                            >
                                View PDF
                            </a>
                        </div>
                    </div>
                    
                    {analysisResults && (
                        <div className="analysis-results p-4 border rounded-md">
                            <h2 className="font-bold mb-2">Blood Analysis Results</h2>
                            <div className="whitespace-pre-wrap">{analysisResults}</div>
                        </div>
                    )}
                    
                    {/* Debug section - only visible in development */}
                    {process.env.NODE_ENV === 'development' && (
                        <div className="debug-section p-4 border border-yellow-300 rounded-md bg-yellow-50 mt-4">
                            <details>
                                <summary className="font-bold cursor-pointer">Debug Information</summary>
                                <div className="mt-2">
                                    <p><strong>Report Number:</strong> {reportNumber}</p>
                                    <p><strong>File Path:</strong> {fileUrl}</p>
                                    <p><strong>Raw Analysis Results:</strong></p>
                                    <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-60">
                                        {JSON.stringify(analysisResults, null, 2)}
                                    </pre>
                                </div>
                            </details>
                        </div>
                    )}
                    
                    <button
                        onClick={() => {
                            setIsUploaded(false);
                            setSelectedFile(null);
                            setReportName("");
                            setReportDate("");
                            setReportNumber("");
                            setUploadStatus("");
                            setAnalysisResults(null);
                            setFileUrl("");
                        }}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                        Upload Another Report
                    </button>
                </div>
            )}
        </div>
    );
}