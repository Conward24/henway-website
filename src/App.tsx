/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';

const ASSETS = {
  LOGO_BLACK: "/images/logo-black.png"
};

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50">
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
          <Link to="/" className={`text-sm font-bold hover:text-black transition-colors ${location.pathname === '/' ? 'text-black underline underline-offset-8 decoration-henway-yellow decoration-2' : 'text-gray-500'}`}>Home</Link>
          <Link to="/product" className={`text-sm font-bold hover:text-black transition-colors ${location.pathname === '/product' ? 'text-black underline underline-offset-8 decoration-henway-yellow decoration-2' : 'text-gray-500'}`}>The App</Link>
          <a href="/product#pricing" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">Pricing</a>
          <a href="/#stories" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">Success Stories</a>
          <a href="https://app.henwayai.com/login" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">Log In</a>
          <a href="https://app.henwayai.com/login" target="_blank" rel="noopener noreferrer" className="btn-yellow text-sm py-2.5 px-6">Launch App</a>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white px-6 py-8 flex flex-col gap-6 border-b border-henway-border"
        >
          <Link to="/" className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/product" className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>The App</Link>
          <a href="/product#pricing" className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>Pricing</a>
          <a href="/#stories" className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>Success Stories</a>
          <a href="https://app.henwayai.com/login" target="_blank" rel="noopener noreferrer" className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>Log In</a>
          <a href="https://app.henwayai.com/login" target="_blank" rel="noopener noreferrer" className="btn-yellow w-full text-center" onClick={() => setIsMenuOpen(false)}>Launch App</a>
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
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Henway AI. All rights reserved.
        </p>
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
          <Route path="/product" element={<Product />} />
          {/* Discovery tool replaced by the hosted app; preserve old links */}
          <Route path="/discover" element={<Navigate to="/product" replace />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

