'use client'

import React, { useState } from "react";

export default function ReportUpload() {
    const [reportName, setReportName] = useState("");
    const [reportDate, setReportDate] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [reportNumber, setReportNumber] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedFile && reportName && reportDate) {
            // Generate report number on submission
            const newReportNumber = generateReportNumber();
            setReportNumber(newReportNumber);
            setIsUploaded(true);
            
            // Here you would typically upload the file to your server
            console.log("File uploaded:", selectedFile);
            console.log("Report details:", {
                name: reportName,
                date: reportDate,
                reportNumber: newReportNumber
            });
        }
    };

    return (
        <div className="upload-container">
            <h1 className="text-xl font-bold mb-4">Report Upload</h1>
            
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
                        disabled={!selectedFile || !reportName || !reportDate}
                    >
                        Upload Report
                    </button>
                </form>
            ) : (
                <div className="success-message space-y-4">
                    <div className="p-4 bg-green-100 border border-green-400 rounded-md">
                        <p className="text-green-700">Report uploaded successfully!</p>
                    </div>
                    
                    <div className="report-details p-4 border rounded-md">
                        <h2 className="font-bold mb-2">Report Details</h2>
                        <p><strong>Report Number:</strong> {reportNumber}</p>
                        <p><strong>Report Name:</strong> {reportName}</p>
                        <p><strong>Report Date:</strong> {reportDate}</p>
                        <p><strong>File Name:</strong> {selectedFile?.name}</p>
                    </div>
                    
                    <button
                        onClick={() => {
                            setIsUploaded(false);
                            setSelectedFile(null);
                            setReportName("");
                            setReportDate("");
                            setReportNumber("");
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