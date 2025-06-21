import type { NextApiRequest, NextApiResponse } from 'next';
import { components } from '../../../types/schema';
import { auth0 } from '../../../lib/auth0';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<components['schemas']['ArtistSearchResponse']>,
) {
  try {
    const accessToken = await auth0.getAccessToken(req, res);

    const response = await fetch('https://poc-working-be-ef1ac90ed45e.herokuapp.com/api/secured', {
      headers: {
        authorization: `Bearer ${accessToken.token}`,
        'content-type': 'application/json',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      method: 'GET',
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    // @ts-ignore
    res.status(500).json({ error: 'Failed to call external API' });
  }
}
