import { components } from '../types/schema';
import { Paths } from '../types/endpoints';

async function followArtist(artist: components['schemas']['SearchResultArtistDto'], cb?: () => void) {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  await fetch(Paths.Follow, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify(artist),
  })
    .then(() => {
      console.log(`${artist.name} followed successfully`);
    })
    .catch(error => {
      console.error('Error:', JSON.stringify(error));
    })
    .finally(() => {
      typeof cb === 'function' && cb();
    });
}
export default followArtist;
