import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getAnimeDetail } from '../api/jikan';
import { Anime, useAnimeStore } from '../store/useAnimeStore';
import { saveFavorites } from '../utils/storage';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

export default function DetailScreen() {
  const route = useRoute<DetailRouteProp>();
  const { animeId } = route.params;

  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);

  const { favorites, addToFavorites, removeFromFavorites } = useAnimeStore();

  const isFavorited = favorites.some((a) => a.mal_id === animeId);

  const toggleFavorite = () => {
    if (!anime) return;

    if (isFavorited) {
      removeFromFavorites(anime.mal_id);
    } else {
      addToFavorites(anime);
    }

    saveFavorites(
      isFavorited ? favorites.filter((f) => f.mal_id !== anime.mal_id) : [...favorites, anime]
    );
  };

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await getAnimeDetail(animeId);
        setAnime(res.data);
      } catch (err) {
        console.error('Failed to load detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [animeId]);

  if (loading || !anime) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Image
        source={{ uri: anime.images.jpg.image_url }}
        className="h-64 w-full rounded-xl"
        resizeMode="cover"
      />
      <Text className="mt-4 text-2xl font-bold">{anime.title}</Text>
      <Text className="mt-1 text-sm text-gray-600">Score: {anime.score ?? 'N/A'}</Text>

      <View className="mt-2 flex-row flex-wrap gap-2">
        {anime.genres.map((g) => (
          <View key={g.name} className="mb-2 mr-2 rounded-full bg-gray-200 px-2 py-1">
            <Text className="text-xs">{g.name}</Text>
          </View>
        ))}
      </View>

      <Text className="mt-4 text-base text-gray-800">{anime.synopsis}</Text>

      <TouchableOpacity onPress={toggleFavorite} className="mt-6 rounded-xl bg-red-500 py-3">
        <Text className="text-center text-base font-semibold text-white">
          {isFavorited ? '♥ Unfavorite' : '♡ Add to Favorites'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
