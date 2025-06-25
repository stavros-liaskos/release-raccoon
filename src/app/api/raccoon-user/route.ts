import raccoonUser from '../../../../src/mocks/fixtures/responses/raccoon-user.json';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(raccoonUser);
}
