import followedArtists from '../../../../../__tests__/mocks/fixtures/responses/followed-artists.json';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(followedArtists);
}
