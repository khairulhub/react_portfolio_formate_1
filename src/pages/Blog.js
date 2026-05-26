import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Tag, NetCode, SectionHeader, LoadingSkeleton } from '../components/Shared';
import Popup, { PopupHeader, PopupBody } from '../components/Popup';

function BlogCard({ item, onClick }) {
  return (
    <div onClick={() => onClick(item)}
         className="rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
         style={{ background: '#0c1422', border: '1px solid rgba(0,229,255,0.1)' }}
         onMouseEnter={e => { e.currentTarget.style.border = '1px solid rgba(0,229,255,0.35)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
         onMouseLeave={e => { e.currentTarget.style.border = '1px solid rgba(0,229,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
      <div className="flex items-center justify-center text-5xl"
           style={{ height: 150, background: 'linear-gradient(135deg,#101c2e,#0c1422)', borderBottom: '1px solid rgba(0,229,255,0.07)' }}>
        {item.emoji}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Tag label={item.tagLabel} style={item.tagStyle} />
          <span className="text-[9px]" style={{ color: '#2a4a6a', fontFamily: 'Share Tech Mono,monospace' }}>{item.date}</span>
        </div>
        <div className="text-[12px] font-bold mb-2 leading-snug"
             style={{ fontFamily: 'Orbitron,sans-serif', color: '#c8e8f8', letterSpacing: 0.5 }}>{item.title}</div>
        <div className="text-[11px] leading-relaxed mb-3" style={{ color: '#2a4a6a' }}>{item.shortDesc}</div>
        <div className="flex items-center gap-1 text-[10px]" style={{ color: '#00e5ff', fontFamily: 'Share Tech Mono,monospace' }}>
          <i className="ti ti-arrow-right" /> Read article
        </div>
      </div>
    </div>
  );
}

function BlogSection({ section }) {
  if (section.code) return (
    <div className="mb-5">
      {section.heading && <h3 className="text-[12px] tracking-[2px] mb-3" style={{ fontFamily: 'Orbitron,sans-serif', color: '#00e5ff' }}>{section.heading}</h3>}
      <NetCode>{section.code}</NetCode>
    </div>
  );

  if (section.bullets) return (
    <div className="mb-5">
      {section.heading && <h3 className="text-[12px] tracking-[2px] mb-3" style={{ fontFamily: 'Orbitron,sans-serif', color: '#00e5ff' }}>{section.heading}</h3>}
      <ul className="space-y-2">
        {section.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#6a9bbf' }}>
            <span style={{ color: '#00e5ff', marginTop: 2 }}>▶</span> {b}
          </li>
        ))}
      </ul>
    </div>
  );

  if (section.numberedList) return (
    <div className="mb-5">
      {section.heading && <h3 className="text-[12px] tracking-[2px] mb-3" style={{ fontFamily: 'Orbitron,sans-serif', color: '#00e5ff' }}>{section.heading}</h3>}
      <div className="space-y-3">
        {section.numberedList.map((item, i) => (
          <div key={i} className="flex items-start gap-3 text-sm" style={{ color: '#6a9bbf' }}>
            <span className="font-bold text-xs mt-0.5 w-6 flex-shrink-0" style={{ color: '#ff3355' }}>{String(i+1).padStart(2,'0')}</span>
            <div><strong style={{ color: '#c8e8f8' }}>{item.label}</strong> — {item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if (section.comparison) return (
    <div className="mb-5">
      {section.heading && <h3 className="text-[12px] tracking-[2px] mb-3" style={{ fontFamily: 'Orbitron,sans-serif', color: '#00e5ff' }}>{section.heading}</h3>}
      <div className="grid gap-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {section.comparison.map(col => (
          <div key={col.label} className="rounded-lg p-3" style={{ background: '#0c1422', border: '1px solid rgba(0,229,255,0.1)' }}>
            <div className="text-[10px] mb-2" style={{ fontFamily: 'Share Tech Mono,monospace', color: col.style === 'green' ? '#00ff88' : '#ffa040' }}>{col.label}</div>
            <ul className="space-y-1">
              {col.points.map(p => <li key={p} className="text-[11px]" style={{ color: '#6a9bbf' }}>{p}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  return null;
}

function BlogPopup({ item, onClose }) {
  if (!item) return null;
  return (
    <Popup isOpen={!!item} onClose={onClose}>
      <PopupHeader title={item.title} subtitle="// BLOG.POST" onClose={onClose} />
      <PopupBody>
        <div className="flex items-center gap-3 mb-5">
          <Tag label={item.tagLabel} style={item.tagStyle} />
          <span className="text-[10px]" style={{ color: '#2a4a6a', fontFamily: 'Share Tech Mono,monospace' }}>
            {item.date} · {item.readTime}
          </span>
        </div>
        <p className="text-sm leading-relaxed mb-6" style={{ color: '#6a9bbf' }}>{item.intro}</p>
        {item.sections.map((s, i) => <BlogSection key={i} section={s} />)}
      </PopupBody>
    </Popup>
  );
}

export default function Blog() {
  const { data, loading, error } = useFetch('/data/blog.json');
  const [selected, setSelected] = useState(null);

  return (
    <section className="min-h-screen py-24 px-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader sub="// BLOG.POSTS" title="BLOG" />

        {loading && <LoadingSkeleton count={6} />}
        {error && <div className="text-red-400 text-sm font-mono">Error: {error}</div>}

        {data && (
          <div className="grid grid-cols-3 gap-4">
            {data.map(item => (
              <BlogCard key={item.id} item={item} onClick={setSelected} />
            ))}
          </div>
        )}
      </div>

      <BlogPopup item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
