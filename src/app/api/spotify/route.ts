import { NextRequest, NextResponse } from 'next/server';

import { API_Paths, NavigationPaths, SpotifyPaths } from '@/types/endpoints';

const SPOTIFY_REDIRECT_URI = `https://release-raccoon.vercel.app${NavigationPaths.Spotify}`;

// Login to spotify and get code
export async function GET() {
  try {
    const searchParams = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID!,
      // scope: process.env.SPOTIFY_AUTH_SCOPES!, // TODO is it needed?
      redirect_uri: SPOTIFY_REDIRECT_URI,
      // state: state // TODO: implement state for CSRF protection
    });

    const response = await fetch(`${process.env.SPOTIFY_API_URL}${SpotifyPaths.Authorize}?${searchParams}`, {
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

// Send above code/state to BE. BE will get Spotify token, scrape user's followers and followed them in RR
export async function POST(request: NextRequest) {
  const authorization = request.headers.get('Authorization');

  if (!authorization) {
    return NextResponse.json({ message: 'User is not authorized' }, { status: 401 });
  }

  try {
    const body = await request?.json();
    const code = body?.code;
    const state = body?.state;

    if (!code) {
      return NextResponse.json({ message: 'Code is required' }, { status: 400 });
    }

    console.warn(JSON.stringify({ code, state }));
    const response = await fetch(`${process.env.API_BASE_URL}/${API_Paths.ScrapeSpotifyWithAuth}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authorization && { authorization }),
      },
      body: JSON.stringify({ code, state }),
    });

    if (!response.ok) {
      console.error(response.statusText);
      return NextResponse.json(
        {
          statusText: response.statusText,
          message: 'Failed to scrape Spotify data',
        },
        { status: response.status },
      );
    }

    return NextResponse.json({
      status: response.status,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to scrape spotify data', error }, { status: 500 });
  }
}
