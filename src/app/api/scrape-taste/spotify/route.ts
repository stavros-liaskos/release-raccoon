import { NextRequest, NextResponse } from 'next/server';

import { API_Paths } from '@/types/endpoints';

// TODO: spotify has a different flow. Needs to redirect and login in spotify.
// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
// API KEY available in env vars

export async function GET(req: NextRequest) {
  try {
    const authorization = req.headers.get('Authorization');

    const response = await fetch(`${process.env.API_BASE_URL}/${API_Paths.ScrapeSpotify}`, {
      headers: {
        ...(authorization && { authorization }),
        'content-type': 'text/plain',
      },
      method: 'GET',
    });
    const message = await response.text();
    console.warn(message);
    return NextResponse.json({ status: response.status, message });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}
