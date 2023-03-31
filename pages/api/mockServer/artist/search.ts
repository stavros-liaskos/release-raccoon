import type { NextApiRequest, NextApiResponse } from 'next';
import headers from '../headers';
// import artistSearch from '../../../../mocks/responses/artist-search.json'; // TODO show fallback on dev mode (airplane mode..)

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
  const requestOptions = {
    method: 'GET',
    headers,
  };

  try {
    const response = await fetch(
      `https://release-raccoon.onrender.com/artist/search?pattern=${req.query.pattern}`,
      requestOptions,
    );
    const result = await response.text();
    res.status(200).json(JSON.parse(result));
  } catch (e) {
    console.error('error', e);
  }
}
