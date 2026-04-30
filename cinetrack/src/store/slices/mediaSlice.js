import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchTrending, fetchTopRated, fetchByGenre,
  searchMedia, fetchGenres
} from '../../services/tmdbApi';

export const getTrending = createAsyncThunk('media/getTrending', async (type = 'all') => {
  return await fetchTrending(type);
});
export const getTopRated = createAsyncThunk('media/getTopRated', async () => {
  return await fetchTopRated();
});
export const getByGenre = createAsyncThunk('media/getByGenre', async ({ genreId, page = 1 }) => {
  return await fetchByGenre(genreId, page);
});
export const searchContent = createAsyncThunk('media/search', async (query) => {
  return await searchMedia(query);
});
export const getGenres = createAsyncThunk('media/getGenres', async () => {
  return await fetchGenres();
});

const mediaSlice = createSlice({
  name: 'media',
  initialState: {
    trending: [],
    topRated: [],
    byGenre: [],
    searchResults: [],
    genres: [],
    watchlist: JSON.parse(localStorage.getItem('ct_watchlist') || '[]'),
    searchQuery: '',
    selectedGenre: null,
    activeType: 'movie', // 'movie' | 'tv'
    sortBy: 'popularity',
    currentPage: 1,
    totalPages: 1,
    lastRefresh: null,
    status: { trending: 'idle', topRated: 'idle', genre: 'idle', search: 'idle', genres: 'idle' },
  },
  reducers: {
    setSearchQuery: (s, a) => { s.searchQuery = a.payload; },
    setSelectedGenre: (s, a) => { s.selectedGenre = a.payload; s.byGenre = []; s.currentPage = 1; },
    setActiveType: (s, a) => { s.activeType = a.payload; },
    setSortBy: (s, a) => { s.sortBy = a.payload; },
    setCurrentPage: (s, a) => { s.currentPage = a.payload; },
    setLastRefresh: (s) => { s.lastRefresh = Date.now(); },
    addToWatchlist: (s, a) => {
      if (!s.watchlist.find(m => m.id === a.payload.id)) {
        s.watchlist.push(a.payload);
        localStorage.setItem('ct_watchlist', JSON.stringify(s.watchlist));
      }
    },
    removeFromWatchlist: (s, a) => {
      s.watchlist = s.watchlist.filter(m => m.id !== a.payload);
      localStorage.setItem('ct_watchlist', JSON.stringify(s.watchlist));
    },
    updateWatchlistItem: (s, a) => {
      const idx = s.watchlist.findIndex(m => m.id === a.payload.id);
      if (idx !== -1) {
        s.watchlist[idx] = { ...s.watchlist[idx], ...a.payload };
        localStorage.setItem('ct_watchlist', JSON.stringify(s.watchlist));
      }
    },
  },
  extraReducers: (b) => {
    b
      .addCase(getTrending.pending, (s) => { s.status.trending = 'loading'; })
      .addCase(getTrending.fulfilled, (s, a) => { s.status.trending = 'succeeded'; s.trending = a.payload; s.lastRefresh = Date.now(); })
      .addCase(getTrending.rejected, (s) => { s.status.trending = 'failed'; })

      .addCase(getTopRated.pending, (s) => { s.status.topRated = 'loading'; })
      .addCase(getTopRated.fulfilled, (s, a) => { s.status.topRated = 'succeeded'; s.topRated = a.payload; })
      .addCase(getTopRated.rejected, (s) => { s.status.topRated = 'failed'; })

      .addCase(getByGenre.pending, (s) => { s.status.genre = 'loading'; })
      .addCase(getByGenre.fulfilled, (s, a) => {
        s.status.genre = 'succeeded';
        s.byGenre = a.payload.results;
        s.totalPages = a.payload.totalPages;
      })
      .addCase(getByGenre.rejected, (s) => { s.status.genre = 'failed'; })

      .addCase(searchContent.pending, (s) => { s.status.search = 'loading'; })
      .addCase(searchContent.fulfilled, (s, a) => { s.status.search = 'succeeded'; s.searchResults = a.payload; })
      .addCase(searchContent.rejected, (s) => { s.status.search = 'failed'; })

      .addCase(getGenres.fulfilled, (s, a) => { s.genres = a.payload; });
  },
});

export const {
  setSearchQuery, setSelectedGenre, setActiveType,
  setSortBy, setCurrentPage, setLastRefresh,
  addToWatchlist, removeFromWatchlist, updateWatchlistItem
} = mediaSlice.actions;

export default mediaSlice.reducer;
