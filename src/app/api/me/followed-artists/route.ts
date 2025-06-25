import { NextResponse } from 'next/server';

import followedArtists from '@/mocks/fixtures/responses/followed-artists.json';

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(followedArtists);
}
