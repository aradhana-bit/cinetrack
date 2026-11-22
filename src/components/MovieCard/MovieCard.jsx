import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../../store/slices/mediaSlice';
import { getPosterUrl } from '../../services/tmdbApi';
import styles from './MovieCard.module.css';

export default function MovieCard({ item }) {
  const dispatch = useDispatch();
  const { watchlist } = useSelector(s => s.media);
  const isInWatchlist = watchlist.some(w => w.id === item.id);

  const title = item.title || item.name || 'Unknown';
  const type = item.media_type === 'tv' ? 'TV' : 'Movie';
  const year = (item.release_date || item.first_air_date || '').slice(0, 4);
  const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
  const poster = getPosterUrl(item.poster_path);

  const handleWatchlist = (e) => {
    e.preventDefault();
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(item.id));
    } else {
      dispatch(addToWatchlist({
        id: item.id, title, type, year, rating,
        poster: item.poster_path,
        status: 'Plan to Watch', userRating: null, notes: '',
        genre: item.genre_ids?.[0] || null,
      }));
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.posterWrap}>
        {poster
          ? <img src={poster} alt={title} className={styles.poster} loading="lazy" />
          : <div className={styles.noPoster}>{title[0]}</div>
        }
        <div className={styles.overlay}>
          <button className={`${styles.wlBtn} ${isInWatchlist ? styles.inWl : ''}`} onClick={handleWatchlist}>
            {isInWatchlist ? '✓ In List' : '+ Watchlist'}
          </button>
        </div>
        <div className={styles.typeBadge}>{type}</div>
        <div className={styles.ratingBadge}>⭐ {rating}</div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.meta}>
          <span>{year || '—'}</span>
          {item.original_language && <span className={styles.lang}>{item.original_language.toUpperCase()}</span>}
        </div>
      </div>
    </div>
  );
}
