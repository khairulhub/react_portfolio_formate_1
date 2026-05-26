import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV = [
  { label: 'HOME',    to: '/' },
  { label: 'ABOUT',   to: '/about' },
  { label: 'WORKS',   to: '/works' },
  { label: 'CODING',  to: '/coding' },
  { label: 'NETWORK', to: '/network' },
  { label: 'BLOG',    to: '/blog' },
  { label: 'CONTACT', to: '/contact' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [time, setTime]       = useState('');
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
        '\n' +
        now.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let v = parseInt(localStorage.getItem('kh_visits') || '1247') + 1;
    localStorage.setItem('kh_visits', v);
    let d = 0;
    const id = setInterval(() => {
      d += Math.ceil((v - d) / 10);
      setVisitors(d);
      if (d >= v) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] flex items-center gap-4 px-6 h-16"
         style={{ background: 'rgba(4,8,15,0.96)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,229,255,0.3)' }}>

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 no-underline flex-shrink-0"
            style={{ fontFamily: 'Orbitron,sans-serif', color: '#00e5ff', fontWeight: 900, fontSize: 16, letterSpacing: 4 }}>
        <div className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-black"
             style={{ borderColor: '#00e5ff', color: '#00e5ff', animation: 'spin 8s linear infinite' }}>K</div>
        KHAIRULHUB
      </Link>

      {/* Nav links */}
      <div className="flex gap-0.5 flex-1 justify-center">
        {NAV.map(({ label, to }) => {
          const active = pathname === to;
          return (
            <Link key={to} to={to}
                  className="px-3 py-1.5 text-[11px] no-underline transition-all duration-200"
                  style={{
                    fontFamily: 'Share Tech Mono,monospace',
                    letterSpacing: 2,
                    color: active ? '#00e5ff' : '#2a4a6a',
                    borderBottom: active ? '2px solid #00e5ff' : '2px solid transparent',
                  }}>
              {label}
            </Link>
          );
        })}
      </div>

      {/* Right cluster */}
      <div className="flex items-center gap-3.5 flex-shrink-0">
        <div className="text-center">
          <div style={{ fontFamily: 'Orbitron,sans-serif', color: '#00e5ff', fontSize: 14, fontWeight: 700 }}>
            {visitors.toLocaleString()}
          </div>
          <div className="text-[8px] tracking-[2px]" style={{ color: '#2a4a6a', fontFamily: 'Share Tech Mono,monospace' }}>VISITORS</div>
        </div>
        <div className="w-px h-7" style={{ background: 'rgba(0,229,255,0.1)' }} />
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-[20px]"
             style={{ border: '1px solid rgba(0,255,136,0.3)', background: 'rgba(0,255,136,0.05)' }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00ff88', boxShadow: '0 0 8px #00ff88', animation: 'pulse 1.5s infinite' }} />
          <span className="text-[10px] tracking-[1px]" style={{ color: '#00ff88', fontFamily: 'Share Tech Mono,monospace' }}>ONLINE</span>
        </div>
        <div className="w-px h-7" style={{ background: 'rgba(0,229,255,0.1)' }} />
        <div className="text-right text-[10px] leading-relaxed whitespace-pre"
             style={{ color: '#6a9bbf', fontFamily: 'Share Tech Mono,monospace' }}>{time}</div>
      </div>
    </nav>
  );
}
