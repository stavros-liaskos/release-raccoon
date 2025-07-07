import { NextResponse } from 'next/server';

import { auth0 } from '@/lib/auth0';

export async function GET(): Promise<NextResponse> {
  try {
    const accessToken = await auth0.getAccessToken();

    const response = await fetch(`${process.env.API_BASE_URL}/me/followed-artists`, {
      headers: {
        authorization: `Bearer ${accessToken.token}`,
        'content-type': 'application/json',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      method: 'GET',
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error', error: JSON.stringify(err) }, { status: 500 });
  }
}
