import { Paths } from '@/types/endpoints';
import { components } from '@/types/schema';

async function followArtist(artist: components['schemas']['SearchResultArtistDto'], cb?: () => void) {
  await fetch(Paths.Follow, {
    method: 'POST',
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
