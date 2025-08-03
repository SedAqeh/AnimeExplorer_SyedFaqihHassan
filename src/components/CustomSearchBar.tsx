import React from 'react';
import { TextInput, View } from 'react-native';

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export default function CustomSearchBar({ value, onChange }: Props) {
  return (
    <View className="mt-6 rounded-md bg-white px-3 shadow-2xl">
      <TextInput
        placeholder="Search anime..."
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChange}
        className="py-2 text-sm"
      />
    </View>
  );
}
