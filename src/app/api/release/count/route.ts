import { NextResponse } from 'next/server';

import { API_Paths } from '@/types/endpoints';

export async function GET() {
  try {
    // Fetch from the backend API using environment variable
    const apiUrl = `${process.env.API_BASE_URL}/${API_Paths.ReleaseCount}`;
    console.log('Fetching release count from:', apiUrl);

    const response = await fetch(apiUrl, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    // Try to parse the response as text first, then convert to number
    const text = await response.text();
    console.log('Release count API response:', text);

    // Check if it's a plain number
    const count = parseInt(text, 10);
    if (!isNaN(count)) {
      console.log('Parsed count as number:', count);
      return NextResponse.json(count);
    }

    // Otherwise try to parse as JSON
    try {
      const jsonData = JSON.parse(text);
      console.log('Parsed count as JSON:', jsonData);
      return NextResponse.json(jsonData);
    } catch {
      // If all else fails, return a default
      console.warn('Could not parse release count response, using default:', text);
      return NextResponse.json(8500);
    }
  } catch (error) {
    console.error('Error fetching release count:', error);
    // Return a default count instead of error to keep the UI functional
    return NextResponse.json(8500);
  }
}
