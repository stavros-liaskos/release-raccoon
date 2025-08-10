import { NextResponse } from 'next/server';

import { auth0 } from '@/lib/auth0';
import { API_Paths } from '@/types/endpoints';

export async function GET(): Promise<NextResponse> {
  try {
    const accessToken = await auth0.getAccessToken({ refresh: true });

    const response = await fetch(`${process.env.API_BASE_URL}/${API_Paths.FollowedArtists}`, {
      headers: {
        authorization: `Bearer ${accessToken.token}`,
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
