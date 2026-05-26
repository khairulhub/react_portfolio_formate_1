import { useEffect } from 'react';

export default function Popup({ isOpen, onClose, children }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', handler);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9000] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative rounded-2xl overflow-y-auto"
        style={{
          width: '80%',
          maxWidth: 900,
          maxHeight: '85vh',
          background: '#080e1a',
          border: '1px solid rgba(0,229,255,0.3)',
          animation: 'popupIn .25s ease'
        }}
      >
        {children}
      </div>
      <style>{`@keyframes popupIn{from{transform:scale(.92);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
    </div>
  );
}

export function PopupHeader({ title, subtitle, onClose }) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
         style={{ background: '#0c1422', borderBottom: '1px solid rgba(0,229,255,0.1)' }}>
      <div>
        {subtitle && <div className="text-[10px] tracking-[2px] mb-0.5" style={{ color: '#2a4a6a', fontFamily: 'Share Tech Mono,monospace' }}>{subtitle}</div>}
        <div className="font-bold text-lg" style={{ fontFamily: 'Orbitron,sans-serif', color: '#00e5ff' }}>{title}</div>
      </div>
      <button onClick={onClose}
              className="text-2xl transition-colors hover:text-cyan-400"
              style={{ background: 'none', border: 'none', color: '#6a9bbf', cursor: 'pointer' }}>
        <i className="ti ti-x" />
      </button>
    </div>
  );
}

export function PopupBody({ children }) {
  return <div className="p-7">{children}</div>;
}
