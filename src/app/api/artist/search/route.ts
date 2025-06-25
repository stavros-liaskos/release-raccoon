import searchResults from '@/mocks/fixtures/responses/artist-search.json';
import { components } from '@/types/schema';
import { auth0 } from '@/lib/auth0';
import { NextResponse } from 'next/server';

export async function GET(): Promise<
  NextResponse<
    | components['schemas']['ArtistSearchResponse']
    | {
        error: string;
      }
  >
> {
  try {
    const accessToken = await auth0.getAccessToken();

    const response = await fetch('https://poc-working-be-ef1ac90ed45e.herokuapp.com/api/secured', {
      headers: {
        authorization: `Bearer ${accessToken.token}`,
        'content-type': 'application/json',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      method: 'GET',
    });
    const data = await response.json();
    return NextResponse.json({ ...searchResults, ...data });
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error', error: JSON.stringify(err) }, { status: 500 });
  }
}
