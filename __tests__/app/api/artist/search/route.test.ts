/**
 * @jest-environment node
 */
import { GET } from '@/app/api/artist/search/route';

import { readableStreamToString } from '../../../../testUtils/testUtils';

jest.mock('@/lib/auth0', () => ({}));

describe('/artist/search API', () => {
  it('should return 500 when failing authorization', async () => {
    const res = await GET();

    const body = await readableStreamToString(res.body);

    expect(res.status).toBe(500);
    expect(body.message).toBe('Internal Server Error');
  });

  it.todo('should return 200 with artist search results when authorization is successful');
});
