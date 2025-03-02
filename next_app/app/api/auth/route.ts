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
    const [clientRows] = await pool.query(
      'SELECT * FROM clients WHERE username = ? AND password = ?',
      [username, password]
    );

    // Check if client exists
    const clients = clientRows as any[];
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
    
    // Get user health information from userinformation table
    try {
      const [userInfoRows] = await pool.query(
        'SELECT age, gender, diseases FROM userinformation WHERE client_id = ?',
        [client.client_id]
      );
      
      const userInfo = userInfoRows as any[];
      if (userInfo.length > 0) {
        // Add health information to the client object
        client.health_info = {
          age: userInfo[0].age,
          gender: userInfo[0].gender,
          diseases: userInfo[0].diseases
        };
      }
    } catch (infoError) {
      console.error('Error fetching user health information:', infoError);
      // Continue even if we can't get health info
    }

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