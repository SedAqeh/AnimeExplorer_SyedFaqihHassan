import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getGenres } from '../api/jikan';
import { useAnimeStore } from '../store/useAnimeStore';

export default function GenreDropdown() {
  const [genres, setGenres] = useState<{ mal_id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const { selectedGenre, setSelectedGenre } = useAnimeStore();

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const res = await getGenres();
        setGenres(res.data);
      } catch (err) {
        console.error('Failed to load genres', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return (
    <View className="mb-4">
      <Text className="mb-1 text-sm font-medium text-gray-700">Filter by Genre:</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Picker
          selectedValue={selectedGenre ?? ''}
          onValueChange={(itemValue) => setSelectedGenre(itemValue === '' ? null : itemValue)}>
          <Picker.Item label="All" value="" />
          {genres.map((genre) => (
            <Picker.Item key={genre.mal_id} label={genre.name} value={genre.mal_id.toString()} />
          ))}
        </Picker>
      )}
    </View>
  );
}
