import { NextRequest, NextResponse } from 'next/server';

import { API_Paths } from '@/types/endpoints';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const authorization = req.headers.get('Authorization');
    const response = await fetch(`${process.env.API_BASE_URL}/${API_Paths.FollowedArtists}`, {
      headers: {
        ...(authorization && { authorization }),
        'content-type': 'application/json',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      method: 'GET',
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error', error: JSON.stringify(error) }, { status: 500 });
  }
}
