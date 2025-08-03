import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomSearchBar from '../src/components/CustomSearchBar';

describe('CustomSearchBar', () => {
  it('renders input with correct value', () => {
    const { getByDisplayValue } = render(<CustomSearchBar value="Naruto" onChange={() => {}} />);
    expect(getByDisplayValue('Naruto')).toBeTruthy();
  });

  it('calls onChange when text is typed', () => {
    const onChangeMock = jest.fn();
    const { getByPlaceholderText } = render(<CustomSearchBar value="" onChange={onChangeMock} />);
    const input = getByPlaceholderText('Search anime...');
    fireEvent.changeText(input, 'Bleach');
    expect(onChangeMock).toHaveBeenCalledWith('Bleach');
  });
});
