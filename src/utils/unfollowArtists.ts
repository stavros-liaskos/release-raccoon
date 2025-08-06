import { Paths } from '@/types/endpoints';
import { components } from '@/types/schema';

async function unfollowArtist(artist: components['schemas']['SearchResultArtistDto']) {
  if (!artist?.id) {
    // if artist was added via search, it does not have an id. Unfollow will fail silently
    console.error('Artist ID is required to unfollow an artist.');
    return;
  }

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
