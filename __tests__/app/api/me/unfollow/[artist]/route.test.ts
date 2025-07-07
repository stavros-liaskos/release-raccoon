/**
 * @jest-environment node
 */
import { DELETE } from '@/app/api/me/unfollow/[artist]/route';

import { readableStreamToString } from '../../../../../testUtils/testUtils';
import { unfollowRequestMock } from './unfollowRequestMock';

jest.mock('@/lib/auth0', () => ({}));

describe('/me/followed-artists API', () => {
  it('should return 500 when failing to DELETE', async () => {
    const res = await DELETE(unfollowRequestMock, { params: Promise.resolve({ artist: '1700' }) });

    const body = await readableStreamToString(res.body);

    expect(res.status).toBe(500);
    expect(body.message).toBe('Internal Server Error');
  });

  it.todo('test success');
});
