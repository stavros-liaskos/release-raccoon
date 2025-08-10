import { NextRequest, NextResponse } from 'next/server';

import { auth0 } from '@/lib/auth0';
import { API_Paths } from '@/types/endpoints';

export async function GET(
  req: NextRequest,
): Promise<NextResponse<{ status: number; message: string } | { error: unknown }>> {
  try {
    const accessToken = await auth0.getAccessToken();

    const response = await fetch(`${process.env.API_BASE_URL}/${API_Paths.ScrapeLastFM}?${req.nextUrl.searchParams}`, {
      headers: {
        authorization: `Bearer ${accessToken.token}`,
        'content-type': 'text/plain',
      },
      method: 'GET',
    });
    const message = await response.text();
    console.warn(message);
    return NextResponse.json({ status: response.status, message: 'Scraping LastFM data' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}
