# 🎬 CineTrack — Entertainment Analytics Dashboard

Real-time entertainment analytics platform built with React + Vite, Redux Toolkit, and TMDB API.

## Domain: Entertainment & Media | API: TMDB (The Movie Database)

## Features Implemented
✅ React (Vite) + ES6+
✅ Redux Toolkit (themeSlice + mediaSlice with async thunks)
✅ React Router v6 (Dashboard / Discover / Watchlist / Add)
✅ Axios API Integration (TMDB REST API)
✅ CSS Modules styling
✅ Lazy loading (React.lazy + Suspense)
✅ Dark Mode Toggle (CSS variables + localStorage)
✅ Dashboard with Charts (Bar, Area, Pie via Recharts)
✅ Real-time Auto-Refresh every 60s (custom hook)
✅ Search + Filter + Sort (debounced search, genre filter, sort chips)
✅ Debounced API calls (custom useDebounce hook - 450ms)
✅ Multi-step form with validation (3-step Add to Watchlist)
✅ Pagination (Discover page)
✅ CRUD Watchlist (add, edit status/rating/notes, remove, localStorage persist)

## Setup
npm install && npm run dev

## API Key
Uses TMDB API. Get your own free key at https://www.themoviedb.org/settings/api
Replace API_KEY in src/services/tmdbApi.js
