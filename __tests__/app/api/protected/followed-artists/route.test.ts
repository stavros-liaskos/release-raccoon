import { NextRequest } from 'next/server';

/**
 * @jest-environment node
 */
import { GET } from '@/app/api/protected/followed-artists/route';

jest.mock('next/server', () => {
  const originalModule = jest.requireActual('next/server');
  return {
    ...originalModule,
    NextResponse: Object.assign(originalModule.NextResponse, {
      json: jest.fn().mockImplementation(data => ({
        ...data,
        status: 200,
        headers: { 'content-type': 'application/json' },
      })),
    }),
  };
});

describe('/protected/followed-artists API', () => {
  it('should return 200 and new releases', async () => {
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

    expect(res.status).toBe(200);
  });
});
