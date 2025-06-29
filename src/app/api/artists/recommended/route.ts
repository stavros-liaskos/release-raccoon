import { NextResponse } from 'next/server';

import recommended from '@/mocks/fixtures/responses/recommended.json';

export async function GET(): Promise<NextResponse> {
  await new Promise(resolve => setTimeout(resolve, 3000));
  return NextResponse.json(recommended);
}
