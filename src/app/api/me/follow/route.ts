import { NextResponse } from 'next/server';

import follow from '@/mocks/fixtures/responses/follow.json';
import { components } from '@/types/schema';

export async function POST(): Promise<NextResponse<components['schemas']['SearchResultArtistDto']>> {
  return NextResponse.json(follow);
}
