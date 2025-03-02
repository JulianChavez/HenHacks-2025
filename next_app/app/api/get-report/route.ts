import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/db';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const reportNumber = url.searchParams.get('report_number');
    const clientId = url.searchParams.get('client_id');

    // Validate input
    if (!reportNumber) {
      return NextResponse.json(
        { success: false, error: 'Report number is required' },
        { status: 400 }
      );
    }

    // Connect to the database
    const pool = await connectToDB();
    
    // Build the query based on available parameters
    let query = 'SELECT * FROM report WHERE report_number = ?';
    let params = [reportNumber];
    
    // If client_id is provided, add it to the query
    if (clientId) {
      query += ' AND client_id = ?';
      params.push(clientId);
    }
    
    // Get the report
    const [rows] = await pool.query(query, params);
    const reports = rows as any[];
    
    if (reports.length === 0) {
      return NextResponse.json(
        { success: false, error: `Report with number ${reportNumber} not found` },
        { status: 404 }
      );
    }
    
    // Return success response with the first matching report
    return NextResponse.json({
      success: true,
      report: reports[0]
    });
  } catch (error) {
    console.error('Error retrieving report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve report' },
      { status: 500 }
    );
  }
} 