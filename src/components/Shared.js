export const TAG_STYLES = {
  mern:    { bg: 'rgba(0,229,255,0.08)',   color: '#38bdf8', border: 'rgba(56,189,248,0.25)' },
  php:     { bg: 'rgba(168,85,247,0.08)',  color: '#c084fc', border: 'rgba(168,85,247,0.25)' },
  net:     { bg: 'rgba(255,140,0,0.08)',   color: '#ffa040', border: 'rgba(255,140,0,0.25)' },
  network: { bg: 'rgba(250,204,21,0.08)', color: '#facc15', border: 'rgba(250,204,21,0.25)' },
  sec:     { bg: 'rgba(239,68,68,0.08)',   color: '#f87171', border: 'rgba(239,68,68,0.25)' },
};

export function Tag({ label, style = 'mern', className = '' }) {
  const s = TAG_STYLES[style] || TAG_STYLES.mern;
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-[20px] text-[9px] ${className}`}
          style={{
            fontFamily: 'Share Tech Mono,monospace',
            background: s.bg,
            color: s.color,
            border: `1px solid ${s.border}`
          }}>
      {label}
    </span>
  );
}

export function NetCode({ children, className = '' }) {
  return (
    <pre className={`rounded-lg p-3 text-[11px] leading-relaxed overflow-x-auto ${className}`}
         style={{
           background: '#020408',
           border: '1px solid rgba(0,229,255,0.1)',
           color: '#6a9bbf',
           fontFamily: 'Share Tech Mono,monospace',
           whiteSpace: 'pre-wrap',
           wordBreak: 'break-word'
         }}>
      {children}
    </pre>
  );
}

export function SkillBar({ name, level }) {
  return (
    <div>
      <div className="flex justify-between text-[12px] mb-1">
        <span style={{ color: '#c8e8f8' }}>{name}</span>
        <span style={{ color: '#00e5ff', fontFamily: 'Share Tech Mono,monospace' }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#101c2e' }}>
        <div className="h-full rounded-full transition-all duration-1000"
             style={{ width: `${level}%`, background: 'linear-gradient(90deg,#00e5ff,#00b8cc)' }} />
      </div>
    </div>
  );
}

export function SectionHeader({ sub, title }) {
  return (
    <div className="mb-8">
      <div className="text-[10px] tracking-[3px] mb-3" style={{ color: '#2a4a6a', fontFamily: 'Share Tech Mono,monospace' }}>
        {sub}
      </div>
      <div className="text-[26px] font-black tracking-[4px] mb-2"
           style={{ fontFamily: 'Orbitron,sans-serif', color: '#00e5ff' }}>{title}</div>
      <div className="w-14 h-0.5" style={{ background: 'linear-gradient(90deg,#00e5ff,transparent)' }} />
    </div>
  );
}

export function LoadingSkeleton({ count = 3 }) {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(count,3)}, 1fr)` }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl p-5 animate-pulse"
             style={{ background: '#0c1422', border: '1px solid rgba(0,229,255,0.05)', height: 180 }} />
      ))}
    </div>
  );
}
