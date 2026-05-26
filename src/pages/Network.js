import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Tag, NetCode, SkillBar, SectionHeader, LoadingSkeleton } from '../components/Shared';
import Popup, { PopupHeader, PopupBody } from '../components/Popup';

function NetCard({ item, onClick }) {
  return (
    <div onClick={() => onClick(item)}
         className="rounded-xl p-5 cursor-pointer transition-all duration-300"
         style={{ background: '#0c1422', border: '1px solid rgba(0,229,255,0.1)' }}
         onMouseEnter={e => { e.currentTarget.style.border = '1px solid rgba(0,229,255,0.35)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
         onMouseLeave={e => { e.currentTarget.style.border = '1px solid rgba(0,229,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
      <div className="text-[12px] font-bold tracking-[2px] mb-3.5 flex items-center gap-2"
           style={{ fontFamily: 'Orbitron,sans-serif', color: '#00b8cc' }}>
        <i className={item.icon} /> {item.title}
      </div>
      <NetCode>{item.previewCode}</NetCode>
      <div className="flex items-center gap-1 mt-3 text-[10px]"
           style={{ color: '#00e5ff', fontFamily: 'Share Tech Mono,monospace' }}>
        <i className="ti ti-arrow-right" /> Click for full config
      </div>
    </div>
  );
}

function NetPopup({ item, onClose }) {
  if (!item) return null;
  return (
    <Popup isOpen={!!item} onClose={onClose}>
      <PopupHeader title={`${item.emoji} ${item.title}`} subtitle="// NETWORK.CONFIG" onClose={onClose} />
      <PopupBody>
        <p className="text-sm leading-relaxed mb-5" style={{ color: '#6a9bbf' }}>{item.overview}</p>

        <h3 className="text-[12px] tracking-[2px] mb-3" style={{ fontFamily: 'Orbitron,sans-serif', color: '#00e5ff' }}>SKILL LEVELS</h3>
        <div className="grid gap-3 mb-5" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {item.skills.map(s => <SkillBar key={s.name} name={s.name} level={s.level} />)}
        </div>

        <h3 className="text-[12px] tracking-[2px] mb-3" style={{ fontFamily: 'Orbitron,sans-serif', color: '#00e5ff' }}>FULL CONFIGURATION</h3>
        <NetCode className="mb-5">{item.fullCode}</NetCode>

        {item.certifications?.length > 0 && (
          <>
            <h3 className="text-[12px] tracking-[2px] mb-3" style={{ fontFamily: 'Orbitron,sans-serif', color: '#00e5ff' }}>CERTIFICATIONS</h3>
            <div className="space-y-2">
              {item.certifications.map(c => (
                <div key={c} className="flex items-center gap-3 rounded-lg px-4 py-3"
                     style={{ background: '#0c1422', border: '1px solid rgba(0,229,255,0.1)' }}>
                  <span className="text-xl">🏆</span>
                  <div className="text-sm" style={{ fontFamily: 'Orbitron,sans-serif', color: '#c8e8f8' }}>{c}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </PopupBody>
    </Popup>
  );
}

export default function Network() {
  const { data, loading, error } = useFetch('/data/networking.json');
  const [selected, setSelected] = useState(null);

  return (
    <section className="min-h-screen py-24 px-10" style={{ background: '#080e1a' }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader sub="// NETWORK.CONFIG" title="NETWORKING" />

        {loading && <LoadingSkeleton count={4} />}
        {error && <div className="text-red-400 text-sm font-mono">Error: {error}</div>}

        {data && (
          <div className="grid grid-cols-2 gap-5">
            {data.map(item => (
              <NetCard key={item.id} item={item} onClick={setSelected} />
            ))}
          </div>
        )}
      </div>

      <NetPopup item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
