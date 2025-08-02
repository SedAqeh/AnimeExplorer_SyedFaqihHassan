import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useAnimeStore } from '../store/useAnimeStore';
import AnimeCard from '../components/AnimeCard';
import { loadFavorites } from '../utils/storage';

export default function FavoritesScreen() {
  const { favorites, setAnimeList } = useAnimeStore();

  useEffect(() => {
    loadFavorites().then((items) => {
      setAnimeList(items);
    });
  }, []);

  return (
    <View className="flex-1 bg-white px-4 pt-4">
      <Text className="mb-4 text-xl font-bold">Your Favorites</Text>

      {favorites.length === 0 ? (
        <Text className="mt-10 text-center text-gray-500">No favorites yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.mal_id.toString()}
          renderItem={({ item }) => <AnimeCard anime={item} />}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
    </View>
  );
}
