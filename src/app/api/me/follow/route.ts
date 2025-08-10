import { NextRequest, NextResponse } from 'next/server';

import { API_Paths } from '@/types/endpoints';
import readableStreamToString from '@/utils/readableStreamToString';

export async function POST(req: NextRequest) {
  try {
    const body = await readableStreamToString(req.body);

    const authorization = req.headers.get('Authorization');

    const response = await fetch(`${process.env.API_BASE_URL}/${API_Paths.Follow}`, {
      headers: {
        ...(authorization && { authorization }),
        'content-type': 'application/json',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      method: 'POST',
      body: JSON.stringify(body),
    });
    return NextResponse.json({ status: response.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}
