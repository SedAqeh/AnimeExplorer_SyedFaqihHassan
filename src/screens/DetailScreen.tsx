import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getAnimeDetail } from '../api/jikan';
import { Anime, useAnimeStore } from '../store/useAnimeStore';
import { saveFavorites } from '../utils/storage';
import { FontAwesome } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

export default function DetailScreen() {
  const route = useRoute<DetailRouteProp>();
  const { animeId } = route.params;

  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageRatio, setImageRatio] = useState(2 / 3); // fallback ratio

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

  useEffect(() => {
    if (anime?.images?.jpg?.image_url) {
      Image.getSize(anime.images.jpg.image_url, (width, height) => {
        setImageRatio(width / height);
      });
    }
  }, [anime?.images?.jpg?.image_url]);

  const renderStars = (score: number) => {
    const starCount = Math.floor(score / 2);
    const hasHalf = score / 2 - starCount >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < starCount) {
        stars.push(<FontAwesome key={i} name="star" size={20} color="#facc15" />);
      } else if (i === starCount && hasHalf) {
        stars.push(<FontAwesome key={i} name="star-half-empty" size={20} color="#facc15" />);
      } else {
        stars.push(<FontAwesome key={i} name="star-o" size={20} color="#facc15" />);
      }
    }

    return <View className="flex-row">{stars}</View>;
  };

  if (loading || !anime) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white px-6" contentContainerStyle={{ paddingBottom: 60 }}>
      {/* Anime Poster */}
      <View
        className="rounded-2xl bg-white"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 5,
          alignSelf: 'center',
        }}>
        <Image
          source={{ uri: anime.images.jpg.image_url }}
          style={{
            width: screenWidth - 48,
            aspectRatio: imageRatio,
            borderRadius: 16,
          }}
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <Text className="mt-6 text-3xl font-extrabold text-gray-900">{anime.title}</Text>

      {/* Genres */}
      <View className="mt-4 flex-row flex-wrap gap-2">
        {anime.genres.map((g) => (
          <View key={g.name} className="rounded-full bg-indigo-100 px-3 py-1">
            <Text className="text-xs font-medium text-indigo-700">{g.name}</Text>
          </View>
        ))}
      </View>

      {/* Rating */}
      <View className="mt-4 flex-row items-center gap-2">
        {renderStars(anime.score ?? 0)}
        <Text className="text-2xl font-bold italic">{anime.score?.toFixed(1) ?? 'N/A'}</Text>
      </View>

      {/* Anime Info */}
      <View className="mt-4 space-y-1 rounded-xl bg-indigo-500 p-3 shadow">
        <Text className="text-sm text-white">
          <Text className="font-semibold">Year:</Text> {anime.year ?? 'N/A'}
        </Text>
        <Text className="text-sm text-white">
          <Text className="font-semibold">Episodes:</Text> {anime.episodes ?? 'N/A'}
        </Text>
        <Text className="text-sm text-white">
          <Text className="font-semibold">Status:</Text> {anime.status ?? 'N/A'}
        </Text>
        <Text className="text-sm text-white">
          <Text className="font-semibold">Studios:</Text>{' '}
          {anime.studios.length > 0 ? anime.studios.map((s) => s.name).join(', ') : 'N/A'}
        </Text>
      </View>

      {/* Synopsis */}
      <Text className="mb-2 mt-6 text-lg font-semibold text-gray-900">Synopsis</Text>
      <View className="rounded-xl  bg-white p-3 shadow">
        <Text className="text-justify text-sm leading-relaxed text-gray-800">{anime.synopsis}</Text>
      </View>

      {/* Favorite Button */}
      <TouchableOpacity
        onPress={toggleFavorite}
        className={`mt-6 rounded-xl px-4 py-3 ${isFavorited ? 'bg-gray-200' : 'bg-red-500'}`}>
        <Text
          className={`text-center text-base font-semibold ${
            isFavorited ? 'text-red-600' : 'text-white'
          }`}>
          {isFavorited ? '♥ Unfavorite' : '♡ Add to Favorites'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
