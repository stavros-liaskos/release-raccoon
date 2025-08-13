import { NextResponse } from 'next/server';

import { API_Paths } from '@/types/endpoints';

export async function GET() {
  try {
    const searchParams = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID!,
      scope: process.env.SPOTIFY_AUTH_SCOPES!,
      redirect_uri: `${process.env.APP_BASE_URL}/${API_Paths.ScrapeSpotify}`,
      // state: state // TODO: implement state for CSRF protection
    });

    const response = await fetch(`${process.env.SPOTIFY_AUTH_URL}?${searchParams}`, {
      method: 'GET',
    });
    return NextResponse.json({
      status: response.status,
      url: response.url,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to get Spotify auth link', error }, { status: 500 });
  }
}
