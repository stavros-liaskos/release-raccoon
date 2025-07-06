/**
 * @jest-environment node
 */
import { GET } from '@/app/api/artists/recommended/route';

import { readableStreamToString } from '../../../../testUtils/testUtils';

describe('/artists/recommended API', () => {
  it('should return 200 and recommended artists', async () => {
    const res = await GET();

    const body = await readableStreamToString(res.body);

    expect(res.status).toBe(200);
    expect(body.rows).toHaveLength(4);
    expect(body.total).toEqual(4);
  });

  it.todo('handle error');
});
