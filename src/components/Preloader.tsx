import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const totalFrames = 57;
    let loadedCount = 0;
    const initialSample = Math.min(12, totalFrames);

    // Preload critical initial frames
    for (let i = 1; i <= initialSample; i++) {
      const img = new Image();
      const numStr = String(i).padStart(4, '0');
      img.src = `/frames/frame_${numStr}.webp`;
      img.onload = () => {
        loadedCount++;
        const pct = Math.floor((loadedCount / initialSample) * 100);
        setProgress(pct);
        if (loadedCount >= initialSample) {
          setTimeout(() => {
            setFading(true);
            setTimeout(onComplete, 500);
          }, 150);
        }
      };
      img.onerror = () => {
        loadedCount++;
        const pct = Math.floor((loadedCount / initialSample) * 100);
        setProgress(pct);
        if (loadedCount >= initialSample) {
          setTimeout(() => {
            setFading(true);
            setTimeout(onComplete, 500);
          }, 150);
        }
      };
    }

    // Safety fallback
    const fallbackTimer = setTimeout(() => {
      setProgress(100);
      setFading(true);
      setTimeout(onComplete, 500);
    }, 1500);

    return () => clearTimeout(fallbackTimer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#05070B] flex flex-col justify-between p-8 md:p-14 select-none transition-all duration-700 ease-in-out ${
        fading ? 'opacity-0 pointer-events-none scale-102' : 'opacity-100'
      }`}
    >
      <div className="flex justify-between items-center text-[10px] tracking-[0.3em] uppercase text-[#F4F1EA]/50 font-mono">
        <span>ORA SWISS</span>
        <span>GENÈVE — 1926</span>
      </div>

      <div className="text-center my-auto">
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-[0.25em] uppercase text-[#F4F1EA] font-light mb-3">
          TIME REDEFINED
        </h1>
        <p className="text-[11px] tracking-[0.35em] uppercase text-[#F4F1EA]/40 font-mono">
          CALIBRATING MASTER ATELIER
        </p>
      </div>

      <div className="w-full max-w-md mx-auto space-y-3">
        <div className="flex justify-between items-baseline text-xs text-[#F4F1EA]/70 font-mono">
          <span>SEQUENCE INITIALIZATION</span>
          <span>{String(progress).padStart(3, '0')} / 100%</span>
        </div>
        <div className="w-full h-[1px] bg-white/10 overflow-hidden relative">
          <div
            className="h-full bg-[#F4F1EA] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
