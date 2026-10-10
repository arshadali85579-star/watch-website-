import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FEATURED_TIMEPIECES } from '../data/watches';
import { Timepiece } from '../types';
import { ArrowRight, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedCollectionProps {
  onSelectWatch: (watch: Timepiece) => void;
}

export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({ onSelectWatch }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Pin horizontal gallery on desktop & laptop
      const totalScroll = track.scrollWidth - window.innerWidth + 120;

      gsap.to(track, {
        x: () => -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScroll * 1.2}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="relative min-h-screen bg-[#05070B] overflow-hidden flex flex-col justify-center py-20"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-950/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-12 flex flex-col md:flex-row md:items-end justify-between">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#F4F1EA]/50 font-mono block mb-3">
            The Collection — Geneva Archives
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#F4F1EA] font-light leading-none">
            FEATURED TIMEPIECES
          </h2>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-6 text-xs font-mono tracking-widest text-[#F4F1EA]/60">
          <span>06 ICONIC REFERENCES</span>
          <span className="hidden sm:inline-block w-8 h-[1px] bg-white/20" />
          <span className="hidden sm:inline-block">SCROLL HORIZONTALLY →</span>
        </div>
      </div>

      {/* Horizontal Sliding Track */}
      <div className="w-full overflow-visible">
        <div
          ref={trackRef}
          className="flex items-center space-x-8 md:space-x-12 px-6 md:px-16 w-max"
        >
          {FEATURED_TIMEPIECES.map((watch) => (
            <div
              key={watch.id}
              onClick={() => onSelectWatch(watch)}
              data-cursor="VIEW"
              className="w-[310px] sm:w-[360px] md:w-[420px] bg-white/[0.02] border border-white/10 hover:border-white/30 rounded-sm p-6 md:p-8 flex flex-col justify-between transition-all duration-500 group cursor-pointer hover:-translate-y-2"
            >
              {/* Card Header */}
              <div className="flex justify-between items-baseline border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-[10px] tracking-[0.25em] font-mono text-[#F4F1EA]/50 uppercase block">
                    {watch.brand}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#F4F1EA] font-light mt-1">
                    {watch.name}
                  </h3>
                </div>
                <span className="font-mono text-xs text-[#F4F1EA]/40">
                  {watch.number}
                </span>
              </div>

              {/* Watch Macro Artwork */}
              <div className="relative aspect-3/4 w-full overflow-hidden bg-black/40 mb-6 flex items-center justify-center p-4">
                <img
                  src={watch.image}
                  alt={watch.name}
                  className="w-full h-full object-contain filter contrast-105 group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/40 pointer-events-none" />

                {/* Status Badge */}
                <div className="absolute bottom-3 left-3 flex items-center space-x-2 bg-[#05070B]/80 backdrop-blur-md px-2.5 py-1 border border-white/10">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      watch.status === 'AVAILABLE'
                        ? 'bg-emerald-400'
                        : watch.status === 'LAST ONE'
                        ? 'bg-amber-400'
                        : 'bg-rose-400'
                    }`}
                  />
                  <span className="text-[9px] font-mono tracking-widest text-[#F4F1EA]/80 uppercase">
                    {watch.status}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex justify-between items-end pt-2">
                <div>
                  <span className="text-[9px] tracking-[0.2em] uppercase font-mono text-[#F4F1EA]/40 block">
                    Retail Valuation
                  </span>
                  <span className="font-serif text-2xl text-[#F4F1EA] font-light">
                    {watch.price}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-full border border-white/15 group-hover:border-white/60 flex items-center justify-center text-[#F4F1EA] transition-all group-hover:bg-[#F4F1EA] group-hover:text-[#05070B]">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
