import axios from 'axios';

// TMDB Free API — students should register at themoviedb.org for their own key
// Using a demo read-only key for educational purposes
const API_KEY = '4e44d9029b1270a757cddc766a1bcb63';
const BASE = 'https://api.themoviedb.org/3';
export const IMG_BASE = 'https://image.tmdb.org/t/p';

const api = axios.create({ baseURL: BASE, timeout: 10000,
  params: { api_key: API_KEY, language: 'en-US' }
});

export const GENRES = [
  { id: 28, name: 'Action' }, { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' }, { id: 27, name: 'Horror' },
  { id: 878, name: 'Sci-Fi' }, { id: 10749, name: 'Romance' },
  { id: 16, name: 'Animation' }, { id: 53, name: 'Thriller' },
  { id: 12, name: 'Adventure' }, { id: 80, name: 'Crime' },
];

export const WATCHLIST_STATUSES = ['Plan to Watch', 'Watching', 'Completed', 'Dropped'];
export const RATINGS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export async function fetchTrending(type = 'all') {
  try {
    const { data } = await api.get(`/trending/${type}/week`);
    return (data.results || []).slice(0, 20);
  } catch { return []; }
}

export async function fetchTopRated() {
  try {
    const [movies, tv] = await Promise.all([
      api.get('/movie/top_rated'),
      api.get('/tv/top_rated'),
    ]);
    return [
      ...(movies.data.results || []).slice(0, 10).map(m => ({ ...m, media_type: 'movie' })),
      ...(tv.data.results || []).slice(0, 10).map(t => ({ ...t, media_type: 'tv' })),
    ];
  } catch { return []; }
}

export async function fetchByGenre(genreId, page = 1) {
  try {
    const { data } = await api.get('/discover/movie', {
      params: { with_genres: genreId, sort_by: 'popularity.desc', page }
    });
    return { results: data.results || [], totalPages: Math.min(data.total_pages, 20) };
  } catch { return { results: [], totalPages: 1 }; }
}

export async function searchMedia(query) {
  if (!query || query.length < 2) return [];
  try {
    const { data } = await api.get('/search/multi', { params: { query, include_adult: false } });
    return (data.results || []).filter(r => r.media_type !== 'person').slice(0, 20);
  } catch { return []; }
}

export async function fetchGenres() {
  return GENRES;
}

export function getPosterUrl(path, size = 'w342') {
  if (!path) return null;
  return `${IMG_BASE}/${size}${path}`;
}

export function getBackdropUrl(path, size = 'w780') {
  if (!path) return null;
  return `${IMG_BASE}/${size}${path}`;
}
