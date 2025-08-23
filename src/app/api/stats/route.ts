import { NextResponse } from 'next/server';

import { API_Paths } from '@/types/endpoints';

export async function GET() {
  try {
    // Fetch from the backend API using environment variable
    const apiUrl = `${process.env.API_BASE_URL}/${API_Paths.Stats}`;
    console.log('Fetching stats from:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Stats API response:', data);
    
    // Validate the response structure
    if (data && typeof data.artistCount === 'number' && typeof data.releaseCount === 'number') {
      return NextResponse.json(data);
    } else {
      console.warn('Invalid stats response structure, using defaults');
      return NextResponse.json({
        artistCount: 34705,
        releaseCount: 46899
      });
    }
  } catch (error) {
    console.error('Error fetching stats:', error);
    // Return default stats to keep the UI functional
    return NextResponse.json({
      artistCount: 34705,
      releaseCount: 46899
    });
  }
}