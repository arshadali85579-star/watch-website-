import React from 'react';
import { Shield, Sparkles, Compass, Award } from 'lucide-react';

export const AtelierStory: React.FC = () => {
  return (
    <section id="atelier" className="relative py-28 md:py-40 bg-[#05070B] overflow-hidden">
      {/* Background Macro Image with Parallax & Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <img
          src="/craft-poster.jpg"
          alt="Master watchmaker craft"
          className="w-full h-full object-cover filter contrast-125 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070B] via-[#05070B]/80 to-[#05070B]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-24">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#F4F1EA]/50 font-mono block mb-4">
            Geneva Craftsmanship // Circa 1926
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#F4F1EA] font-light leading-[0.92] mb-8">
            MANUFACTURED WITH UNCOMPROMISING DEVOTION.
          </h2>
          <p className="text-base md:text-lg text-[#F4F1EA]/70 font-light leading-relaxed">
            In our Geneva atelier, every screw, bridge, and balance wheel is hand-chamfered and assembled by master horologists who measure time not merely by ticks, but by centuries of Swiss heritage.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Compass,
              code: '01 / CHRONOMETRY',
              title: 'COSC & Geneva Seal',
              desc: 'Tested through five distinct positions across three extreme thermal conditions over 15 continuous days.'
            },
            {
              icon: Shield,
              code: '02 / METALLURGY',
              title: '316L & 18K Alloys',
              desc: 'High-density austenitic stainless steel and proprietary alloys immune to magnetism and corrosive saltwater.'
            },
            {
              icon: Sparkles,
              code: '03 / ANGLAGE',
              title: 'Hand-Polished Bevels',
              desc: 'Every bevel is filed and burnished using gentian wood pegs and diamond paste to an optical mirror gleam.'
            },
            {
              icon: Award,
              code: '04 / PERPETUITY',
              title: 'Lifetime Guarantee',
              desc: 'Every ORA creation is archived in our permanent registry in Geneva, ensuring restoration for generations.'
            }
          ].map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 bg-white/[0.015] border border-white/10 hover:border-white/30 rounded-sm transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-6">
                <pillar.icon className="w-5 h-5 text-[#F4F1EA]/70 group-hover:text-white transition-colors" />
                <span className="text-[9px] font-mono tracking-widest text-[#F4F1EA]/40">
                  {pillar.code}
                </span>
              </div>
              <h3 className="font-serif text-2xl text-[#F4F1EA] font-light mb-3">
                {pillar.title}
              </h3>
              <p className="text-xs text-[#F4F1EA]/60 font-light leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
