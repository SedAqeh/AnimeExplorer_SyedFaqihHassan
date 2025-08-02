import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  ScrollView,
  Dimensions,
  TouchableOpacity,
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

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await getTopAnime(10);
        setAnimeList([...res.data, ...res.data]); // duplicate for looping
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

    return () => {
      stopAutoScroll();
    };
  }, [animeList]);

  const startAutoScroll = () => {
    const step = () => {
      scrollX.current += SCROLL_SPEED;

      scrollViewRef.current?.scrollTo({ x: scrollX.current, animated: false });

      const totalContentWidth = animeList.length * ITEM_WIDTH;
      if (scrollX.current >= totalContentWidth / 2) {
        scrollX.current = 0;
        scrollViewRef.current?.scrollTo({ x: 0, animated: false });
      }

      animFrame.current = requestAnimationFrame(step);
    };

    animFrame.current = requestAnimationFrame(step);
  };

  const stopAutoScroll = () => {
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
  };
  if (animeList.length === 0) return <TrendingPlaceholder />;

  return (
    <View className="mb-4">
      <Text className="mb-2 px-4 text-lg font-bold text-white">🔥 Trending</Text>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
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
