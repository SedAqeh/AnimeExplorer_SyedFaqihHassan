import AsyncStorage from '@react-native-async-storage/async-storage';
import { Anime } from '../store/useAnimeStore';

const FAVORITES_KEY = 'favorites';

export const saveFavorites = async (favorites: Anime[]) => {
  try {
    const json = JSON.stringify(favorites);
    await AsyncStorage.setItem(FAVORITES_KEY, json);
  } catch (err) {
    console.error('Failed to save favorites', err);
  }
};

export const loadFavorites = async (): Promise<Anime[]> => {
  try {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    return json ? JSON.parse(json) : [];
  } catch (err) {
    console.error('Failed to load favorites', err);
    return [];
  }
};
