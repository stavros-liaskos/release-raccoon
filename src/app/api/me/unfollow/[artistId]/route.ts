import { NextRequest, NextResponse } from 'next/server';

import { auth0 } from '@/lib/auth0';
import { API_Paths } from '@/types/endpoints';

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ artistId: string }> },
): Promise<NextResponse> {
  try {
    const { artistId } = await params;
    const accessToken = await auth0.getAccessToken();

    const response = await fetch(`${process.env.API_BASE_URL}/${API_Paths.UnfollowArtist}/${artistId}`, {
      headers: {
        authorization: `Bearer ${accessToken.token}`,
        'content-type': 'application/json',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return NextResponse.json({ message: `Unfollowed artist ID: ${artistId}` }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error', error: JSON.stringify(error) }, { status: 500 });
  }
}
