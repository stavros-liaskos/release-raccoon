/**
 * @jest-environment node
 */
import { GET } from '@/app/api/raccoon-user/route';
import readableStreamToString from '@/utils/readableStreamToString';

jest.mock('@/lib/auth0', () => ({})); // TODO remove this mock when proper auth0 mock is implemented
xdescribe('/raccoon-user API', () => {
  it('should return 200 and user', async () => {
    const res = await GET();

    const body = await readableStreamToString(res.body);

    expect(res.status).toBe(200);
    expect(body[0]).toMatchObject({
      createDate: '2024-06-23T10:05:44.56098',
      email: 'john.doe@gmail.com',
      id: 2,
      lastLastFmScrape: '2023-06-23T10:05:44.560601',
      lastSpotifyScrape: '2023-06-23T10:05:44.560588',
      modifyDate: '2024-06-24T19:38:53.817535',
      spotifyEnabled: true,
    });
  });

  it.todo('test error');
});
