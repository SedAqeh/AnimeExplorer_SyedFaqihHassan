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
}

interface AnimeStore {
  animeList: Anime[];
  favorites: Anime[];
  selectedGenre: string | null;
  setAnimeList: (anime: Anime[]) => void;
  addToFavorites: (anime: Anime) => void;
  removeFromFavorites: (id: number) => void;
  setSelectedGenre: (genre: string | null) => void;
  clearAnimeList: () => void;
}

export const useAnimeStore = create<AnimeStore>((set, get) => ({
  animeList: [],
  favorites: [],
  selectedGenre: null,

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
}));
