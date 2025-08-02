import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Anime, useAnimeStore } from '../store/useAnimeStore';
import { saveFavorites } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = {
  anime: Anime;
  showFavoriteButton?: boolean;
};

export default function AnimeCard({ anime, showFavoriteButton = true }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { favorites, addToFavorites, removeFromFavorites } = useAnimeStore();

  const isFavorited = favorites.some((fav) => fav.mal_id === anime.mal_id);

  const toggleFavorite = () => {
    if (isFavorited) {
      removeFromFavorites(anime.mal_id);
    } else {
      addToFavorites(anime);
    }
    saveFavorites(
      isFavorited ? favorites.filter((f) => f.mal_id !== anime.mal_id) : [...favorites, anime]
    );
  };

  return (
    <TouchableOpacity
      className="mb-3 w-[48%] rounded-xl bg-white p-2 shadow"
      onPress={() => navigation.navigate('Detail', { animeId: anime.mal_id })}>
      <Image
        source={{ uri: anime.images.jpg.image_url }}
        className="h-44 w-full rounded-md"
        resizeMode="cover"
      />
      <View className="mt-2">
        <Text numberOfLines={2} className="text-sm font-bold">
          {anime.title}
        </Text>
        <Text className="text-xs text-gray-600">Score: {anime.score ?? 'N/A'}</Text>
        {showFavoriteButton && (
          <TouchableOpacity onPress={toggleFavorite}>
            <Text className="mt-1 text-xs text-red-500">
              {isFavorited ? '♥ Unfavorite' : '♡ Favorite'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}
