import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 57;

export const CinematicExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef<number>(1);
  const rafIdRef = useRef<number | null>(null);
  const isDirtyRef = useRef<boolean>(true);
  const lastRenderedFrameRef = useRef<number>(-1);
  const [activeFrame, setActiveFrame] = useState<number>(1);

  // High-performance canvas frame renderer with contain/cover handling and crisp image smoothing
  const renderFrame = useCallback((targetFrame: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Enable high-quality image smoothing for pristine luxury watch rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Find requested frame or the closest available loaded frame
    let img = imagesRef.current[targetFrame - 1];
    if (!img || !img.complete || img.naturalWidth === 0) {
      let found: HTMLImageElement | null = null;
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = imagesRef.current[targetFrame - 1 - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          found = prev;
          break;
        }
        const next = imagesRef.current[targetFrame - 1 + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          found = next;
          break;
        }
      }
      img = found;
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === 0 || h === 0) return;

    // Cover calculation preserving aspect ratio without distortion or blurry stretching
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const screenRatio = w / h;

    let drawW: number;
    let drawH: number;
    let offsetX: number;
    let offsetY: number;

    if (screenRatio > imgRatio) {
      drawW = w;
      drawH = w / imgRatio;
      offsetX = 0;
      offsetY = (h - drawH) / 2;
    } else {
      drawH = h;
      drawW = h * imgRatio;
      offsetX = (w - drawW) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    lastRenderedFrameRef.current = targetFrame;
  }, []);

  // Dedicated RAF animation loop preventing multiple loops or redundant React re-renders
  useEffect(() => {
    let active = true;

    const loop = () => {
      if (!active) return;
      if (isDirtyRef.current || currentFrameRef.current !== lastRenderedFrameRef.current) {
        renderFrame(currentFrameRef.current);
        isDirtyRef.current = false;
      }
      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      active = false;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [renderFrame]);

  // Progressive frame loader: load immediate frames first, then remainder in chunks
  useEffect(() => {
    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    imagesRef.current = images;

    const loadSingleFrame = (idx: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        const numStr = String(idx).padStart(4, '0');
        img.src = `/frames/frame_${numStr}.webp`;
        img.onload = () => {
          images[idx - 1] = img;
          if (idx === 1 || idx === currentFrameRef.current) {
            isDirtyRef.current = true;
          }
          resolve(img);
        };
        img.onerror = () => {
          resolve(img);
        };
      });
    };

    // Stage 1: Load immediate start frames (1 to 10)
    const priorityPromises: Promise<HTMLImageElement>[] = [];
    for (let i = 1; i <= Math.min(10, TOTAL_FRAMES); i++) {
      priorityPromises.push(loadSingleFrame(i));
    }

    // Stage 2: Load remaining frames progressively
    Promise.all(priorityPromises).then(() => {
      isDirtyRef.current = true;
      let currentIndex = 11;

      const loadNextBatch = () => {
        if (currentIndex > TOTAL_FRAMES) return;
        const batchEnd = Math.min(currentIndex + 8, TOTAL_FRAMES);
        const batchPromises: Promise<HTMLImageElement>[] = [];
        for (let i = currentIndex; i <= batchEnd; i++) {
          batchPromises.push(loadSingleFrame(i));
        }
        currentIndex = batchEnd + 1;
        Promise.all(batchPromises).then(() => {
          if (window.requestIdleCallback) {
            window.requestIdleCallback(loadNextBatch);
          } else {
            setTimeout(loadNextBatch, 40);
          }
        });
      };

      loadNextBatch();
    });

    return () => {
      imagesRef.current = [];
    };
  }, []);

  // Setup Canvas high-DPI sizing and GSAP ScrollTrigger timeline with generous scroll distance
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const resizeCanvas = () => {
      // DPR cap to 2 to ensure crisp retina quality without GPU overheating
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayW = window.innerWidth;
      const displayH = window.innerHeight;

      if (canvas.width !== displayW * dpr || canvas.height !== displayH * dpr) {
        canvas.width = displayW * dpr;
        canvas.height = displayH * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      isDirtyRef.current = true;
    };

    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();

    // GSAP ScrollTrigger pinned timeline with 650vh scroll distance for calm, Apple-grade pacing
    const ctxGsap = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.4, // Natural organic scrub that responds to both fine wheel steps and rapid gestures
        onUpdate: (self) => {
          // Precise scroll-to-frame calculation
          const frameIndex = Math.min(
            TOTAL_FRAMES,
            Math.max(1, Math.round(self.progress * (TOTAL_FRAMES - 1)) + 1)
          );
          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            isDirtyRef.current = true;
            setActiveFrame(frameIndex);
          }
        }
      });

      // Interactive Action Elements Reveal (Explore collection CTA and metadata fade smoothly)
      gsap.to('.hero-interactive-dock', {
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '15% top',
          scrub: true,
        },
        opacity: 0,
        y: -30,
        filter: 'blur(6px)',
        ease: 'power1.out'
      });
    }, container);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      ctxGsap.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[650vh] bg-[#05070B]">
      {/* Sticky Fullscreen High-DPI Canvas Display */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block pointer-events-none select-none"
        />

        {/* Subtle Atmospheric Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-[#05070B]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#05070B]/10 to-[#05070B]/60 pointer-events-none" />

        {/* ================= HERO INTERACTIVE ACTION BAR ================= */}
        <div className="hero-interactive-dock absolute inset-0 pointer-events-auto flex flex-col justify-between p-6 md:p-14 lg:p-20 z-10">
          <div className="pt-20 md:pt-28 max-w-xl">
            {/* Action Buttons precisely positioned beneath the master heading */}
            <div className="mt-64 md:mt-72 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7">
              <a
                href="#collection"
                data-cursor="VIEW"
                className="inline-flex items-center space-x-4 bg-[#F4F1EA] text-[#05070B] px-8 py-4 text-xs tracking-[0.22em] uppercase font-medium hover:bg-white transition-all duration-300 group shadow-2xl"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>

              <a
                href="#atelier"
                data-cursor="PLAY"
                className="inline-flex items-center space-x-3 text-xs tracking-[0.2em] uppercase text-[#F4F1EA]/70 hover:text-white transition-colors group py-2"
              >
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Inside The Atelier</span>
              </a>
            </div>
          </div>

          {/* Hero Bottom Bar */}
          <div className="flex justify-between items-end text-xs font-mono text-[#F4F1EA]/50 tracking-[0.25em]">
            <div className="flex items-center space-x-3">
              <span className="text-[#F4F1EA]">01</span>
              <span className="w-8 h-[1px] bg-white/20" />
              <span>04</span>
            </div>
            <div className="flex items-center space-x-2 animate-pulse">
              <span>SCROLL TO EXPLORE</span>
              <span className="text-lg">↓</span>
            </div>
          </div>
        </div>

        {/* Frame Sequence Metadata Status */}
        <div className="absolute bottom-6 left-8 md:left-14 right-8 md:right-14 flex justify-between items-center text-[10px] font-mono text-[#F4F1EA]/40 pointer-events-none z-20">
          <span>ORA // MASTER SEQUENCE</span>
          <span>FRAME {String(activeFrame).padStart(2, '0')} / {TOTAL_FRAMES}</span>
        </div>
      </div>
    </section>
  );
};
