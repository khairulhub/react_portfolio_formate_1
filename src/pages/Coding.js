import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Tag, NetCode, SkillBar, SectionHeader, LoadingSkeleton } from '../components/Shared';
import Popup, { PopupHeader, PopupBody } from '../components/Popup';

function CodingCard({ item, onClick }) {
  return (
    <div onClick={() => onClick(item)}
         className="rounded-xl p-5 cursor-pointer transition-all duration-300"
         style={{ background: '#0c1422', border: '1px solid rgba(0,229,255,0.1)' }}
         onMouseEnter={e => { e.currentTarget.style.border = '1px solid rgba(0,229,255,0.35)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
         onMouseLeave={e => { e.currentTarget.style.border = '1px solid rgba(0,229,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
      <div className="text-3xl mb-3">{item.emoji}</div>
      <div className="text-[12px] font-bold mb-1.5 tracking-[0.5px]"
           style={{ fontFamily: 'Orbitron,sans-serif', color: '#c8e8f8' }}>{item.title}</div>
      <div className="text-[11px] leading-relaxed mb-3" style={{ color: '#2a4a6a' }}>{item.shortDesc}</div>

      {/* Show first 2 skills */}
      <div className="space-y-2 mb-3">
        {item.skills.slice(0, 2).map(s => <SkillBar key={s.name} name={s.name} level={s.level} />)}
      </div>
      <div className="flex items-center gap-1 text-[10px]" style={{ color: '#00e5ff', fontFamily: 'Share Tech Mono,monospace' }}>
        <i className="ti ti-arrow-right" /> View details
      </div>
    </div>
  );
}

function CodingPopup({ item, onClose }) {
  if (!item) return null;
  return (
    <Popup isOpen={!!item} onClose={onClose}>
      <PopupHeader title={`${item.emoji} ${item.title}`} subtitle="// SKILL.PROFILE" onClose={onClose} />
      <PopupBody>
        <p className="text-sm leading-relaxed mb-5" style={{ color: '#6a9bbf' }}>{item.overview}</p>

        <h3 className="text-[12px] tracking-[2px] mb-3" style={{ fontFamily: 'Orbitron,sans-serif', color: '#00e5ff' }}>SKILL LEVELS</h3>
        <div className="grid gap-3 mb-5" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {item.skills.map(s => <SkillBar key={s.name} name={s.name} level={s.level} />)}
        </div>

        <h3 className="text-[12px] tracking-[2px] mb-3" style={{ fontFamily: 'Orbitron,sans-serif', color: '#00e5ff' }}>{item.sampleTitle}</h3>
        <NetCode className="mb-5">{item.sampleCode}</NetCode>

        <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <h3 className="text-[12px] tracking-[2px] mb-2" style={{ fontFamily: 'Orbitron,sans-serif', color: '#00e5ff' }}>PROJECTS USED IN</h3>
            {item.projects.map(p => (
              <div key={p} className="flex items-center gap-2 text-[12px] mb-1" style={{ color: '#6a9bbf' }}>
                <span style={{ color: '#00e5ff' }}>▶</span> {p}
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-[12px] tracking-[2px] mb-2" style={{ fontFamily: 'Orbitron,sans-serif', color: '#00e5ff' }}>TOOLS & LIBRARIES</h3>
            <div className="flex flex-wrap gap-1.5">
              {item.tools.map(t => <Tag key={t} label={t} style={item.tagStyle} />)}
            </div>
          </div>
        </div>
      </PopupBody>
    </Popup>
  );
}

export default function Coding() {
  const { data, loading, error } = useFetch('/data/coding.json');
  const [selected, setSelected] = useState(null);

  return (
    <section className="min-h-screen py-24 px-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader sub="// SKILLS.EXECUTE" title="CODING" />

        {/* Terminal header */}
        <div className="rounded-xl overflow-hidden mb-6" style={{ background: '#020408', border: '1px solid rgba(0,229,255,0.3)' }}>
          <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: '#0c1422', borderBottom: '1px solid rgba(0,229,255,0.1)' }}>
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff3355' }} />
            <div className="w-2.5 h-2.5 rounded-full ml-1" style={{ background: '#ff8c00' }} />
            <div className="w-2.5 h-2.5 rounded-full ml-1" style={{ background: '#00ff88' }} />
            <div className="flex-1 text-center text-[11px]" style={{ color: '#2a4a6a', fontFamily: 'Share Tech Mono,monospace' }}>khairulhub@dev ~ bash</div>
          </div>
          <div className="p-5 text-[13px] leading-[1.8]" style={{ fontFamily: 'Share Tech Mono,monospace' }}>
            <div className="flex gap-2 mb-2"><span style={{ color: '#00ff88' }}>$</span><span style={{ color: '#00e5ff' }}>skill --list --all</span></div>
            <div className="pl-5 mb-2" style={{ color: '#6a9bbf' }}>
              <span style={{ color: '#00b8cc' }}>→ Web:</span> MERN Stack, PHP/Laravel, ASP.NET Core, HTML/CSS, Tailwind<br />
              <span style={{ color: '#00b8cc' }}>→ DevOps:</span> Docker, Git, GitHub Actions, Linux, MySQL, PostgreSQL<br />
              <span style={{ color: '#00b8cc' }}>→ Design:</span> Figma, Tailwind CSS, SCSS, Framer Motion
            </div>
            <div className="flex gap-2"><span style={{ color: '#00ff88' }}>$</span><span style={{ color: '#00e5ff', animation: 'blink 1s step-end infinite' }}>_</span></div>
          </div>
        </div>

        {loading && <LoadingSkeleton count={6} />}
        {error && <div className="text-red-400 text-sm font-mono">Error: {error}</div>}

        {data && (
          <div className="grid grid-cols-3 gap-4">
            {data.map(item => (
              <CodingCard key={item.id} item={item} onClick={setSelected} />
            ))}
          </div>
        )}
      </div>

      <CodingPopup item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
