import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Animated, Text, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AnimeCard from '../components/AnimeCard';
import { getAnimeList, searchAnime } from '../api/jikan';
import { Anime, useAnimeStore } from '../store/useAnimeStore';
import GenreDropdown from '../components/GenreDropdown';
import AnimeCardPlaceholder from '../components/AnimeCardPlaceholder';
import TrendingBanner from '~/components/TrendingBanner';
import HeaderBanner from '~/components/HeaderBanner';
import CustomSearchBar from '~/components/CustomSearchBar';

export default function HomeScreen() {
  const {
    animeList,
    setAnimeList,
    clearAnimeList,
    selectedGenre,
    page,
    setPage,
    hasMore,
    setHasMore,
  } = useAnimeStore();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<Anime[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [340, 80],
    extrapolate: 'clamp',
  });

  const flatListRef = useRef<Animated.FlatList<any>>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const slideAnim = useRef(new Animated.Value(-100)).current;

  const fetchAnime = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    setLoading(true);
    try {
      const genreId = selectedGenre ? parseInt(selectedGenre) : undefined;
      const currentPage = reset ? 1 : page;
      const res = await getAnimeList(currentPage, genreId, 20);
      const updated = reset ? res.data : [...animeList, ...res.data];
      setAnimeList(updated);
      setHasMore(res.pagination.has_next_page);
      setPage(currentPage + 1);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const runSearch = useCallback(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (!searchText.trim()) {
      setSearchResults(null);
      clearAnimeList();
      setPage(1);
      setHasMore(true);
      fetchAnime(true);
      return;
    }

    debounceTimer.current = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const genreId = selectedGenre ? parseInt(selectedGenre) : undefined;
        const res = await searchAnime(searchText, 1, genreId);
        setSearchResults(res.data);
        setHasMore(false);
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setSearchLoading(false);
      }
    }, 500);
  }, [searchText, selectedGenre]);

  const onRefresh = async () => {
    setRefreshing(true);
    if (searchText.trim()) {
      setSearchLoading(true);
      try {
        const genreId = selectedGenre ? parseInt(selectedGenre) : undefined;
        const res = await searchAnime(searchText, 1, genreId);
        setSearchResults(res.data);
      } catch (err) {
        console.error('Search refresh failed:', err);
      } finally {
        setSearchLoading(false);
        setRefreshing(false);
      }
    } else {
      setPage(1);
      setHasMore(true);
      clearAnimeList();
      await fetchAnime(true);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    runSearch();
  }, [searchText]);

  useEffect(() => {
    if (!searchText.trim()) {
      clearAnimeList();
      setPage(1);
      setHasMore(true);
      fetchAnime(true);
    }
  }, [selectedGenre]);

  useFocusEffect(
    useCallback(() => {
      if (animeList.length === 0 && !searchText.trim()) {
        fetchAnime(true);
      }
    }, [animeList.length, searchText])
  );

  const isShimmerVisible = () => {
    const isSearching = searchText.trim().length > 0;
    const activeList = searchResults ?? animeList;
    return (
      (isSearching && searchLoading && activeList.length === 0) ||
      (!isSearching && (loading || refreshing) && activeList.length === 0)
    );
  };

  const isNoResults = () => {
    const isSearching = searchText.trim().length > 0;
    const activeList = searchResults ?? animeList;
    return !isShimmerVisible() && activeList.length === 0 && isSearching;
  };

  return (
    <View>
      <Animated.View
        style={{ height: headerHeight, overflow: 'hidden' }}
        className="justify-end rounded-b-2xl bg-indigo-500 pb-4">
        <HeaderBanner />
        <TrendingBanner />
        <View className="px-4">
          <CustomSearchBar value={searchText} onChange={setSearchText} />
        </View>
      </Animated.View>

      <GenreDropdown />

      {isShimmerVisible() ? (
        <View className="flex-row flex-wrap justify-between px-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <AnimeCardPlaceholder key={idx} />
          ))}
        </View>
      ) : isNoResults() ? (
        <View className="mt-10 items-center">
          <Text className="text-base text-gray-500">No results found.</Text>
        </View>
      ) : (
        <Animated.FlatList
          ref={flatListRef}
          data={searchResults ?? animeList}
          key={searchResults ? 'search' : 'default'}
          keyExtractor={(item) => item.mal_id.toString()}
          renderItem={({ item }) => <AnimeCard anime={item} />}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 190 }}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: false,
            listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
              const offsetY = event.nativeEvent.contentOffset.y;

              if (offsetY === 0 && page !== 1) {
                setPage(1);
                setHasMore(true);
              }

              if (offsetY > 400 && !showScrollTop) {
                setShowScrollTop(true);
                Animated.timing(slideAnim, {
                  toValue: 0,
                  duration: 250,
                  useNativeDriver: true,
                }).start();
              } else if (offsetY <= 400 && showScrollTop) {
                setShowScrollTop(false);
                Animated.timing(slideAnim, {
                  toValue: -100,
                  duration: 250,
                  useNativeDriver: true,
                }).start();
              }
            },
          })}
          scrollEventThrottle={16}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={() => {
            if (page > 1 && !loading && hasMore && !searchText.trim()) {
              fetchAnime();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading && !searchText.trim() ? (
              <View className="items-center py-4">
                <Text className="text-sm text-gray-400">Loading more...</Text>
              </View>
            ) : null
          }
        />
      )}

      {showScrollTop && (
        <Animated.View
          style={{
            position: 'absolute',
            right: 20,
            top: 200,
            transform: [{ translateY: slideAnim }],
            zIndex: 999,
          }}>
          <Text
            onPress={() => {
              flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
            }}
            className="rounded-full bg-indigo-600 px-4 py-2 text-white shadow">
            Back top
          </Text>
        </Animated.View>
      )}
    </View>
  );
}
