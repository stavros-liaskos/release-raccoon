import { components } from '../types/schema';
import { Paths } from '../types/endpoints';

async function unfollowArtist(artist: components['schemas']['SearchResultArtistDto']) {
  await fetch(`${Paths.UnfollowArtist}/${artist.id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
    .then(() => {
      console.log(`${artist.name} successfully unfollowed`);
    })
    .catch(error => {
      console.error(JSON.stringify(error));
    });
}
export default unfollowArtist;
