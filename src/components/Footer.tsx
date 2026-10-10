import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#05070B] border-t border-white/10 pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Giant Monogram / Brand Presence */}
        <div className="border-b border-white/10 pb-16 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <span className="font-serif text-4xl sm:text-6xl md:text-8xl tracking-[0.2em] uppercase text-[#F4F1EA] block font-light">
              ORA SWISS
            </span>
            <span className="text-xs tracking-[0.35em] uppercase text-[#F4F1EA]/40 font-mono mt-2 block">
              HAUTE HORLOGERIE GENÈVE // ARCHIVES FONDÉES EN 1926
            </span>
          </div>

          <div className="mt-8 md:mt-0 text-left md:text-right">
            <p className="text-sm font-serif italic text-[#F4F1EA]/70 max-w-sm">
              "Time is not counted by hours, but measured in eternity by the hands of our masters."
            </p>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20 text-xs font-light">
          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#F4F1EA]/40 mb-5">
              Collections
            </h4>
            <ul className="space-y-3 text-[#F4F1EA]/70">
              <li><a href="#collection" className="hover:text-white transition-colors">The Sea Collection</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Geneva Haute Series</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Geometric Horology</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Aeronautical Masters</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Historic Re-editions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#F4F1EA]/40 mb-5">
              Manufacture
            </h4>
            <ul className="space-y-3 text-[#F4F1EA]/70">
              <li><a href="#atelier" className="hover:text-white transition-colors">Our Geneva Atelier</a></li>
              <li><a href="#atelier" className="hover:text-white transition-colors">Calibre Innovations</a></li>
              <li><a href="#atelier" className="hover:text-white transition-colors">Geneva Seal Standard</a></li>
              <li><a href="#atelier" className="hover:text-white transition-colors">Permanent Registry</a></li>
              <li><a href="#atelier" className="hover:text-white transition-colors">Patrimony Restoration</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#F4F1EA]/40 mb-5">
              Salons
            </h4>
            <ul className="space-y-3 text-[#F4F1EA]/70">
              <li>Rue du Rhône 62, Geneva</li>
              <li>Bahnhofstrasse 18, Zürich</li>
              <li>Place Vendôme 12, Paris</li>
              <li>New Bond Street 45, London</li>
              <li>Madison Avenue 740, New York</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#F4F1EA]/40 mb-5">
              Private Client
            </h4>
            <p className="text-[#F4F1EA]/60 leading-relaxed mb-4 text-xs">
              Direct consultation with our Geneva concierge for bespoke allocations.
            </p>
            <a
              href="mailto:concierge@oraswiss.ch"
              className="inline-flex items-center space-x-1.5 text-xs text-[#F4F1EA] hover:border-b border-white pb-0.5 font-mono"
            >
              <span>concierge@oraswiss.ch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar & Credits */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono tracking-widest text-[#F4F1EA]/40 space-y-4 md:space-y-0">
          <div>
            © 2026 ORA SWISS SA. ALL RIGHTS RESERVED.
          </div>

          <div className="text-center">
            <span className="text-[#F4F1EA]/60">
              DESIGNED &amp; DEVELOPED BY SAYYAD ARSHAD
            </span>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS</a>
            <a href="#" className="hover:text-white transition-colors">COOKIES</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
