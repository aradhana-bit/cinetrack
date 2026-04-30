import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToWatchlist } from '../../store/slices/mediaSlice';
import { WATCHLIST_STATUSES, GENRES } from '../../services/tmdbApi';
import styles from './AddToWatchlist.module.css';

const STEPS = ['Search & Select', 'Status & Details', 'Review & Save'];

const MEDIA_TYPES = ['Movie', 'TV Show', 'Documentary', 'Anime'];

export default function AddToWatchlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { watchlist } = useSelector(s => s.media);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: '', year: '', type: 'Movie',
    genre: '', status: 'Plan to Watch',
    userRating: '', notes: '', poster: null,
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!form.title.trim()) e.title = 'Title is required';
      if (!form.type) e.type = 'Select a type';
    }
    if (step === 1) {
      if (!form.status) e.status = 'Select a status';
      if (form.userRating && (form.userRating < 1 || form.userRating > 10)) e.userRating = 'Rating must be 1–10';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);

  const submit = () => {
    if (!validate()) return;
    const isDupe = watchlist.some(m => m.title.toLowerCase() === form.title.toLowerCase().trim());
    if (isDupe) { setErrors({ title: 'This title is already in your watchlist!' }); setStep(0); return; }
    dispatch(addToWatchlist({
      id: Date.now(),
      title: form.title.trim(),
      year: form.year,
      type: form.type,
      rating: form.userRating || 'N/A',
      poster: null,
      status: form.status,
      userRating: form.userRating || null,
      notes: form.notes,
      genre: form.genre,
    }));
    navigate('/watchlist');
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={`${styles.title} syne`}>Add to Watchlist</h1>
        <p className={styles.sub}>Manually add any movie or show to your list</p>

        {/* Progress Steps */}
        <div className={styles.steps}>
          {STEPS.map((label, i) => (
            <div key={i} className={styles.stepWrap}>
              <div className={`${styles.stepCircle} ${i === step ? styles.stepActive : ''} ${i < step ? styles.stepDone : ''}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`${styles.stepLabel} ${i === step ? styles.stepLabelActive : ''}`}>{label}</span>
              {i < STEPS.length - 1 && <div className={`${styles.stepLine} ${i < step ? styles.lineDone : ''}`} />}
            </div>
          ))}
        </div>

        {/* STEP 0 */}
        {step === 0 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>What do you want to track?</h2>

            <div className={styles.field}>
              <label className={styles.label}>Title <span className={styles.req}>*</span></label>
              <input className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                type="text" placeholder="e.g. Inception, Breaking Bad..."
                value={form.title} onChange={e => set('title', e.target.value)} />
              {errors.title && <span className={styles.error}>{errors.title}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Release Year</label>
              <input className={styles.input} type="number" placeholder="e.g. 2024" min="1900" max="2030"
                value={form.year} onChange={e => set('year', e.target.value)} />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Type <span className={styles.req}>*</span></label>
              <div className={styles.typeGrid}>
                {MEDIA_TYPES.map(t => (
                  <button key={t} onClick={() => set('type', t)}
                    className={`${styles.typeBtn} ${form.type === t ? styles.typeBtnActive : ''}`}>{t}</button>
                ))}
              </div>
              {errors.type && <span className={styles.error}>{errors.type}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Genre</label>
              <select className={styles.select} value={form.genre} onChange={e => set('genre', e.target.value)}>
                <option value="">Select genre (optional)</option>
                {GENRES.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Status & Your Rating</h2>

            <div className={styles.field}>
              <label className={styles.label}>Watch Status <span className={styles.req}>*</span></label>
              <div className={styles.statusGrid}>
                {WATCHLIST_STATUSES.map(s => (
                  <button key={s} onClick={() => set('status', s)}
                    className={`${styles.statusBtn} ${form.status === s ? styles.statusBtnActive : ''}`}>{s}</button>
                ))}
              </div>
              {errors.status && <span className={styles.error}>{errors.status}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Your Rating (1–10)</label>
              <input className={`${styles.input} ${errors.userRating ? styles.inputError : ''}`}
                type="number" min="1" max="10" placeholder="How would you rate it?"
                value={form.userRating} onChange={e => set('userRating', e.target.value)} />
              {errors.userRating && <span className={styles.error}>{errors.userRating}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Personal Notes</label>
              <textarea className={styles.textarea} rows={4}
                placeholder="Why do you want to watch it? Any thoughts..."
                value={form.notes} onChange={e => set('notes', e.target.value)} />
            </div>
          </div>
        )}

        {/* STEP 2 — Review */}
        {step === 2 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Review & Confirm</h2>
            <div className={styles.reviewCard}>
              <div className={styles.reviewRow}><span className={styles.reviewKey}>Title</span><span className={styles.reviewVal}>{form.title}</span></div>
              <div className={styles.reviewRow}><span className={styles.reviewKey}>Type</span><span className={styles.reviewVal}>{form.type}</span></div>
              {form.year && <div className={styles.reviewRow}><span className={styles.reviewKey}>Year</span><span className={styles.reviewVal}>{form.year}</span></div>}
              {form.genre && <div className={styles.reviewRow}><span className={styles.reviewKey}>Genre</span><span className={styles.reviewVal}>{form.genre}</span></div>}
              <div className={styles.reviewRow}><span className={styles.reviewKey}>Status</span>
                <span className={styles.statusBadge}>{form.status}</span></div>
              {form.userRating && <div className={styles.reviewRow}><span className={styles.reviewKey}>Rating</span><span className={styles.reviewVal}>⭐ {form.userRating}/10</span></div>}
              {form.notes && <div className={styles.reviewRow}><span className={styles.reviewKey}>Notes</span><span className={`${styles.reviewVal} ${styles.reviewNotes}`}>{form.notes}</span></div>}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className={styles.navRow}>
          {step > 0 && <button className={styles.backBtn} onClick={back}>← Back</button>}
          <div className={styles.navSpacer} />
          {step < STEPS.length - 1
            ? <button className={styles.nextBtn} onClick={next}>Next →</button>
            : <button className={styles.submitBtn} onClick={submit}>✓ Add to Watchlist</button>
          }
        </div>
      </div>
    </div>
  );
}
