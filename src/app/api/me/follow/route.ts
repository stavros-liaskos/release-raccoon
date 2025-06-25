import { components } from '@/types/schema';
import follow from '../../../../../__tests__/mocks/fixtures/responses/follow.json';

import { NextResponse } from 'next/server';

export async function POST(): Promise<NextResponse<components['schemas']['SearchResultArtistDto']>> {
  return NextResponse.json(follow);
}
