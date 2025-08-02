import React, { memo, useRef, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Anime, useAnimeStore } from '../store/useAnimeStore';
import { saveFavorites } from '../utils/storage';
import Toast from 'react-native-toast-message';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
  anime: Anime;
  showFavoriteButton?: boolean;
};

const AnimeCard = ({ anime, showFavoriteButton = true }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { favorites, addToFavorites, removeFromFavorites } = useAnimeStore();
  const isFavorited = favorites.some((fav) => fav.mal_id === anime.mal_id);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const toggleFavorite = useCallback(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.4,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();

    if (isFavorited) {
      removeFromFavorites(anime.mal_id);
    } else {
      addToFavorites(anime);
    }

    saveFavorites(
      isFavorited ? favorites.filter((f) => f.mal_id !== anime.mal_id) : [...favorites, anime]
    );

    Toast.show({
      type: 'success',
      text1: isFavorited ? 'Removed from favorites' : 'Added to favorites',
    });
  }, [anime, isFavorited, favorites]);

  const handlePress = useCallback(() => {
    navigation.navigate('Detail', { animeId: anime.mal_id });
  }, [anime.mal_id, navigation]);

  const renderStars = (score: number) => {
    const starCount = Math.floor(score / 2);
    const hasHalf = score / 2 - starCount >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < starCount) {
        stars.push(<FontAwesome key={i} name="star" size={10} color="#facc15" />);
      } else if (i === starCount && hasHalf) {
        stars.push(<FontAwesome key={i} name="star-half-empty" size={10} color="#facc15" />);
      } else {
        stars.push(<FontAwesome key={i} name="star-o" size={10} color="#facc15" />);
      }
    }

    return <View className="flex-row space-x-0.5">{stars}</View>;
  };

  return (
    <TouchableOpacity className="mb-3 w-[48%] rounded-xl bg-white p-2 shadow" onPress={handlePress}>
      <Image
        source={{
          uri:
            anime.images?.jpg?.image_url ||
            Image.resolveAssetSource(require('../assets/placeholder.png')).uri,
        }}
        className="h-44 w-full rounded-md"
        resizeMode="cover"
      />

      <View className="mt-2 flex h-20 flex-col justify-between">
        <Text numberOfLines={2} className="text-sm font-bold">
          {anime.title}
        </Text>

        <View>
          <View className="flex-row items-center gap-2">
            <View className="flex-row">{renderStars(anime.score ?? 0)}</View>
            <Text className="text-xs font-bold italic">{anime.score?.toFixed(1) ?? 'N/A'}</Text>
          </View>

          {showFavoriteButton && (
            <TouchableOpacity onPress={toggleFavorite} className="mt-1 flex flex-row gap-2">
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <FontAwesome name={isFavorited ? 'heart' : 'heart-o'} size={14} color="#ef4444" />
              </Animated.View>
              <Text className="text-xs text-red-500">
                {isFavorited ? 'Unfavorite' : 'Favorite'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(
  AnimeCard,
  (prevProps, nextProps) =>
    prevProps.anime.mal_id === nextProps.anime.mal_id &&
    prevProps.showFavoriteButton === nextProps.showFavoriteButton
);
