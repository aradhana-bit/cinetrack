import { useEffect, useRef } from 'react';
export function useAutoRefresh(callback, ms = 60000, enabled = true) {
  const cb = useRef(callback);
  useEffect(() => { cb.current = callback; }, [callback]);
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => cb.current(), ms);
    return () => clearInterval(id);
  }, [ms, enabled]);
}
