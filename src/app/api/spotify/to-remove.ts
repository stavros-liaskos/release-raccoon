import { NextRequest, NextResponse } from 'next/server';

import { auth0 } from '@/lib/auth0';
import { API_Paths, NavigationPaths, SpotifyPaths } from '@/types/endpoints';

const SPOTIFY_REDIRECT_URI = `https://release-raccoon.vercel.app${NavigationPaths.Spotify}`;

// Login to spotify and get code
export async function GET() {
  try {
    const searchParams = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID!,
      scope: process.env.SPOTIFY_AUTH_SCOPES!,
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

// Exchange above code for an access token
export async function POST(request: NextRequest) {
  const session = await auth0.getSession();
  const email = session?.user?.email;
  const authorization = request.headers.get('Authorization');

  if (!email) {
    return NextResponse.json({ message: 'User needs to login first' }, { status: 401 });
  }
  if (!authorization) {
    return NextResponse.json({ message: 'User is not authorized' }, { status: 401 });
  }

  try {
    const body = await request?.json();
    const code = body?.code;

    if (!code) {
      return NextResponse.json({ message: 'Code is required' }, { status: 400 });
    }

    const urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'authorization_code');
    urlencoded.append('code', code);
    urlencoded.append('redirect_uri', SPOTIFY_REDIRECT_URI);

    const base64Credentials = Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
    ).toString('base64');

    const response = await fetch(`${process.env.SPOTIFY_API_URL}${SpotifyPaths.Token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${base64Credentials}`,
      },
      body: urlencoded,
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          statusText: response.statusText,
          message: 'Failed to get access token',
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    const accessToken = data?.access_token;

    if (!accessToken) {
      return NextResponse.json({ message: 'Failed to get access token', error: data }, { status: 500 });
    }

    // Scrape Spotify with the access token
    const scrapeRes = await fetch(
      `${process.env.API_BASE_URL}/${API_Paths.ScrapeSpotify}?email=${encodeURIComponent(email)}&spotifyAccessToken=${encodeURIComponent(accessToken)}`,
      {
        headers: {
          ...(authorization && { authorization }),
          'content-type': 'text/plain',
        },
        method: 'GET',
      },
    );

    if (!scrapeRes.ok) {
      return NextResponse.json({ message: scrapeRes.statusText, status: scrapeRes.status });
    }

    return NextResponse.json({
      status: response.status,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to exchange code for token', error }, { status: 500 });
  }
}
