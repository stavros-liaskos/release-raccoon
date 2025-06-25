/**
 * @jest-environment node
 */
import { GET } from '../../../../../../src/app/api/me/followed-artists/route';
import { readableStreamToString } from '../../../../../../src/utils/test-utils';

describe('/me/followed-artists API', () => {
  it('should return 200 and followed artist', async () => {
    const res = await GET();

    const body = await readableStreamToString(res.body);

    expect(res.status).toBe(200);
    expect(body.rows).toHaveLength(2);
  });

  it.todo('handle error');
});
