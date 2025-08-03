import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Anime } from '../store/useAnimeStore';
import { getTopAnime } from '../api/jikan';
import TrendingPlaceholder from './TrendingPlaceholder';

const ITEM_WIDTH = 104;
const SCROLL_SPEED = 0.5;

export default function TrendingBanner() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(0);
  const animFrame = useRef<number | null>(null);
  const isUserTouching = useRef(false);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await getTopAnime(10);
        setAnimeList([...res.data, ...res.data]);
      } catch (err) {
        console.error('Failed to load trending anime:', err);
      }
    };

    fetchTrending();
  }, []);

  useEffect(() => {
    if (animeList.length > 0) {
      startAutoScroll();
    }

    return () => stopAutoScroll();
  }, [animeList]);

  const startAutoScroll = () => {
    const step = () => {
      if (!isUserTouching.current) {
        scrollX.current += SCROLL_SPEED;

        const totalWidth = animeList.length * ITEM_WIDTH;
        if (scrollX.current >= totalWidth / 2) {
          scrollX.current = 0;
          scrollViewRef.current?.scrollTo({ x: 0, animated: false });
        } else {
          scrollViewRef.current?.scrollTo({ x: scrollX.current, animated: false });
        }
      }

      animFrame.current = requestAnimationFrame(step);
    };

    animFrame.current = requestAnimationFrame(step);
  };

  const stopAutoScroll = () => {
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
  };

  const handleTouchStart = () => {
    isUserTouching.current = true;
  };

  const handleTouchEnd = () => {
    isUserTouching.current = false;
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.current = e.nativeEvent.contentOffset.x;
  };

  const handleMomentumEnd = () => {
    isUserTouching.current = false;
  };

  if (animeList.length === 0) return <TrendingPlaceholder />;

  return (
    <View className="mb-4">
      <Text className="mb-2 px-4 text-lg font-bold text-white">🔥 Trending</Text>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumEnd}
        contentContainerStyle={{ paddingRight: 8 }}>
        {animeList.map((item, index) => (
          <TouchableOpacity
            key={`${item.mal_id}-${index}`}
            onPress={() => navigation.navigate('Detail', { animeId: item.mal_id })}
            style={{ marginRight: 8 }}>
            <Image
              source={{ uri: item.images.jpg.image_url }}
              style={{ width: 96, height: 128, borderRadius: 8 }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
