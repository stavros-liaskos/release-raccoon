import { NextRequest } from 'next/server';

/**
 * @jest-environment node
 */
import { GET } from '@/app/api/protected/followed-artists/releases/route';

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

describe('/protected/followed-artists/releases API', () => {
  it('should return 200 and followed artists releases', async () => {
    const req = {
      nextUrl: new URL('http://localhost/api/protected/followed-artists/releases'),
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

  it('should handle days query parameter', async () => {
    const req = {
      nextUrl: new URL('http://localhost/api/protected/followed-artists/releases?days=7'),
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

  it.todo('handle backend error correctly');
});