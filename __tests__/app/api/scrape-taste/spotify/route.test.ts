/**
 * @jest-environment node
 */
import { GET } from '@/app/api/scrape-taste/spotify/route';
import readableStreamToString from '@/utils/readableStreamToString';

jest.mock('@/lib/auth0', () => ({})); // TODO remove this mock when proper auth0 mock is implemented
xdescribe('/scrape-taste/spotify API', () => {
  it('should return 200 and user', async () => {
    const res = await GET();

    const body = await readableStreamToString(res.body);

    expect(res.status).toBe(200);
    expect(body.message).toEqual('Scrapped Spotify successfully');
  });

  it.todo('test error');
});
