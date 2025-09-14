import { NextRequest, NextResponse } from 'next/server';

import { auth0 } from '@/lib/auth0';
import { API_Paths } from '@/types/endpoints';

export const GET = auth0.withApiAuthRequired(async (req: NextRequest) => {
  try {
    const authorization = req.headers.get('Authorization');
    const searchParams = req.nextUrl.searchParams;
    const page = Number(searchParams.get('page')) || 0;
    const offset = Number(searchParams.get('offset')) || 10;

    const response = await fetch(`${process.env.API_BASE_URL}/${API_Paths.Recommended}?page=${page}&offset=${offset}`, {
      headers: {
        ...(authorization && { authorization }),
        'content-type': 'application/json',
      },
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`Error fetching recommended artists: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(`${process.env.API_BASE_URL}/${API_Paths.Recommended}?page=${page}&offset=${offset}`);
    console.warn(data);
    return NextResponse.json(data.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}) as (req: NextRequest) => Promise<NextResponse>;
