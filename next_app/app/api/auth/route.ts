import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/db';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Connect to the database
    const pool = await connectToDB();
    
    // Query the database for the client using the clients table
    // IMPORTANT: In a production environment, passwords should be hashed
    // This is a simplified example for demonstration purposes
    const [rows] = await pool.query(
      'SELECT * FROM clients WHERE username = ? AND password = ?',
      [username, password]
    );

    // Check if client exists
    const clients = rows as any[];
    if (clients.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Client authenticated successfully
    const client = clients[0];
    
    // Don't send the password back to the client
    delete client.password;

    return NextResponse.json({
      success: true,
      client: client
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
} 