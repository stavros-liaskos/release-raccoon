/**
 * @jest-environment node
 */
import { GET } from '../../../../../../src/app/api/scrape-taste/lastfm/route';
import { readableStreamToString } from '../../../../../../src/utils/test-utils';

describe('/scrape-taste/lastfm API', () => {
  it('should return 200 and user', async () => {
    const res = await GET();

    const body = await readableStreamToString(res.body);

    expect(res.status).toBe(200);
    expect(body.message).toEqual('Scrapped LastFM successfully');
  });

  it.todo('test error');
});
