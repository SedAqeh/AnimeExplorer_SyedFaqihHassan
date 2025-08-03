import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import GenreDropdown from '../src/components/GenreDropdown';
import * as jikan from '../src/api/jikan';

jest.mock('../src/store/useAnimeStore', () => ({
  useAnimeStore: () => ({
    selectedGenre: null,
    setSelectedGenre: jest.fn(),
  }),
}));

describe('GenreDropdown', () => {
  beforeEach(() => {
    jest.spyOn(jikan, 'getGenres').mockResolvedValue({
      data: [
        { mal_id: 1, name: 'Action' },
        { mal_id: 2, name: 'Adventure' },
      ],
    });
  });

  it('renders the picker component', async () => {
    const { getByTestId } = render(<GenreDropdown />);
    const picker = await waitFor(() => getByTestId('genre-picker'));
    expect(picker).toBeTruthy();
  });
});
