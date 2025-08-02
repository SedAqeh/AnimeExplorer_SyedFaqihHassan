import axios from 'axios';

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
