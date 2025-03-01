import React from "react";
import Header from "./componets/header";
import ReportUpload from "./componets/ReportUpload";
import ReportSummary from "./componets/ReportList";
import "./report.css";

export default function ReportAnalysis() {
    return (
        <div>
            <div id = "header-section"> 
                <Header/>
            </div>
            <div id = "report-upload">
                <div className = "report-upload-section">
                    <ReportUpload/>
                </div>
            </div>
            <div id = "report-summary">
                <ReportSummary/>
            </div>
        </div>
    )
}   
