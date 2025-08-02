import axios from './throttledAxios';

const API_BASE = 'https://api.jikan.moe/v4';

export const getAnimeList = async (page = 1, genreId?: number, limit = 25) => {
  const params: any = { page, limit };
  if (genreId) params.genres = genreId;
  const response = await axios.get(`${API_BASE}/anime`, { params });
  return response.data;
};

export const getAnimeDetail = async (id: number) => {
  const response = await axios.get(`${API_BASE}/anime/${id}`);
  return response.data;
};

export const getGenres = async () => {
  const response = await axios.get(`${API_BASE}/genres/anime`);
  return response.data;
};

export const getTopAnime = async (limit = 10) => {
  const response = await axios.get(`/top/anime`, {
    params: { limit },
  });
  return response.data;
};

export const searchAnime = async (query: string, page = 1, genreId?: number) => {
  const params: any = { q: query, page };
  if (genreId) params.genres = genreId;

  const response = await axios.get(`${API_BASE}/anime`, { params });
  return response.data;
};
