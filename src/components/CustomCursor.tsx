import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device supports touch
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [data-cursor]');
      if (interactive) {
        setHovered(true);
        const cursorLabel = interactive.getAttribute('data-cursor');
        setHoverText(cursorLabel || '');
      } else {
        setHovered(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (isTouch) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[999] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      <div
        className={`rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
          hovered
            ? 'w-16 h-16 bg-[#F4F1EA]/15 backdrop-blur-sm border border-[#F4F1EA]/40 scale-100'
            : 'w-2 h-2 bg-[#F4F1EA] border-none scale-100'
        }`}
      >
        {hoverText && (
          <span className="text-[9px] tracking-[0.2em] font-mono text-[#F4F1EA] uppercase">
            {hoverText}
          </span>
        )}
      </div>
    </div>
  );
};
