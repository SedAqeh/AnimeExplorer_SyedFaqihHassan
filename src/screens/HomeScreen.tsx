import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, View, Text } from 'react-native';
import AnimeCard from '../components/AnimeCard';
import { getAnimeList } from '../api/jikan';
import { useAnimeStore } from '../store/useAnimeStore';
import GenreDropdown from '../components/GenreDropdown';
import AnimeCardPlaceholder from '../components/AnimeCardPlaceholder';

export default function HomeScreen() {
  const { animeList, setAnimeList, clearAnimeList, selectedGenre } = useAnimeStore();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchAnime = async (reset = false) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const genreId = selectedGenre ? parseInt(selectedGenre) : undefined;
      const res = await getAnimeList(reset ? 1 : page, genreId, 10); // ⬅️ loads 10 anime per page

      const newAnime = reset ? res.data : [...animeList, ...res.data];

      setAnimeList(newAnime);
      setHasMore(res.pagination.has_next_page);
      setPage(reset ? 2 : page + 1);
    } catch (err) {
      console.error('Failed to fetch anime:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    clearAnimeList();
    setPage(1);
    setHasMore(true);
    fetchAnime(true);
  }, [selectedGenre]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    clearAnimeList();
    await fetchAnime(true); // reset = true
    setRefreshing(false);
  };

  return (
    <View className="flex-1 bg-gray-50 px-4 pt-4">
      <View className="mb-6">
        <Text className="text-center text-4xl font-extrabold text-pink-600">Anime Explorer</Text>
        <Text className="mt-1 text-center text-sm text-gray-500">
          Find your next obsession, one anime at a time.
        </Text>
      </View>

      <GenreDropdown />

      {loading && animeList.length === 0 ? (
        <View className="flex-row flex-wrap justify-between px-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <AnimeCardPlaceholder key={idx} />
          ))}
        </View>
      ) : (
        <FlatList
          data={animeList}
          keyExtractor={(item) => item.mal_id.toString()}
          renderItem={({ item }) => <AnimeCard anime={item} />}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 80 }}
          onEndReached={() => fetchAnime()}
          onEndReachedThreshold={0.6}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListFooterComponent={loading ? <ActivityIndicator className="my-4" /> : null}
          ListEmptyComponent={
            !loading ? (
              <Text className="mt-10 text-center text-gray-500">No anime found.</Text>
            ) : null
          }
        />
      )}
    </View>
  );
}
