import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getByGenre, searchContent, setSortBy, setCurrentPage
} from '../../store/slices/mediaSlice';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieCard from '../../components/MovieCard/MovieCard';
import { SkeletonCard } from '../../components/Loader/Loader';
import styles from './Discover.module.css';

const SORTS = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'vote_average', label: 'Top Rated' },
  { value: 'release_date', label: 'Newest' },
  { value: 'title', label: 'A–Z' },
];

export default function Discover() {
  const dispatch = useDispatch();
  const { byGenre, searchResults, searchQuery, selectedGenre, sortBy, currentPage, totalPages, status } = useSelector(s => s.media);

  useEffect(() => {
    if (selectedGenre) dispatch(getByGenre({ genreId: selectedGenre.id, page: currentPage }));
  }, [selectedGenre, currentPage, dispatch]);

  const raw = searchQuery.length >= 2 ? searchResults : byGenre;

  const sorted = [...raw].sort((a, b) => {
    if (sortBy === 'popularity') return (b.popularity || 0) - (a.popularity || 0);
    if (sortBy === 'vote_average') return (b.vote_average || 0) - (a.vote_average || 0);
    if (sortBy === 'release_date') return (b.release_date || '') > (a.release_date || '') ? 1 : -1;
    if (sortBy === 'title') return (a.title || a.name || '').localeCompare(b.title || b.name || '');
    return 0;
  });

  const isLoading = status.genre === 'loading' || status.search === 'loading';

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={`${styles.title} syne`}>
            {selectedGenre ? `🎭 ${selectedGenre.name}` : '🔍 Discover'}
          </h1>
          <p className={styles.sub}>{raw.length} titles found{selectedGenre ? ` in ${selectedGenre.name}` : ''}</p>
        </div>
        <SearchBar placeholder="Search any movie or show..." />
      </div>

      <div className={styles.controls}>
        <span className={styles.controlLabel}>Sort by:</span>
        {SORTS.map(s => (
          <button key={s.value} onClick={() => dispatch(setSortBy(s.value))}
            className={`${styles.sortBtn} ${sortBy === s.value ? styles.sortActive : ''}`}>
            {s.label}
          </button>
        ))}
      </div>

      {!selectedGenre && searchQuery.length < 2 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🎭</div>
          <h2 className="syne" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Pick a Genre</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Select a genre from the sidebar or search for any title above.
          </p>
        </div>
      ) : isLoading ? (
        <div className={styles.grid}>{[...Array(12)].map((_, i) => <SkeletonCard key={i} />)}</div>
      ) : sorted.length === 0 ? (
        <div className={styles.empty}><p style={{ color: 'var(--text-muted)' }}>No results found.</p></div>
      ) : (
        <>
          <div className={styles.grid}>
            {sorted.map(item => <MovieCard key={item.id} item={item} />)}
          </div>
          {!searchQuery && totalPages > 1 && (
            <div className={styles.pagination}>
              <button className={styles.pageBtn} disabled={currentPage === 1}
                onClick={() => dispatch(setCurrentPage(currentPage - 1))}>← Prev</button>
              <span className={`${styles.pageInfo} mono`}>Page {currentPage} / {totalPages}</span>
              <button className={styles.pageBtn} disabled={currentPage === totalPages}
                onClick={() => dispatch(setCurrentPage(currentPage + 1))}>Next →</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
