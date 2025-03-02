import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/db';

export async function POST(request: Request) {
  try {
    const { client_id, title, file_url, analysis_results, report_number } = await request.json();

    // Validate input
    if (!client_id) {
      return NextResponse.json(
        { success: false, error: 'Client ID is required' },
        { status: 400 }
      );
    }

    // Connect to the database
    const pool = await connectToDB();
    
    // Generate a report number if not provided
    const reportNumber = report_number || Math.floor(Math.random() * 1000000);
    const reportDate = new Date().toISOString().split('T')[0];
    
    // Insert the report into the report table
    const [result] = await pool.query(
      'INSERT INTO report (client_id, results, report_number, report_date, report_name) VALUES (?, ?, ?, ?, ?)',
      [
        client_id, 
        analysis_results || '', 
        reportNumber,
        reportDate,
        title || 'Blood Test Report'
      ]
    );
    
    const insertResult = result as any;
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Report saved successfully',
      report_id: insertResult.insertId,
      report_number: reportNumber
    });
  } catch (error) {
    console.error('Error saving report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save report' },
      { status: 500 }
    );
  }
} 