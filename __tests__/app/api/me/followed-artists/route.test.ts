/**
 * @jest-environment node
 */
import { GET } from '@/app/api/me/followed-artists/route';

import { readableStreamToString } from '../../../../testUtils/testUtils';

jest.mock('@/lib/auth0', () => ({}));

describe('/me/followed-artists API', () => {
  it('should return 500 and followed artist', async () => {
    const res = await GET();

    const body = await readableStreamToString(res.body);

    expect(res.status).toBe(500);
  });

  it.todo('handle success, handler error correctly');
});
