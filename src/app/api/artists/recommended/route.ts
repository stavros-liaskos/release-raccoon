import { NextResponse } from 'next/server';

import recommended from '@/mocks/fixtures/responses/recommended.json';

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(recommended);
}
