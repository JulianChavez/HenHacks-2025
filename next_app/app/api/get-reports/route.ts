import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/db';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const clientId = url.searchParams.get('client_id');

    // Validate input
    if (!clientId) {
      return NextResponse.json(
        { success: false, error: 'Client ID is required' },
        { status: 400 }
      );
    }

    // Connect to the database
    const pool = await connectToDB();
    
    // Get reports for the client
    const [rows] = await pool.query(
      'SELECT * FROM report WHERE client_id = ?',
      [clientId]
    );
    
    const reports = rows as any[];
    
    // Return success response
    return NextResponse.json({
      success: true,
      reports: reports
    });
  } catch (error) {
    console.error('Error retrieving reports:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve reports' },
      { status: 500 }
    );
  }
} 