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
      <div style={{
        fontFamily: '  --font-sans: "Avantt TRIAL Medium";',
        fontWeight: 900,
        fontSize: 'clamp(5rem, 20vw, 16rem)',
        color: '#fff',
        letterSpacing: '-0.02em',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}>
        {time}
      </div>

      <div style={{
        width: 'clamp(200px, 25vw, 340px)',
        height: 'clamp(200px, 25vw, 340px)',
        position: 'relative',
        borderRadius: '6px',
        overflow: 'hidden',
      }}>
        <img
        src="https://media1.tenor.com/m/vpiWFoSbzuMAAAAd/jet-simulator.gif"
        alt=""
        style={{
          width: 'clamp(200px, 25vw, 340px)',
          height: 'auto',
          borderRadius: '6px',
        }}
      />
      </div>
    </div>
  );
}