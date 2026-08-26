/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';

/* Pre-launch "coming soon" gate. Soft gate: keeps casual visitors + crawlers
   out until launch. The real site renders only after the password is entered
   (stored in localStorage so the team isn't re-prompted every visit). */

const GATE_KEY = 'henway_gate_v1';
const PASSWORD = 'thehenway';

export function isGateOpen(): boolean {
  try { return localStorage.getItem(GATE_KEY) === 'open'; } catch { return false; }
}

export default function ComingSoon({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === PASSWORD) {
      try { localStorage.setItem(GATE_KEY, 'open'); } catch { /* ignore */ }
      onUnlock();
    } else {
      setError(true);
      setValue('');
    }
  };

  return (
    <div className="stage min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <div className="grain" />
      <div className="glow" style={{ top: '-120px', left: '50%', transform: 'translateX(-50%)' }} />
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative max-w-md w-full"
      >
        <img
          src="/images/chick-shades.png"
          alt="Henway"
          className="w-32 mx-auto mb-7 floaty"
          style={{ filter: 'drop-shadow(0 20px 34px rgba(0,0,0,.55))' }}
          referrerPolicy="no-referrer"
        />
        <div className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-henway-yellow mb-4">
          The experience layer for AI
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: '#f6f1e4' }}>
          Something's hatching.
        </h1>
        <p className="text-lg mt-5" style={{ color: '#b8ad90' }}>
          Henway isn't quite ready to meet the world. We're putting the finishing touches on it. Check back soon.
        </p>

        <form onSubmit={submit} className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            placeholder="Password"
            aria-label="Password"
            autoFocus
            className="rounded-full px-5 py-3.5 text-base font-semibold outline-none text-center sm:text-left w-full sm:w-auto"
            style={{
              background: 'rgba(255,255,255,.06)',
              border: `1.5px solid ${error ? '#e06b5a' : 'rgba(243,236,219,.28)'}`,
              color: '#f3ecdb',
            }}
          />
          <button type="submit" className="btn-yellow w-full sm:w-auto">Enter</button>
        </form>
        {error && (
          <p className="mt-3 text-sm font-semibold" style={{ color: '#e6a08f' }}>
            That's not it. Try again.
          </p>
        )}

        <p className="mt-10 text-xs" style={{ color: 'rgba(184,173,144,.6)' }}>
          © {new Date().getFullYear()} Henway AI
        </p>
      </motion.div>
    </div>
  );
}
