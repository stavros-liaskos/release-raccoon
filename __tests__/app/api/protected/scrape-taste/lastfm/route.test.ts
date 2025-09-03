/**
 * @jest-environment node
 */
import { GET } from '@/app/api/protected/scrape-taste/lastfm/route';
import readableStreamToString from '@/utils/readableStreamToString';

xdescribe('/scrape-taste/lastfm API', () => {
  it('should return 200 and user', async () => {
    const res = await GET();

    const body = await readableStreamToString(res.body);

    expect(res.status).toBe(200);
    expect(body.message).toEqual('Scrapped LastFM successfully');
  });

  it.todo('test error');
});
