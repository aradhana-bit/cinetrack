import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWatchlist, updateWatchlistItem } from '../../store/slices/mediaSlice';
import { getPosterUrl, WATCHLIST_STATUSES } from '../../services/tmdbApi';
import { Link } from 'react-router-dom';
import styles from './Watchlist.module.css';

const STATUS_COLORS = {
  'Plan to Watch': '#7c3aed',
  'Watching': '#f59e0b',
  'Completed': '#22c55e',
  'Dropped': '#ef4444',
};

function WatchlistItem({ item }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState(item.status);
  const [rating, setRating] = useState(item.userRating || '');
  const [notes, setNotes] = useState(item.notes || '');
  const poster = getPosterUrl(item.poster, 'w92');

  const save = () => {
    dispatch(updateWatchlistItem({ id: item.id, status, userRating: rating || null, notes }));
    setEditing(false);
  };

  return (
    <div className={styles.wlItem}>
      {poster
        ? <img src={poster} alt={item.title} className={styles.wlPoster} />
        : <div className={styles.wlPosterPlaceholder}>{item.title[0]}</div>
      }
      <div className={styles.wlContent}>
        <div className={styles.wlTop}>
          <div>
            <h3 className={styles.wlTitle}>{item.title}</h3>
            <div className={styles.wlMeta}>
              <span>{item.year || '—'}</span>
              <span className={styles.wlType}>{item.type}</span>
              <span>⭐ {item.rating}</span>
            </div>
          </div>
          <div className={styles.wlActions}>
            <button className={styles.editBtn} onClick={() => setEditing(!editing)}>
              {editing ? '✕' : '✎ Edit'}
            </button>
            <button className={styles.removeBtn} onClick={() => dispatch(removeFromWatchlist(item.id))}>🗑</button>
          </div>
        </div>

        <span className={styles.statusBadge} style={{ background: STATUS_COLORS[item.status] + '22', color: STATUS_COLORS[item.status] }}>
          {item.status}
        </span>

        {item.userRating && <span className={styles.userRating}>My Rating: {item.userRating}/10</span>}
        {item.notes && <p className={styles.wlNotes}>{item.notes}</p>}

        {editing && (
          <div className={styles.editForm}>
            <select value={status} onChange={e => setStatus(e.target.value)} className={styles.select}>
              {WATCHLIST_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <input type="number" min="1" max="10" placeholder="Your rating (1-10)"
              value={rating} onChange={e => setRating(e.target.value)} className={styles.ratingInput} />
            <textarea placeholder="Add notes..." value={notes} onChange={e => setNotes(e.target.value)}
              className={styles.notes} rows={2} />
            <button className={styles.saveBtn} onClick={save}>Save</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Watchlist() {
  const { watchlist } = useSelector(s => s.media);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('title');

  const filtered = watchlist
    .filter(m => filter === 'All' || m.status === filter)
    .sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title);
      if (sort === 'rating') return (b.userRating || 0) - (a.userRating || 0);
      if (sort === 'year') return (b.year || '') > (a.year || '') ? 1 : -1;
      return 0;
    });

  const counts = WATCHLIST_STATUSES.reduce((acc, s) => {
    acc[s] = watchlist.filter(m => m.status === s).length;
    return acc;
  }, {});

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={`${styles.title} syne`}>🎬 My Watchlist</h1>
          <p className={styles.sub}>{watchlist.length} titles saved</p>
        </div>
        <Link to="/add" className={styles.addBtn}>+ Add Title</Link>
      </div>

      {watchlist.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🍿</div>
          <h2 className="syne" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Watchlist is Empty</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
            Browse trending movies and click "+ Watchlist" to save them here.
          </p>
          <Link to="/" className={styles.addBtn}>Browse Trending</Link>
        </div>
      ) : (
        <>
          {/* Status summary cards */}
          <div className={styles.summaryRow}>
            {WATCHLIST_STATUSES.map(s => (
              <div key={s} className={styles.summaryCard} style={{ borderTopColor: STATUS_COLORS[s] }}>
                <span className={styles.summaryCount}>{counts[s]}</span>
                <span className={styles.summaryLabel}>{s}</span>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className={styles.controls}>
            {['All', ...WATCHLIST_STATUSES].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`${styles.chip} ${filter === f ? styles.chipActive : ''}`}>{f}</button>
            ))}
            <span className={styles.sep}>|</span>
            <span className={styles.sortLabel}>Sort:</span>
            {[['title','A–Z'],['rating','My Rating'],['year','Year']].map(([v, l]) => (
              <button key={v} onClick={() => setSort(v)}
                className={`${styles.chip} ${sort === v ? styles.chipActive : ''}`}>{l}</button>
            ))}
          </div>

          <p className={styles.count}>{filtered.length} title{filtered.length !== 1 ? 's' : ''}</p>

          <div className={styles.list}>
            {filtered.map(item => <WatchlistItem key={item.id} item={item} />)}
          </div>
        </>
      )}
    </div>
  );
}
