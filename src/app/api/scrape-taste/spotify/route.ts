import { NextRequest, NextResponse } from 'next/server';

import { auth0 } from '@/lib/auth0';
import { API_Paths } from '@/types/endpoints';

// Authorize Spotify flow
export async function GET(req: NextRequest) {
  console.warn(req);
  try {
    const session = await auth0.getSession();
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json({ message: 'User needs to login first' }, { status: 401 });
    }

    const authorization = req.headers.get('Authorization');

    const response = await fetch(
      `${process.env.API_BASE_URL}/${API_Paths.ScrapeSpotify}?email=${encodeURIComponent(email)}`,
      {
        headers: {
          ...(authorization && { authorization }),
          'content-type': 'text/plain',
        },
        method: 'GET',
      },
    );
    const message = await response.text();
    console.warn(message);
    return NextResponse.json({ status: response.status, message });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}
