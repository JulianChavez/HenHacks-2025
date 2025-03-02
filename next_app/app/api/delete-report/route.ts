import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/db';

export async function POST(request: Request) {
  try {
    const { report_number, client_id } = await request.json();

    // Validate input
    if (!report_number) {
      return NextResponse.json(
        { success: false, error: 'Report number is required' },
        { status: 400 }
      );
    }

    // Connect to the database
    const pool = await connectToDB();
    
    // Build the query based on available parameters
    let query = 'DELETE FROM report WHERE report_number = ?';
    let params = [report_number];
    
    // If client_id is provided, add it to the query for additional security
    if (client_id) {
      query += ' AND client_id = ?';
      params.push(client_id);
    }
    
    // Delete the report
    const [result] = await pool.query(query, params);
    
    const deleteResult = result as any;
    
    // Check if any rows were affected
    if (deleteResult.affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: 'No matching report found to delete' },
        { status: 404 }
      );
    }
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Report deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete report' },
      { status: 500 }
    );
  }
} 