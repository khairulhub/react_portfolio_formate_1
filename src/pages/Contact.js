import { useState } from 'react';
import { SectionHeader } from '../components/Shared';

// ⚠️ Replace with your actual Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec';

const INFO = [
  { icon: 'ti ti-map-pin',      label: 'LOCATION',     val: 'Dhaka, Bangladesh', color: null },
  { icon: 'ti ti-mail',         label: 'EMAIL',        val: 'iubat21103033@gmail.com', color: null },
  { icon: 'ti ti-brand-github', label: 'GITHUB',       val: 'github.com/khairulhub', color: null },
  { icon: 'ti ti-brand-linkedin',label: 'LINKEDIN',    val: 'linkedin.com/in/khairulhub', color: null },
  { icon: 'ti ti-clock',        label: 'AVAILABILITY', val: '● Open for Work', color: '#00ff88' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, time: new Date().toLocaleString() }),
      });
      setForm({ name: '', email: '', subject: '', message: '' });
      setStatus('success');
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const inputStyle = {
    width: '100%', background: '#101c2e', border: '1px solid rgba(0,229,255,0.1)',
    borderRadius: 6, padding: '10px 14px', color: '#c8e8f8',
    fontFamily: 'Exo 2,sans-serif', fontSize: 13, outline: 'none',
  };

  return (
    <section className="min-h-screen py-24 px-10" style={{ background: '#080e1a' }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader sub="// CONTACT.INIT" title="CONTACT" />

        <div className="grid gap-10" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {/* INFO */}
          <div className="flex flex-col gap-3">
            {INFO.map(({ icon, label, val, color }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-3.5 rounded-lg"
                   style={{ background: '#0c1422', border: '1px solid rgba(0,229,255,0.1)' }}>
                <i className={`${icon} text-xl`} style={{ color: '#00b8cc' }} />
                <div>
                  <div className="text-[10px] tracking-[1px]" style={{ fontFamily: 'Share Tech Mono,monospace', color: '#2a4a6a' }}>{label}</div>
                  <div className="text-[13px]" style={{ color: color || '#c8e8f8' }}>{val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* FORM */}
          <div className="rounded-xl p-6 flex flex-col gap-3"
               style={{ background: '#0c1422', border: '1px solid rgba(0,229,255,0.1)' }}>
            <div className="text-[10px] tracking-[2px] mb-1" style={{ fontFamily: 'Share Tech Mono,monospace', color: '#2a4a6a' }}>
              // SEND MESSAGE → GOOGLE SHEETS
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input required placeholder="Your Name" value={form.name}
                     onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                     style={inputStyle} />
              <input required type="email" placeholder="Your Email" value={form.email}
                     onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                     style={inputStyle} />
              <input placeholder="Subject" value={form.subject}
                     onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                     style={inputStyle} />
              <textarea required rows={4} placeholder="Your Message..."
                        value={form.message}
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }} />

              {status === 'success' && (
                <div className="rounded-lg px-4 py-3 text-center text-[12px]"
                     style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)',
                              color: '#00ff88', fontFamily: 'Share Tech Mono,monospace' }}>
                  ✓ Message sent! I'll reply within 24 hours.
                </div>
              )}
              {status === 'error' && (
                <div className="rounded-lg px-4 py-3 text-center text-[12px]"
                     style={{ background: 'rgba(255,51,85,0.1)', border: '1px solid rgba(255,51,85,0.3)',
                              color: '#ff3355', fontFamily: 'Share Tech Mono,monospace' }}>
                  ✗ Something went wrong. Please try again.
                </div>
              )}

              <button type="submit" disabled={status === 'sending'}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded transition-all duration-200"
                      style={{
                        fontFamily: 'Orbitron,sans-serif', fontSize: 11, letterSpacing: 2,
                        background: 'rgba(0,60,110,0.8)', border: '1px solid #00e5ff', color: '#00e5ff',
                        cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                        opacity: status === 'sending' ? 0.6 : 1,
                      }}>
                <i className="ti ti-send" />
                {status === 'sending' ? '// SENDING...' : status === 'success' ? '✓ SENT!' : '▶ SEND MESSAGE'}
              </button>
            </form>
            <div className="text-center text-[9px] mt-1" style={{ color: '#2a4a6a', fontFamily: 'Share Tech Mono,monospace' }}>
              Powered by Google Sheets — responses stored securely
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
