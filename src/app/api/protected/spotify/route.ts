import { NextRequest, NextResponse } from 'next/server';

import { auth0 } from '@/lib/auth0';
import { API_Paths, NavigationPaths, SpotifyPaths } from '@/types/endpoints';

const SPOTIFY_REDIRECT_URI = `https://release-raccoon.vercel.app${NavigationPaths.Spotify}`;

// Return spotify url for login
export const GET = auth0.withApiAuthRequired(async () => {
  try {
    const searchParams = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID!,
      scope: process.env.SPOTIFY_AUTH_SCOPES!,
      redirect_uri: SPOTIFY_REDIRECT_URI,
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
}) as (req: NextRequest) => Promise<NextResponse>;

// Send above code/state to BE. BE will get Spotify token, scrape user's followers and followed them in RR
export const POST = auth0.withApiAuthRequired(async (request: NextRequest) => {
  const authorization = request.headers.get('Authorization');

  try {
    const body = await request?.json();
    const code = body?.code;
    const state = body?.state;

    if (!code) {
      return NextResponse.json({ message: 'Code is required' }, { status: 400 });
    }

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
    const data = await response.json();

    return NextResponse.json({
      status: response.status,
      data,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to scrape spotify data', error }, { status: 500 });
  }
}) as (req: NextRequest) => Promise<NextResponse>;
