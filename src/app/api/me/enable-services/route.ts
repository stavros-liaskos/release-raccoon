import { NextResponse } from 'next/server';

import { auth0 } from '@/lib/auth0';
import { API_Paths } from '@/types/endpoints';

export async function POST(): Promise<
  NextResponse<
    | { status: number }
    | {
        error: unknown;
      }
  >
> {
  try {
    const accessToken = await auth0.getAccessToken();

    const response = await fetch(`${process.env.API_BASE_URL}/${API_Paths.EnableSrapeServices}`, {
      headers: {
        authorization: `Bearer ${accessToken.token}`,
        'content-type': 'application/json',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      method: 'GET',
    });
    return NextResponse.json({ status: response.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}
