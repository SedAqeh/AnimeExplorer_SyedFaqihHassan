import React, { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { useAnimeStore } from '../store/useAnimeStore';
import AnimeCard from '../components/AnimeCard';
import { loadFavorites } from '../utils/storage';
import CustomSearchBar from '../components/CustomSearchBar';

export default function FavoritesScreen() {
  const { favorites, setAnimeList } = useAnimeStore();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    loadFavorites().then((items) => {
      setAnimeList(items);
    });
  }, []);

  const filteredFavorites = favorites.filter((anime) =>
    anime.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View className="flex-1 bg-white px-4 pt-4">
      <Text className="mb-2 text-xl font-bold">Your Favorites</Text>

      <CustomSearchBar value={searchText} onChange={setSearchText} />

      {filteredFavorites.length === 0 ? (
        <Text className="mt-10 text-center text-gray-500">No favorites found.</Text>
      ) : (
        <FlatList
          data={filteredFavorites}
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
