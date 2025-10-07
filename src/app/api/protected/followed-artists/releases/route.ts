import { NextRequest, NextResponse } from 'next/server';

import { auth0 } from '@/lib/auth0';
import { API_Paths } from '@/types/endpoints';

export const GET = auth0.withApiAuthRequired(async (req: NextRequest) => {
  try {
    const authorization = req.headers.get('Authorization');
    const searchParams = req.nextUrl.searchParams;
    const days = searchParams.get('days');

    const url = days
      ? `${process.env.API_BASE_URL}/${API_Paths.FollowedArtistsReleases}?days=${days}`
      : `${process.env.API_BASE_URL}/${API_Paths.FollowedArtistsReleases}`;

    const response = await fetch(url, {
      headers: {
        ...(authorization && { authorization }),
        'content-type': 'application/json',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Backend API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching followed artists releases:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: JSON.stringify(error) },
      { status: 500 },
    );
  }
}) as (req: NextRequest) => Promise<NextResponse>;