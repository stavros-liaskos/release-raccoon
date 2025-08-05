/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';

import { GET } from '@/app/api/artist/search/route';
import readableStreamToString from '@/utils/readableStreamToString';

jest.mock('@/lib/auth0', () => ({}));

describe('/artist/search API', () => {
  it('should return 500 when failing authorization', async () => {
    const req = new NextRequest('https://localhost:3000/api/artist/search?pattern=JohnCage');
    const res = await GET(req);

    const body = await readableStreamToString(res.body);

    expect(res.status).toBe(500);
    expect(body.message).toBe('Internal Server Error');
  });

  it.todo('should return 200 with artist search results when authorization is successful');
});
