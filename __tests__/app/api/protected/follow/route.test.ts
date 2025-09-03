/**
 * @jest-environment node
 */
import { POST } from '@/app/api/protected/follow/route';
import readableStreamToString from '@/utils/readableStreamToString';

xdescribe('/protected/follow API', () => {
  it('should return 200 and followed artist', async () => {
    const res = await POST();

    const body = await readableStreamToString(res.body);

    expect(res.status).toBe(200);
    expect(body.id).toEqual(1700);
  });

  it.todo('handle error');
});
