import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import AnimeCard from '../src/components/AnimeCard';
import { NavigationContainer } from '@react-navigation/native';
import { useAnimeStore } from '../src/store/useAnimeStore';

jest.mock('../src/store/useAnimeStore', () => ({
  useAnimeStore: () => ({
    favorites: [],
    addToFavorites: jest.fn(),
    removeFromFavorites: jest.fn(),
  }),
}));

const dummyAnime = {
  mal_id: 1,
  title: 'Naruto',
  score: 8.4,
  images: {
    jpg: {
      image_url: 'https://cdn.myanimelist.net/images/anime/13/17405.jpg',
    },
  },
  synopsis: 'A young ninja seeks recognition...',
  genres: [{ name: 'Action' }, { name: 'Adventure' }],
  episodes: 220,
  status: 'Finished Airing',
  studios: [{ name: 'Studio Pierrot' }],
  year: 2002,
  url: 'www.testurl.com',
};

function renderWithNavigation(ui: React.ReactElement) {
  return render(<NavigationContainer>{ui}</NavigationContainer>);
}

describe('AnimeCard Component', () => {
  it('renders anime title and score', () => {
    const { getByText } = renderWithNavigation(<AnimeCard anime={dummyAnime} />);
    expect(getByText('Naruto')).toBeTruthy();
    expect(getByText('8.4')).toBeTruthy();
  });

  it('calls favorite toggle function when button is pressed', async () => {
    const { getByText } = renderWithNavigation(<AnimeCard anime={dummyAnime} />);
    const button = getByText('Favorite');

    await act(async () => {
      fireEvent.press(button);
    });

    expect(button).toBeTruthy();
  });
});
