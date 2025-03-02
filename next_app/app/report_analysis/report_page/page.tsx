'use client';
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Report } from "../componets/ReportList";
import Header from "../componets/header";
import Link from "next/link";

// Local storage key (must match the one in the main page)
const REPORTS_STORAGE_KEY = 'bloodwork_reports';

// Helper function to parse analysis results
const parseAnalysisResults = (analysisResults: string | undefined) => {
    if (!analysisResults) return { summary: "", recommendations: "", results: [] };
    
    // This is a placeholder implementation - you'll need to adjust based on your actual data format
    // Assuming the analysis results contain sections for summary, recommendations, and test results
    
    let summary = "";
    let recommendations = "";
    let results: any[] = [];
    
    try {
        // Extract summary (first paragraph or section)
        const summaryMatch = analysisResults.match(/Summary:([\s\S]*?)(?=Recommendations:|$)/);
        if (summaryMatch && summaryMatch[1]) {
            summary = summaryMatch[1].trim();
        } else {
            // Fallback: take the first paragraph as summary
            const firstParagraph = analysisResults.split('\n\n')[0];
            summary = firstParagraph || "No summary available";
        }
        
        // Extract recommendations
        const recommendationsMatch = analysisResults.match(/Recommendations:([\s\S]*?)(?=Test Results:|$)/);
        if (recommendationsMatch && recommendationsMatch[1]) {
            recommendations = recommendationsMatch[1].trim();
        }
        
        // Check if the results are in markdown table format
        const tableMatch = analysisResults.match(/\|\s*Test Name\s*\|\s*Result\s*\|\s*Reference Range\s*\|\s*Notes\s*\|([\s\S]*)/);
        if (tableMatch) {
            results = parseMarkdownTable(tableMatch[1]);
        } else {
            // Extract test results table using the original method
            const resultsMatch = analysisResults.match(/Test Results:([\s\S]*)/);
            if (resultsMatch && resultsMatch[1]) {
                const resultsText = resultsMatch[1].trim();
                
                // Parse the results text into a structured format
                // This is a simplified example - adjust based on your actual data format
                const lines = resultsText.split('\n').filter(line => line.trim() !== '');
                
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    // Skip header lines or empty lines
                    if (line.includes('Test') && line.includes('Result') && line.includes('Reference Range')) {
                        continue;
                    }
                    
                    // Parse each line into test, result, units, reference range
                    // This is a simplified approach - adjust based on your actual data format
                    const parts = line.split(/\s{2,}|\t/);
                    if (parts.length >= 3) {
                        // Try to extract notes - anything after the reference range
                        let test = parts[0];
                        let result = parts[1];
                        let units = parts[2];
                        let referenceRange = parts[3] || 'N/A';
                        let status = 'Normal';
                        let notes = '';
                        
                        // Check if there are notes (usually after the reference range)
                        if (parts.length > 4) {
                            notes = parts.slice(4).join(' ');
                        }
                        
                        // Determine status based on result and reference range
                        if (referenceRange && referenceRange !== 'N/A') {
                            // Try to parse the reference range
                            const rangeMatch = referenceRange.match(/([<>]?)\s*(\d+\.?\d*)\s*-\s*(\d+\.?\d*)/);
                            if (rangeMatch) {
                                const [_, prefix, min, max] = rangeMatch;
                                const numResult = parseFloat(result);
                                if (!isNaN(numResult)) {
                                    if (numResult < parseFloat(min)) {
                                        status = 'Low';
                                    } else if (numResult > parseFloat(max)) {
                                        status = 'High';
                                    }
                                }
                            } else if (referenceRange.includes('<')) {
                                // Handle ranges like "< 100"
                                const maxMatch = referenceRange.match(/[<]\s*(\d+\.?\d*)/);
                                if (maxMatch) {
                                    const numResult = parseFloat(result);
                                    const maxValue = parseFloat(maxMatch[1]);
                                    if (!isNaN(numResult) && !isNaN(maxValue) && numResult > maxValue) {
                                        status = 'High';
                                    }
                                }
                            }
                        }
                        
                        // Look for keywords in notes that might indicate status
                        if (notes) {
                            const lowKeywords = ['low', 'below', 'deficient', 'insufficient'];
                            const highKeywords = ['high', 'elevated', 'excessive', 'above'];
                            
                            if (lowKeywords.some(keyword => notes.toLowerCase().includes(keyword))) {
                                status = 'Low';
                            } else if (highKeywords.some(keyword => notes.toLowerCase().includes(keyword))) {
                                status = 'High';
                            }
                        }
                        
                        results.push({
                            test,
                            result,
                            units,
                            referenceRange,
                            status,
                            notes
                        });
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error parsing analysis results:", error);
    }
    
    return { summary, recommendations, results };
};

// Helper function to parse markdown table format
const parseMarkdownTable = (tableText: string): any[] => {
    const results: any[] = [];
    
    try {
        // Split the table into rows
        const rows = tableText.split('\n')
            .map(row => row.trim())
            .filter(row => row && row.startsWith('|') && !row.startsWith('|---'));
        
        // Process each row
        for (const row of rows) {
            // Skip the header separator row
            if (row.includes('---')) continue;
            
            // Split the row into cells and remove the outer pipes
            const cells = row.split('|').slice(1, -1).map(cell => cell.trim());
            
            // Need at least 4 cells: Test Name, Result, Reference Range, Notes
            if (cells.length >= 4) {
                const testName = cells[0];
                const resultFull = cells[1];
                const referenceRange = cells[2];
                const notes = cells[3];
                
                // Extract result and units
                const resultMatch = resultFull.match(/(\d+\.?\d*)\s*([a-zA-Z/%µ]+\/?\w*)/);
                let result = resultFull;
                let units = '';
                
                if (resultMatch) {
                    result = resultMatch[1];
                    units = resultMatch[2];
                }
                
                // Determine status based on notes and reference range
                let status = 'Normal';
                
                // Check notes for status indicators
                const lowKeywords = ['low', 'below', 'deficient', 'insufficient'];
                const highKeywords = ['high', 'elevated', 'excessive', 'above', 'borderline high'];
                
                if (lowKeywords.some(keyword => notes.toLowerCase().includes(keyword))) {
                    status = 'Low';
                } else if (highKeywords.some(keyword => notes.toLowerCase().includes(keyword))) {
                    status = 'High';
                }
                
                // Also check against reference range if status is still Normal
                if (status === 'Normal' && referenceRange) {
                    const rangeMatch = referenceRange.match(/([<>]?)\s*(\d+\.?\d*)\s*-\s*(\d+\.?\d*)/);
                    if (rangeMatch) {
                        const [_, prefix, min, max] = rangeMatch;
                        const numResult = parseFloat(result);
                        if (!isNaN(numResult)) {
                            if (numResult < parseFloat(min)) {
                                status = 'Low';
                            } else if (numResult > parseFloat(max)) {
                                status = 'High';
                            }
                        }
                    } else if (referenceRange.includes('<')) {
                        // Handle ranges like "< 100"
                        const maxMatch = referenceRange.match(/[<]\s*(\d+\.?\d*)/);
                        if (maxMatch) {
                            const numResult = parseFloat(result);
                            const maxValue = parseFloat(maxMatch[1]);
                            if (!isNaN(numResult) && !isNaN(maxValue) && numResult > maxValue) {
                                status = 'High';
                            }
                        }
                    }
                }
                
                results.push({
                    test: testName,
                    result,
                    units,
                    referenceRange,
                    status,
                    notes
                });
            }
        }
    } catch (error) {
        console.error("Error parsing markdown table:", error);
    }
    
    return results;
};

export default function ReportPage() {
    const searchParams = useSearchParams();
    const reportNumber = searchParams.get('reportNumber');
    
    const [report, setReport] = useState<Report | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [parsedResults, setParsedResults] = useState<{
        summary: string;
        recommendations: string;
        results: any[];
    }>({ summary: "", recommendations: "", results: [] });
    
    useEffect(() => {
        const loadReport = () => {
            try {
                if (!reportNumber) {
                    setError("No report number provided");
                    setLoading(false);
                    return;
                }
                
                // Load reports from local storage
                const savedReports = localStorage.getItem(REPORTS_STORAGE_KEY);
                if (!savedReports) {
                    setError("No reports found");
                    setLoading(false);
                    return;
                }
                
                const reports: Report[] = JSON.parse(savedReports);
                const foundReport = reports.find(r => r.ReportNumber === reportNumber);
                
                if (!foundReport) {
                    setError(`Report with number ${reportNumber} not found`);
                    setLoading(false);
                    return;
                }
                
                setReport(foundReport);
                
                // Parse the analysis results
                const parsed = parseAnalysisResults(foundReport.analysisResults);
                setParsedResults(parsed);
                
                setLoading(false);
            } catch (error) {
                console.error("Error loading report:", error);
                setError("Error loading report details");
                setLoading(false);
            }
        };
        
        loadReport();
    }, [reportNumber]);
    
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Header />
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="mt-2">Loading report details...</p>
                </div>
            </div>
        );
    }
    
    if (error || !report) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Header />
                <div className="text-center py-8">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error || "Report not found"}</span>
                    </div>
                    <div className="mt-4">
                        <Link href="/report_analysis" className="text-blue-500 hover:underline">
                            Return to Reports List
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto px-4 py-8">
            <Header />
            
            <div className="mb-4">
                <Link href="/report_analysis" className="text-blue-500 hover:underline flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Reports List
                </Link>
            </div>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6 bg-blue-50 border-b">
                    <h1 className="text-2xl font-bold text-gray-800">{report.ReportName}</h1>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                        <p><span className="font-medium">Date:</span> {report.ReportDate}</p>
                        <p><span className="font-medium">Report #:</span> {report.ReportNumber}</p>
                    </div>
                    
                    {report.fileUrl && (
                        <div className="mt-4">
                            <a 
                                href={report.fileUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 inline-flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View Original PDF
                            </a>
                        </div>
                    )}
                </div>
                
                <div className="p-6">
                    <div className="space-y-6">
                        {/* Summary Row */}
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h2 className="text-xl font-bold mb-4 text-blue-700 border-b pb-2">Summary</h2>
                            <div className="prose max-w-none">
                                {parsedResults.summary ? (
                                    <p className="text-gray-800">{parsedResults.summary}</p>
                                ) : (
                                    <p className="text-gray-500 italic">No summary available</p>
                                )}
                            </div>
                        </div>
                        
                        {/* Recommendations Row */}
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h2 className="text-xl font-bold mb-4 text-green-700 border-b pb-2">Recommendations</h2>
                            <div className="prose max-w-none">
                                {parsedResults.recommendations ? (
                                    <div className="text-gray-800 whitespace-pre-line">{parsedResults.recommendations}</div>
                                ) : (
                                    <p className="text-gray-500 italic">No recommendations available</p>
                                )}
                            </div>
                        </div>
                        
                        {/* Results Row */}
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h2 className="text-xl font-bold mb-4 text-purple-700 border-b pb-2">Test Results</h2>
                            {parsedResults.results.length > 0 ? (
                                <div className="space-y-4">
                                    {parsedResults.results.map((result, index) => (
                                        <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                                            {/* Test name and circular result indicator */}
                                            <div className="flex items-center gap-4 min-w-[250px]">
                                                <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${
                                                    result.status === 'High' ? 'bg-red-100 text-red-700 border-2 border-red-300' : 
                                                    result.status === 'Low' ? 'bg-orange-100 text-orange-700 border-2 border-orange-300' : 
                                                    'bg-green-100 text-green-700 border-2 border-green-300'
                                                }`}>
                                                    <div className="text-center">
                                                        <div className="font-bold text-sm">{result.result}</div>
                                                        <div className="text-xs">{result.units}</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-800">{result.test}</h3>
                                                    <p className="text-sm text-gray-500">Reference: {result.referenceRange}</p>
                                                </div>
                                            </div>
                                            
                                            {/* Status indicator */}
                                            <div className="flex-grow">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    result.status === 'High' ? 'bg-red-100 text-red-800' : 
                                                    result.status === 'Low' ? 'bg-orange-100 text-orange-800' : 
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                    {result.status}
                                                </span>
                                                
                                                {/* Notes about the result - this would need to be added to your data model */}
                                                {result.notes && (
                                                    <p className="mt-1 text-sm text-gray-600">{result.notes}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-gray-500 italic">No test results available</div>
                            )}
                            
                            {/* If there's raw analysis results, show them as a fallback */}
                            {!parsedResults.results.length && report.analysisResults && (
                                <div className="mt-4 p-4 border rounded-md bg-white">
                                    <h3 className="font-bold mb-2">Raw Analysis Results</h3>
                                    <div className="whitespace-pre-wrap text-sm">
                                        {report.analysisResults}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
