import { NextRequest } from 'next/server';

/**
 * @jest-environment node
 */
import { GET } from '@/app/api/releases/route';

function getRequest(queryInString: string = '') {
  return {
    nextUrl: new URL('http://localhost/api/releases' + queryInString),
    headers: {
      get: (key: string) => {
        if (key === 'Authorization') {
          return 'Bearer test';
        }
        return null;
      },
    },
  } as unknown as NextRequest;
}

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

describe('/releases API', () => {
  it.each(
    // @ts-ignore
    [{ query: '' }, { query: '?days=7' }],
    'should return 200 and followed artists releases',
    async ({ query }: { query: string }) => {
      const res = await GET(getRequest(query));

      expect(res.status).toBe(200);
    },
  );

  it.todo('handle backend error correctly');
});
