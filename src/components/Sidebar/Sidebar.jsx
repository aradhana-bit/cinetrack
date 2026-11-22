import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setSelectedGenre, getByGenre } from '../../store/slices/mediaSlice';
import { GENRES } from '../../services/tmdbApi';
import styles from './Sidebar.module.css';

const navItems = [
  { path: '/', icon: '⬡', label: 'Dashboard' },
  { path: '/discover', icon: '⬡', label: 'Discover' },
  { path: '/watchlist', icon: '⬡', label: 'My Watchlist' },
  { path: '/add', icon: '⬡', label: 'Add to Watchlist' },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { selectedGenre } = useSelector(s => s.media);

  const handleGenre = (genre) => {
    dispatch(setSelectedGenre(genre));
    dispatch(getByGenre({ genreId: genre.id }));
    if (location.pathname !== '/discover') {
      window.location.href = '/discover';
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={`${styles.logo} syne`}>Cine<span className="accent2">Track</span></span>
        <span className={styles.sub}>Entertainment Hub</span>
      </div>

      <nav className={styles.nav}>
        {navItems.map(item => (
          <Link key={item.path} to={item.path}
            className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}>
            <span className={styles.icon}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className={styles.sectionLabel}>Browse by Genre</div>
      <div className={styles.genres}>
        {GENRES.map(genre => (
          <button key={genre.id}
            className={`${styles.genreBtn} ${selectedGenre?.id === genre.id ? styles.genreActive : ''}`}
            onClick={() => handleGenre(genre)}>
            {genre.name}
            {selectedGenre?.id === genre.id && <span className={styles.dot} />}
          </button>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.liveTag}>
          <span className={styles.pulseDot} />
          <span>TMDB Live Data</span>
        </div>
      </div>
    </aside>
  );
}
