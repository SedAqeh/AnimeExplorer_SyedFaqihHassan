import React from 'react';
import { TextInput } from 'react-native';

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export default function CustomSearchBar({ value, onChange }: Props) {
  return (
    <TextInput
      placeholder="Search anime..."
      value={value}
      onChangeText={onChange}
      className="mt-6 rounded-md bg-white px-3 py-2 text-sm shadow"
    />
  );
}
