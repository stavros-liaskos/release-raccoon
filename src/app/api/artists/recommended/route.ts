import { NextRequest, NextResponse } from 'next/server';

import { API_Paths } from '@/types/endpoints';

export async function GET(req: NextRequest) {
  try {
    const authorization = req.headers.get('Authorization');

    // const response = await fetch(`${process.env.API_BASE_URL}/${API_Paths.Recommended}?${req.nextUrl.searchParams}`, {
    const response = await fetch(`${process.env.API_BASE_URL}/${API_Paths.Recommended}?page=1&size=10`, {
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
    return NextResponse.json(data.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}
