import { NextResponse } from 'next/server';

import { auth0 } from '@/lib/auth0';

export async function DELETE(req: Request, { params }: { params: Promise<{ artist: string }> }): Promise<NextResponse> {
  try {
    const { artist } = await params;
    const accessToken = await auth0.getAccessToken();

    console.warn(req);
    const response = await fetch('https://poc-working-be-ef1ac90ed45e.herokuapp.com/api/secured', {
      headers: {
        authorization: `Bearer ${accessToken.token}`,
        'content-type': 'application/json',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      method: 'GET',
    });
    await response.json();
    return NextResponse.json({ message: `Unfollowed artist ID: ${artist}` }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error', error: JSON.stringify(err) }, { status: 500 });
  }
}
