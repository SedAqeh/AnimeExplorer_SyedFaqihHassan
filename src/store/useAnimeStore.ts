import { create } from 'zustand';

export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  score: number;
  synopsis: string;
  genres: { name: string }[];
  episodes: number;
  status: string;
  studios: { name: string }[];
  year: number;
  url: string;
}

interface AnimeStore {
  animeList: Anime[];
  favorites: Anime[];
  selectedGenre: string | null;
  page: number;
  hasMore: boolean;

  setAnimeList: (anime: Anime[]) => void;
  addToFavorites: (anime: Anime) => void;
  removeFromFavorites: (id: number) => void;
  setSelectedGenre: (genre: string | null) => void;
  clearAnimeList: () => void;

  setPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
}

export const useAnimeStore = create<AnimeStore>((set, get) => ({
  animeList: [],
  favorites: [],
  selectedGenre: null,
  page: 1,
  hasMore: true,

  setAnimeList: (anime) => set({ animeList: anime }),
  clearAnimeList: () => set({ animeList: [] }),

  addToFavorites: (anime) => {
    const updated = [...get().favorites, anime];
    set({ favorites: updated });
  },

  removeFromFavorites: (id) => {
    const updated = get().favorites.filter((a) => a.mal_id !== id);
    set({ favorites: updated });
  },

  setSelectedGenre: (genre) => set({ selectedGenre: genre }),
  setPage: (page) => set({ page }),
  setHasMore: (hasMore) => set({ hasMore }),
}));
