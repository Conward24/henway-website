/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Studio from './pages/Studio';
import Method from './pages/Method';
import CaseMagnolia from './pages/CaseMagnolia';
import Consultants from './pages/Consultants';
import Security from './pages/Security';
import Support from './pages/Support';

const ASSETS = {
  LOGO_BLACK: "/images/logo-black.png"
};

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Smooth-scroll to the pricing section, routing home first if we're on another page.
  const scrollToPricing = () => {
    setIsMenuOpen(false);
    const attempt = (n = 0) => {
      const el = document.getElementById('pricing');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else if (n < 12) setTimeout(() => attempt(n + 1), 50);
    };
    if (location.pathname !== '/') navigate('/');
    attempt();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-henway-paper/85 backdrop-blur-md z-50 border-b border-henway-border/60">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src={ASSETS.LOGO_BLACK} 
            alt="Henway Logo" 
            className="h-10 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link to="/studio" className={`text-sm font-bold hover:text-black transition-colors ${location.pathname === '/studio' ? 'text-black underline underline-offset-8 decoration-henway-yellow decoration-2' : 'text-gray-500'}`}>Studio</Link>
          <Link to="/consultants" className={`text-sm font-bold hover:text-black transition-colors ${location.pathname === '/consultants' ? 'text-black underline underline-offset-8 decoration-henway-yellow decoration-2' : 'text-gray-500'}`}>Consultants</Link>
          <Link to="/method" className={`text-sm font-bold hover:text-black transition-colors ${location.pathname === '/method' ? 'text-black underline underline-offset-8 decoration-henway-yellow decoration-2' : 'text-gray-500'}`}>Method</Link>
          <a href="/#pricing" onClick={(e) => { e.preventDefault(); scrollToPricing(); }} className="text-sm font-bold text-gray-500 hover:text-black transition-colors">Pricing</a>
          <a href="https://app.henwayai.com/login" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">Log in</a>
          <a href="https://app.henwayai.com/signup" target="_blank" rel="noopener noreferrer" className="btn-yellow text-sm py-2.5 px-6">Start free</a>
        </div>

        <button className="md:hidden" aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white px-6 py-8 flex flex-col gap-6 border-b border-henway-border"
        >
          <Link to="/studio" className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>Studio</Link>
          <Link to="/consultants" className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>Consultants</Link>
          <Link to="/method" className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>Method</Link>
          <a href="/#pricing" onClick={(e) => { e.preventDefault(); scrollToPricing(); }} className="text-lg font-bold">Pricing</a>
          <a href="https://app.henwayai.com/login" target="_blank" rel="noopener noreferrer" className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>Log in</a>
          <a href="https://app.henwayai.com/signup" target="_blank" rel="noopener noreferrer" className="btn-yellow w-full text-center" onClick={() => setIsMenuOpen(false)}>Start free</a>
        </motion.div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-henway-border">
      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-8 py-0">
        <img
          src={ASSETS.LOGO_BLACK}
          alt="Henway Logo"
          className="h-8 w-auto opacity-50"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Footer">
            <Link to="/support" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">Support</Link>
            <Link to="/security" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">Security</Link>
            <a href="https://app.henwayai.com/privacy" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">Privacy Policy</a>
            <a href="https://app.henwayai.com/terms" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">Terms of Service</a>
          </nav>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Henway AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans selection:bg-henway-yellow selection:text-black">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/consultants" element={<Consultants />} />
          <Route path="/method" element={<Method />} />
          <Route path="/case-study/magnolia" element={<CaseMagnolia />} />
          <Route path="/security" element={<Security />} />
          <Route path="/support" element={<Support />} />
          {/* The App page was consolidated into Home; preserve old links */}
          <Route path="/product" element={<Navigate to="/" replace />} />
          <Route path="/discover" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

