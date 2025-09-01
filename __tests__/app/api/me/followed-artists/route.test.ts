import { NextRequest } from 'next/server';

/**
 * @jest-environment node
 */
import { GET } from '@/app/api/me/followed-artists/route';
import readableStreamToString from '@/utils/readableStreamToString';

jest.mock('@/lib/auth0', () => ({}));

describe('/me/followed-artists API', () => {
  it('should return 200 and followed artists', async () => {
    const req = {
      nextUrl: new URL('http://localhost/me/followed-artists?page=1&offset=10'),
      headers: {
        get: (key: string) => {
          if (key === 'Authorization') {
            return 'Bearer test';
          }
          return null;
        },
      },
    } as unknown as NextRequest;
    const res = await GET(req);

    const body = await readableStreamToString(res.body);

    expect(res.status).toBe(200);
    expect(JSON.parse(body)).toHaveProperty('rows');
  });

  it.todo('handle success, handler error correctly');
});
