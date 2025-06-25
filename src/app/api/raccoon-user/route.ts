import { NextResponse } from 'next/server';

import raccoonUser from '@/mocks/fixtures/responses/raccoon-user.json';

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(raccoonUser);
}
