import styles from './Loader.module.css';
export default function Loader({ message = 'Loading...' }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.spinner}><div className={styles.r1}/><div className={styles.r2}/></div>
      <p className={styles.msg}>{message}</p>
    </div>
  );
}
export function SkeletonCard() { return <div className={styles.skeleton} />; }
