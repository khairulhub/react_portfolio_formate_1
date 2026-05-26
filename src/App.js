import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home    from './pages/Home';
import About   from './pages/About';
import Works   from './pages/Works';
import Coding  from './pages/Coding';
import Network from './pages/Network';
import Blog    from './pages/Blog';
import Contact from './pages/Contact';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen relative" style={{ background: '#04080f', color: '#c8e8f8', fontFamily: 'Exo 2,sans-serif' }}>
        <div className="fixed inset-0 pointer-events-none z-0"
             style={{
               backgroundImage: 'linear-gradient(rgba(0,229,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.025) 1px,transparent 1px)',
               backgroundSize: '50px 50px'
             }} />
        <Navbar />
        <main className="relative pt-16" style={{ zIndex: 2 }}>
          <Routes>
            <Route path="/"        element={<Home />} />
            <Route path="/about"   element={<About />} />
            <Route path="/works"   element={<Works />} />
            <Route path="/coding"  element={<Coding />} />
            <Route path="/network" element={<Network />} />
            <Route path="/blog"    element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer className="relative flex items-center justify-between px-10 py-5"
                style={{ zIndex: 2, borderTop: '1px solid rgba(0,229,255,0.1)', background: '#080e1a' }}>
          <div style={{ fontFamily: 'Orbitron,sans-serif', color: '#00b8cc', letterSpacing: 3, fontSize: 14 }}>KHAIRULHUB</div>
          <div style={{ color: '#2a4a6a', fontFamily: 'Share Tech Mono,monospace', fontSize: 11 }}>© 2025 KhairulHub. All systems operational.</div>
          <a href="/" style={{ color: '#2a4a6a', fontSize: 18, textDecoration: 'none' }}><i className="ti ti-arrow-up-circle" /></a>
        </footer>
      </div>
    </BrowserRouter>
  );
}
