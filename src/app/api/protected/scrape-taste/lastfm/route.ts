import { NextRequest, NextResponse } from 'next/server';

import { auth0 } from '@/lib/auth0';
import { API_Paths } from '@/types/endpoints';

export const GET = auth0.withApiAuthRequired(async (req: NextRequest) => {
  try {
    const authorization = req.headers.get('Authorization');

    const response = await fetch(`${process.env.API_BASE_URL}/${API_Paths.ScrapeLastFM}?${req.nextUrl.searchParams}`, {
      headers: {
        ...(authorization && { authorization }),
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
}) as (req: NextRequest) => Promise<NextResponse>;
