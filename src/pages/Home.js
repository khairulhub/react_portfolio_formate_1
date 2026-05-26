import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-10">
      <div className="flex items-center gap-20 max-w-5xl w-full mx-auto">

        {/* LEFT */}
        <div className="flex-1">
          <div className="flex items-center gap-2 text-[11px] tracking-[4px] mb-4"
               style={{ color: '#00b8cc', fontFamily: 'Share Tech Mono,monospace' }}>
            <span className="inline-block w-8 h-px" style={{ background: '#00b8cc' }} />
            FULL STACK DEVELOPER &amp; NETWORK ENGINEER
          </div>

          <div className="text-5xl font-black leading-tight mb-2"
               style={{ fontFamily: 'Orbitron,sans-serif', color: '#00e5ff',
                        textShadow: '0 0 40px rgba(0,229,255,0.4)', animation: 'glow 3s ease-in-out infinite alternate' }}>
            KHAIRUL
          </div>
          <div className="text-lg font-medium tracking-[3px] mb-6"
               style={{ fontFamily: 'Orbitron,sans-serif', color: '#6a9bbf' }}>// SYSTEM ONLINE</div>

          <p className="text-sm leading-relaxed max-w-md mb-8" style={{ color: '#6a9bbf' }}>
            Passionate developer and network engineer from Bangladesh.
            Building scalable web applications and designing robust network infrastructures.
            Specialized in MERN Stack, PHP/Laravel, .NET, and Cisco networking.
          </p>

          <div className="flex gap-3 flex-wrap mb-6">
            <Link to="/works"
                  className="px-7 py-2.5 no-underline text-[11px] tracking-[2px] rounded transition-all duration-200"
                  style={{ fontFamily: 'Orbitron,sans-serif', background: 'rgba(0,60,110,0.8)',
                           border: '1px solid #00e5ff', color: '#00e5ff' }}>
              VIEW WORKS
            </Link>
            <Link to="/contact"
                  className="px-7 py-2.5 no-underline text-[12px] rounded transition-all duration-200"
                  style={{ border: '1px solid rgba(0,229,255,0.3)', color: '#6a9bbf' }}>
              CONTACT ME
            </Link>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {['MERN STACK','PHP / LARAVEL','.NET','CISCO','CCNA','DOCKER'].map(t => (
              <span key={t} className="px-2.5 py-0.5 rounded-[20px] text-[10px]"
                    style={{ border: '1px solid rgba(0,229,255,0.25)', color: '#00b8cc', fontFamily: 'Share Tech Mono,monospace' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT: Photo */}
        <div className="flex-shrink-0">
          <div className="relative w-[280px] h-[360px]">
            <div className="absolute inset-0 rounded-xl"
                 style={{ border: '1px solid rgba(0,229,255,0.3)', background: 'linear-gradient(135deg,rgba(0,229,255,0.05),transparent)' }} />
            <div className="w-full h-full rounded-xl flex items-center justify-center text-8xl"
                 style={{ background: 'linear-gradient(135deg,#0c1422,#080e1a)' }}>👨‍💻</div>
            {/* Corner brackets */}
            {['-top-1 -left-1 border-t-2 border-l-2','-top-1 -right-1 border-t-2 border-r-2',
              '-bottom-1 -left-1 border-b-2 border-l-2','-bottom-1 -right-1 border-b-2 border-r-2'].map((c,i) => (
              <div key={i} className={`absolute w-4 h-4 ${c}`} style={{ borderColor: '#00e5ff' }} />
            ))}
            {/* Scan line */}
            <div className="absolute left-0 right-0 h-0.5 opacity-40"
                 style={{ background: 'linear-gradient(90deg,transparent,#00e5ff,transparent)', animation: 'photoScan 3s ease-in-out infinite' }} />
          </div>
          <div className="mt-4 flex flex-col gap-1.5">
            <div className="text-[10px]" style={{ color: '#2a4a6a', fontFamily: 'Share Tech Mono,monospace' }}>
              <span style={{ color: '#00ff88' }}>●</span> STATUS: AVAILABLE FOR HIRE
            </div>
            <div className="text-[10px]" style={{ color: '#2a4a6a', fontFamily: 'Share Tech Mono,monospace' }}>
              <span style={{ color: '#00e5ff' }}>▶</span> LOCATION: DHAKA, BANGLADESH
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
