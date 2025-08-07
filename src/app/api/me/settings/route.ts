import { NextRequest, NextResponse } from 'next/server';

import { auth0 } from '@/lib/auth0';
import { API_Paths } from '@/types/endpoints';
import readableStreamToString from '@/utils/readableStreamToString';

export async function POST(req: NextRequest): Promise<
  NextResponse<
    | { status: number }
    | {
        error: unknown;
      }
  >
> {
  try {
    const body = await readableStreamToString(req.body);

    const accessToken = await auth0.getAccessToken();

    const response = await fetch(`${process.env.API_BASE_URL}/${API_Paths.Settings}`, {
      headers: {
        authorization: `Bearer ${accessToken.token}`,
        'content-type': 'application/json',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      method: 'POST',
      // body: JSON.stringify({
      //   notifyIntervalDays: 3,
      // }),
      body: JSON.stringify(body),
    });
    return NextResponse.json({ status: response.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}

export async function GET(): Promise<
  NextResponse<
    | { status: number }
    | {
        error: unknown;
      }
  >
> {
  try {
    const accessToken = await auth0.getAccessToken();

    const response = await fetch(`${process.env.API_BASE_URL}/${API_Paths.Settings}`, {
      headers: {
        authorization: `Bearer ${accessToken.token}`,
        'content-type': 'application/json',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      method: 'GET',
    });
    const data = await response.json();
    return NextResponse.json({ status: response.status, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}
