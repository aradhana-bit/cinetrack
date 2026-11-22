import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrending, getTopRated } from '../../store/slices/mediaSlice';
import { useAutoRefresh } from '../../hooks/useAutoRefresh';
import MovieCard from '../../components/MovieCard/MovieCard';
import { RatingBarChart, GenrePieChart, TrendAreaChart } from '../../components/Charts/Charts';
import { SkeletonCard } from '../../components/Loader/Loader';
import { GENRES } from '../../services/tmdbApi';
import styles from './Dashboard.module.css';

function StatCard({ label, value, sub, color }) {
  return (
    <div className={styles.statCard} style={color ? { borderTopColor: color } : {}}>
      <span className={styles.statVal}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
      {sub && <span className={styles.statSub}>{sub}</span>}
    </div>
  );
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const { trending, topRated, watchlist, status, lastRefresh } = useSelector(s => s.media);

  useEffect(() => {
    dispatch(getTrending('all'));
    dispatch(getTopRated());
  }, [dispatch]);

  useAutoRefresh(() => dispatch(getTrending('all')), 60000, true);

  const avgRating = useMemo(() => {
    if (!trending.length) return '--';
    return (trending.reduce((a, m) => a + (m.vote_average || 0), 0) / trending.length).toFixed(1);
  }, [trending]);

  const ratingDistData = useMemo(() => {
    const buckets = {};
    [...trending, ...topRated].forEach(m => {
      const r = Math.floor(m.vote_average || 0);
      buckets[r] = (buckets[r] || 0) + 1;
    });
    return Object.entries(buckets).sort((a, b) => a[0] - b[0])
      .map(([rating, count]) => ({ rating: `${rating}+`, count }));
  }, [trending, topRated]);

  const genreData = useMemo(() => {
    const counts = {};
    trending.forEach(m => (m.genre_ids || []).slice(0, 2).forEach(id => {
      const g = GENRES.find(g => g.id === id);
      if (g) counts[g.name] = (counts[g.name] || 0) + 1;
    }));
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6)
      .map(([name, value]) => ({ name, value }));
  }, [trending]);

  const trendData = useMemo(() =>
    trending.slice(0, 10).map((m, i) => ({
      name: `#${i + 1}`,
      popularity: Math.round(m.popularity || 0),
    })), [trending]);

  const movies = trending.filter(m => m.media_type === 'movie').length;
  const tvShows = trending.filter(m => m.media_type === 'tv').length;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={`${styles.title} syne`}>🎬 Dashboard</h1>
          <p className={styles.sub}>Trending this week · Auto-refreshes every 60s</p>
        </div>
        <button className={styles.refreshBtn} onClick={() => dispatch(getTrending('all'))}>↻ Refresh</button>
      </div>

      <div className={styles.statsRow}>
        <StatCard label="Trending" value={trending.length} sub="This week" color="var(--accent)" />
        <StatCard label="Movies" value={movies} sub="In trending" color="#ec4899" />
        <StatCard label="TV Shows" value={tvShows} sub="In trending" color="#06b6d4" />
        <StatCard label="Avg Rating" value={avgRating} sub="Trending avg" color="#f59e0b" />
        <StatCard label="My Watchlist" value={watchlist.length} sub="Saved titles" color="#22c55e" />
      </div>

      {/* Charts */}
      {trending.length > 0 && (
        <section>
          <h2 className={styles.sectionTitle}>Analytics</h2>
          <div className={styles.chartsGrid}>
            <RatingBarChart data={ratingDistData} />
            <TrendAreaChart data={trendData} />
            <GenrePieChart data={genreData} />
          </div>
        </section>
      )}

      {/* Trending Grid */}
      <section>
        <h2 className={styles.sectionTitle}>Trending Now</h2>
        {status.trending === 'loading' ? (
          <div className={styles.grid}>{[...Array(10)].map((_, i) => <SkeletonCard key={i} />)}</div>
        ) : (
          <div className={styles.grid}>
            {trending.slice(0, 12).map(item => <MovieCard key={item.id} item={item} />)}
          </div>
        )}
      </section>

      {/* Top Rated */}
      {topRated.length > 0 && (
        <section>
          <h2 className={styles.sectionTitle}>Top Rated All Time</h2>
          <div className={styles.grid}>
            {topRated.slice(0, 8).map(item => <MovieCard key={`${item.id}-${item.media_type}`} item={item} />)}
          </div>
        </section>
      )}
    </div>
  );
}
