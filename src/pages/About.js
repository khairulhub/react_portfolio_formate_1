import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/Shared';

const STATS = [
  { val: '3+', label: 'YEARS EXP' },
  { val: '50+', label: 'PROJECTS' },
  { val: '15+', label: 'CLIENTS' },
  { val: '100%', label: 'DEDICATION' },
];

export default function About() {
  return (
    <section className="min-h-screen py-24 px-10" style={{ background: '#080e1a' }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader sub="// PROFILE.JSON" title="ABOUT ME" />

        <div className="grid gap-10" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {/* TEXT */}
          <div>
            <div className="text-sm leading-[1.9] mb-6" style={{ color: '#6a9bbf' }}>
              <p className="mb-4">
                I am a passionate <strong style={{ color: '#00e5ff' }}>Full Stack Developer</strong> and{' '}
                <strong style={{ color: '#00e5ff' }}>Network Engineer</strong> based in Dhaka, Bangladesh.
                I build modern, scalable web applications and design efficient network infrastructures.
              </p>
              <p className="mb-4">
                With expertise in MERN Stack, PHP/Laravel, .NET, and Cisco networking, I bring both
                frontend creativity and backend robustness to every project. I also work with router and
                switch configurations, VLANs, firewall management, and network security.
              </p>
              <p>
                My approach combines clean code practices with performance-driven architecture,
                ensuring every solution is both functional and maintainable.
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/contact" className="px-7 py-2.5 no-underline text-[11px] tracking-[2px] rounded"
                    style={{ fontFamily: 'Orbitron,sans-serif', background: 'rgba(0,60,110,0.8)', border: '1px solid #00e5ff', color: '#00e5ff' }}>
                HIRE ME
              </Link>
              <Link to="/works" className="px-7 py-2.5 no-underline text-[12px] rounded"
                    style={{ border: '1px solid rgba(0,229,255,0.3)', color: '#6a9bbf' }}>
                MY WORK
              </Link>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-3">
            {STATS.map(({ val, label }) => (
              <div key={label} className="rounded-xl p-5"
                   style={{ background: '#0c1422', border: '1px solid rgba(0,229,255,0.1)' }}>
                <div className="text-3xl font-black" style={{ fontFamily: 'Orbitron,sans-serif', color: '#00e5ff' }}>{val}</div>
                <div className="text-[10px] mt-0.5 tracking-[1px]" style={{ fontFamily: 'Share Tech Mono,monospace', color: '#2a4a6a' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills summary */}
        <div className="mt-10 rounded-xl p-6" style={{ background: '#0c1422', border: '1px solid rgba(0,229,255,0.1)' }}>
          <div className="text-[11px] tracking-[2px] mb-4" style={{ fontFamily: 'Share Tech Mono,monospace', color: '#2a4a6a' }}>// CORE COMPETENCIES</div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Web Development', items: ['React / Node.js', 'PHP / Laravel', 'ASP.NET Core', 'REST APIs'] },
              { label: 'Network Engineering', items: ['Cisco IOS', 'VLAN / Routing', 'Firewall / ACL', 'Network Security'] },
              { label: 'Tools & Platforms', items: ['Docker / Git', 'MySQL / MongoDB', 'Linux / Bash', 'Azure / cPanel'] },
            ].map(({ label, items }) => (
              <div key={label}>
                <div className="text-[11px] font-bold mb-2" style={{ color: '#00e5ff', fontFamily: 'Orbitron,sans-serif', letterSpacing: 1 }}>{label}</div>
                {items.map(i => (
                  <div key={i} className="flex items-center gap-2 text-[12px] mb-1" style={{ color: '#6a9bbf' }}>
                    <span style={{ color: '#00e5ff' }}>▶</span> {i}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
