import type { NextApiRequest, NextApiResponse } from 'next';
import headers from '../headers';

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify(req.body),
  };

  try {
    const response = await fetch('https://release-raccoon.onrender.com/me/follow', requestOptions);
    const result = await response.text();
    res.status(200).json(JSON.parse(result));
  } catch (e) {
    console.error('error', e);
  }
}
