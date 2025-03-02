import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const reportName = formData.get('reportName') as string;
    const reportDate = formData.get('reportDate') as string;
    const reportNumber = formData.get('reportNumber') as string;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Convert the file to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a safe filename using the report number
    const safeName = reportNumber.replace(/[^a-zA-Z0-9-]/g, '_');
    const fileName = `${safeName}.pdf`;
    
    // Save to the public/uploads directory
    const path = join(process.cwd(), 'public', 'uploads', fileName);
    await writeFile(path, buffer);
    
    // Save metadata (in a real app, you'd save this to a database)
    const fileUrl = `/uploads/${fileName}`;
    
    // Call the Python script to analyze the PDF
    try {
      // Pass the PDF path to the Python script
      console.log(`Executing Python script with path: ${path}`);
      const { stdout, stderr } = await execPromise(`python ${join(process.cwd(), 'bloodanalysis.py')} ${path}`);
      
      if (stderr) {
        // Log stderr but don't treat it as an error - it now contains our debug info
        console.log('Python script debug output:');
        console.log(stderr);
      }
      
      // Log the raw stdout for debugging
      console.log('Raw Python script output (should be clean JSON):');
      console.log(stdout);
      
      // Parse the analysis results - stdout should now be clean JSON
      let analysisResults;
      try {
        // Trim any whitespace to be safe
        const cleanOutput = stdout.trim();
        analysisResults = JSON.parse(cleanOutput);
        console.log('Parsed analysis results:');
        console.log(JSON.stringify(analysisResults, null, 2));
      } catch (e) {
        console.error('Error parsing Python output:', e);
        console.error('Raw output that failed to parse:', stdout);
        analysisResults = { text: stdout };
      }
      
      // Return success response with file details and analysis results
      return NextResponse.json({ 
        success: true,
        fileName,
        reportName,
        reportDate,
        reportNumber,
        fileUrl,
        analysis: analysisResults
      });
      
    } catch (pythonError) {
      console.error('Error running Python script:', pythonError);
      // Still return success for the upload, but note the analysis failed
      return NextResponse.json({ 
        success: true,
        fileName,
        reportName,
        reportDate,
        reportNumber,
        fileUrl,
        analysisError: 'Failed to analyze the PDF'
      });
    }
    
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
} 