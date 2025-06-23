import recommended from '../../../../mocks/fixtures/responses/recommended.json';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(recommended);
}
