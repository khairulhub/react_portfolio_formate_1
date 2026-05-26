import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Tag, NetCode, SectionHeader, LoadingSkeleton } from '../components/Shared';
import Popup, { PopupHeader, PopupBody } from '../components/Popup';

function WorkCard({ item, onClick }) {
  return (
    <div onClick={() => onClick(item)}
         className="rounded-xl overflow-hidden cursor-pointer group transition-all duration-300"
         style={{ background: '#0c1422', border: '1px solid rgba(0,229,255,0.1)' }}
         onMouseEnter={e => { e.currentTarget.style.border = '1px solid rgba(0,229,255,0.35)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
         onMouseLeave={e => { e.currentTarget.style.border = '1px solid rgba(0,229,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
      {/* Image area */}
      <div className="flex items-center justify-center text-5xl"
           style={{ height: 150, background: 'linear-gradient(135deg,#101c2e,#0c1422)', borderBottom: '1px solid rgba(0,229,255,0.07)' }}>
        {item.emoji}
      </div>
      <div className="p-4">
        <div className="text-[12px] font-bold mb-1.5 tracking-[0.5px]"
             style={{ fontFamily: 'Orbitron,sans-serif', color: '#c8e8f8' }}>{item.title}</div>
        <div className="text-[11px] leading-relaxed mb-2.5" style={{ color: '#2a4a6a' }}>{item.shortDesc}</div>
        <div className="flex flex-wrap gap-1 mb-3">
          {item.tags.map(t => <Tag key={t} label={t} style={item.tagStyle} />)}
        </div>
        <div className="flex items-center gap-1 text-[10px]" style={{ color: '#00e5ff', fontFamily: 'Share Tech Mono,monospace' }}>
          <i className="ti ti-arrow-right" /> Click for details
        </div>
      </div>
    </div>
  );
}

function WorkPopup({ item, onClose }) {
  if (!item) return null;
  return (
    <Popup isOpen={!!item} onClose={onClose}>
      <PopupHeader title={`${item.emoji} ${item.title}`} subtitle="// PROJECT.DETAILS" onClose={onClose} />
      <PopupBody>
        <div className="flex flex-wrap gap-2 mb-5">
          {item.tags.map(t => <Tag key={t} label={t} style={item.tagStyle} />)}
        </div>
        <div className="grid gap-3 mb-5" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {[{ label: 'DURATION', val: item.duration }, { label: 'STATUS', val: item.status, green: true }].map(({ label, val, green }) => (
            <div key={label} className="rounded-lg p-4" style={{ background: '#0c1422', border: '1px solid rgba(0,229,255,0.1)' }}>
              <div className="text-[10px] mb-1 tracking-[1px]" style={{ color: '#2a4a6a', fontFamily: 'Share Tech Mono,monospace' }}>{label}</div>
              <div className="text-sm" style={{ color: green ? '#00ff88' : '#c8e8f8' }}>{green && '● '}{val}</div>
            </div>
          ))}
        </div>

        <h3 className="text-[12px] tracking-[2px] mb-3" style={{ fontFamily: 'Orbitron,sans-serif', color: '#00e5ff' }}>OVERVIEW</h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: '#6a9bbf' }}>{item.overview}</p>

        <h3 className="text-[12px] tracking-[2px] mb-3" style={{ fontFamily: 'Orbitron,sans-serif', color: '#00e5ff' }}>KEY FEATURES</h3>
        <ul className="space-y-2 mb-5">
          {item.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#6a9bbf' }}>
              <span style={{ color: '#00e5ff', marginTop: 2 }}>▶</span> {f}
            </li>
          ))}
        </ul>

        <h3 className="text-[12px] tracking-[2px] mb-3" style={{ fontFamily: 'Orbitron,sans-serif', color: '#00e5ff' }}>TECH STACK</h3>
        <NetCode>{item.stack}</NetCode>

        {(item.github || item.live) && (
          <div className="flex gap-3 mt-5">
            {item.github && <a href={item.github} target="_blank" rel="noreferrer"
               className="flex items-center gap-2 px-5 py-2 rounded no-underline text-[11px] tracking-[1px]"
               style={{ fontFamily: 'Orbitron,sans-serif', border: '1px solid rgba(0,229,255,0.3)', color: '#00e5ff' }}>
              <i className="ti ti-brand-github" /> GitHub
            </a>}
            {item.live && item.live !== '#' && <a href={item.live} target="_blank" rel="noreferrer"
               className="flex items-center gap-2 px-5 py-2 rounded no-underline text-[11px] tracking-[1px]"
               style={{ fontFamily: 'Orbitron,sans-serif', background: 'rgba(0,60,110,0.8)', border: '1px solid #00e5ff', color: '#00e5ff' }}>
              <i className="ti ti-external-link" /> Live Demo
            </a>}
          </div>
        )}
      </PopupBody>
    </Popup>
  );
}

export default function Works() {
  const { data, loading, error } = useFetch('/data/works.json');
  const [selected, setSelected] = useState(null);

  return (
    <section className="min-h-screen py-24 px-10" style={{ background: '#080e1a' }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader sub="// PROJECTS.LIST" title="MY WORKS" />

        {loading && <LoadingSkeleton count={6} />}
        {error && <div className="text-red-400 text-sm font-mono">Error: {error}</div>}

        {data && (
          <div className="grid grid-cols-3 gap-4">
            {data.map(item => (
              <WorkCard key={item.id} item={item} onClick={setSelected} />
            ))}
          </div>
        )}
      </div>

      <WorkPopup item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
