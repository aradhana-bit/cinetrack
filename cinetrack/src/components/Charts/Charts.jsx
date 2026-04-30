import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area, CartesianGrid, Cell, PieChart, Pie, Legend
} from 'recharts';
import styles from './Charts.module.css';

const TIP = ({ active, payload, label }) => active && payload?.length ? (
  <div className={styles.tip}>
    <p className={styles.tipLabel}>{label}</p>
    {payload.map((p, i) => <p key={i} style={{ color: p.color }} className={styles.tipVal}>{p.name}: <b>{p.value}</b></p>)}
  </div>
) : null;

export function RatingBarChart({ data }) {
  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>Rating Distribution</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="rating" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<TIP />} />
          <Bar dataKey="count" name="Titles" radius={[4, 4, 0, 0]}>
            {data.map((_, i) => <Cell key={i} fill={i % 2 === 0 ? 'var(--accent)' : 'var(--accent-2)'} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function GenrePieChart({ data }) {
  const COLORS = ['#7c3aed','#ec4899','#06b6d4','#f59e0b','#22c55e','#ef4444','#8b5cf6','#f97316'];
  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>Genre Breakdown</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Legend iconType="circle" iconSize={7}
            formatter={v => <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{v}</span>} />
          <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.8rem' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TrendAreaChart({ data }) {
  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>Popularity Trend</h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
          <defs>
            <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<TIP />} />
          <Area type="monotone" dataKey="popularity" name="Score" stroke="var(--accent)"
            strokeWidth={2.5} fill="url(#grad1)" dot={{ r: 3, fill: 'var(--accent)' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
