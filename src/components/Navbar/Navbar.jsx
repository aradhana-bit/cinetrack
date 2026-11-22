import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { toggleTheme } from '../../store/slices/themeSlice';
import styles from './Navbar.module.css';

export default function Navbar() {
  const dispatch = useDispatch();
  const { mode } = useSelector(s => s.theme);
  const { watchlist, lastRefresh } = useSelector(s => s.media);
  const location = useLocation();

  const timeAgo = lastRefresh
    ? `${Math.round((Date.now() - lastRefresh) / 1000)}s ago`
    : null;

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <span className={`${styles.logo} syne`}>
          Cine<span className="accent2">Track</span>
        </span>
      </div>
      <div className={styles.right}>
        {timeAgo && <span className={`${styles.refresh} mono`}>↻ {timeAgo}</span>}
        <Link to="/watchlist" className={`${styles.wlBtn} ${location.pathname === '/watchlist' ? styles.wlActive : ''}`}>
          🎬 Watchlist
          {watchlist.length > 0 && <span className={styles.badge}>{watchlist.length}</span>}
        </Link>
        <button className={styles.themeBtn} onClick={() => dispatch(toggleTheme())}>
          {mode === 'dark' ? '☀ Light' : '☾ Dark'}
        </button>
      </div>
    </nav>
  );
}
