import { NextResponse } from 'next/server';

import { auth0 } from '@/lib/auth0';
import { API_Paths } from '@/types/endpoints';
import { components } from '@/types/schema';

export async function GET(): Promise<
  NextResponse<
    | components['schemas']['FollowedArtistsResponse']
    | {
        error: unknown;
      }
  >
> {
  try {
    const accessToken = await auth0.getAccessToken();

    const response = await fetch(`${process.env.API_BASE_URL}/${API_Paths.Recommended}`, {
      headers: {
        authorization: `Bearer ${accessToken.token}`,
        'content-type': 'application/json',
      },
      method: 'GET',
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}
