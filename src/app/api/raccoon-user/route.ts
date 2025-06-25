import raccoonUser from '../../../../__tests__/mocks/fixtures/responses/raccoon-user.json';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(raccoonUser);
}
