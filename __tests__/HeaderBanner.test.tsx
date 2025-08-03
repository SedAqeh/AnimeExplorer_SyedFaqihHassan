import React from 'react';
import { render } from '@testing-library/react-native';
import HeaderBanner from '../src/components/HeaderBanner';

describe('HeaderBanner', () => {
  it('displays main title and subtitle', () => {
    const { getByText } = render(<HeaderBanner />);
    expect(getByText('Anime Explorer')).toBeTruthy();
    expect(getByText('Find your next obsession, one anime at a time.')).toBeTruthy();
  });
});
