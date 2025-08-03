import { act } from 'react-test-renderer';
import { useAnimeStore } from '../src/store/useAnimeStore';

describe('useAnimeStore', () => {
  it('adds and removes favorite anime correctly', () => {
    const anime = {
      mal_id: 1,
      title: 'Test Anime',
      images: { jpg: { image_url: '' } },
      score: 8,
      synopsis: '',
      genres: [],
      episodes: 1,
      status: '',
      studios: [],
      year: 2024,
      url: 'www.testanime.com',
    };

    act(() => {
      useAnimeStore.getState().addToFavorites(anime);
    });
    expect(useAnimeStore.getState().favorites).toContainEqual(anime);

    act(() => {
      useAnimeStore.getState().removeFromFavorites(1);
    });
    expect(useAnimeStore.getState().favorites).not.toContainEqual(anime);
  });
});
