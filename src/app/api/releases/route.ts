import { NextRequest, NextResponse } from 'next/server';

import { API_Paths } from '@/types/endpoints';

export const GET = async (req: NextRequest) => {
  try {
    const authorization = req.headers.get('Authorization');
    const { searchParams } = req.nextUrl;
    const days = searchParams.get('days');

    let url = `${process.env.API_BASE_URL}/${API_Paths.FollowedArtistsReleases}`;
    if (days) {
      const params = new URLSearchParams({ days });
      url += `?${params.toString()}`;
    }

    const response = await fetch(url, {
      headers: {
        ...(authorization && { authorization }),
        'content-type': 'application/json',
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
    return NextResponse.json({ message: 'Internal Server Error', error: JSON.stringify(error) }, { status: 500 });
  }
};
