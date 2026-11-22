import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery, searchContent } from '../../store/slices/mediaSlice';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './SearchBar.module.css';

export default function SearchBar({ placeholder = 'Search movies, shows...' }) {
  const [value, setValue] = useState('');
  const debounced = useDebounce(value, 450);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchQuery(debounced));
    if (debounced.length >= 2) dispatch(searchContent(debounced));
  }, [debounced, dispatch]);

  return (
    <div className={styles.wrap}>
      <svg className={styles.icon} width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input className={styles.input} type="text" placeholder={placeholder}
        value={value} onChange={e => setValue(e.target.value)} />
      {value && <button className={styles.clear} onClick={() => setValue('')}>✕</button>}
    </div>
  );
}
