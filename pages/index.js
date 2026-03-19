import { useEffect, useState } from 'react';

export default function Home() {
  const [time, setTime] = useState('24:00:00');

  useEffect(() => {
    const END = new Date('2026-03-21T00:00:00+02:00').getTime();

    function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }

    function update() {
      const diff = Math.max(0, END - Date.now());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime(pad(h) + ':' + pad(m) + ':' + pad(s));
      if (diff <= 0) clearInterval(timer);
    }

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      margin: 0,
      padding: 0,
      width: '100vw',
      height: '100vh',
      background: '#111',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '32px',
      overflow: 'hidden',
    }}>

      {/* Countdown */}
      <div style={{
        fontWeight: 900,
        fontSize: 'clamp(5rem, 20vw, 16rem)',
        color: '#fff',
        letterSpacing: '-0.02em',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}>
        {time}
      </div>

      {/* Social icons */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <a href="https://www.instagram.com/racesin_com/" target="_blank" rel="noopener noreferrer"
          style={{ color: '#fff', opacity: 0.7, transition: 'opacity 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
          </svg>
        </a>

        <a href="https://www.tiktok.com/@racesin.com" target="_blank" rel="noopener noreferrer"
          style={{ color: '#fff', opacity: 0.7, transition: 'opacity 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
        >
          <svg width="26" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
          </svg>
        </a>
      </div>

    </div>
  );
}