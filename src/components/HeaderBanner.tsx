import React from 'react';
import { View, Text } from 'react-native';

export default function HeaderBanner() {
  return (
    <View className="mb-4">
      <Text className="text-center text-4xl font-extrabold text-white">Anime Explorer</Text>
      <Text className="mt-1 text-center text-sm text-white">
        Find your next obsession, one anime at a time.
      </Text>
    </View>
  );
}
