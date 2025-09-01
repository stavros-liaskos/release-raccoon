import { NextRequest, NextResponse } from 'next/server';

import { API_Paths } from '@/types/endpoints';

export async function POST(req: NextRequest): Promise<
  NextResponse<
    | { status: number }
    | {
        error: unknown;
      }
  >
> {
  try {
    const authorization = req.headers.get('Authorization');

    const response = await fetch(`${process.env.API_BASE_URL}/${API_Paths.EnableSrapeServices}`, {
      headers: {
        ...(authorization && { authorization }),
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
