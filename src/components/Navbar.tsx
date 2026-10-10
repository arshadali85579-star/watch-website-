import React, { useEffect, useState } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenCart?: () => void;
  cartCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart, cartCount = 0 }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-[#05070B]/80 backdrop-blur-md border-b border-white/10 py-4'
            : 'bg-transparent py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: Menu hamburger */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#F4F1EA] hover:text-white transition-colors p-2 -ml-2 group flex items-center space-x-3 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <div className="w-5 flex flex-col items-start gap-1">
                <span className={`h-[1px] bg-current transition-all duration-300 ${menuOpen ? 'w-5 translate-y-1 rotate-45' : 'w-5'}`} />
                <span className={`h-[1px] bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : 'w-3 group-hover:w-5'}`} />
                <span className={`h-[1px] bg-current transition-all duration-300 ${menuOpen ? 'w-5 -translate-y-1 -rotate-45' : 'w-4 group-hover:w-5'}`} />
              </div>
              <span className="hidden md:inline-block text-[11px] tracking-[0.2em] uppercase font-light text-[#F4F1EA]/70 group-hover:text-white">
                Menu
              </span>
            </button>
          </div>

          {/* Center: Brand Wordmark */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-auto">
            <a href="#" className="inline-block group">
              <span className="block font-serif text-xl md:text-2xl tracking-[0.28em] text-[#F4F1EA] font-medium uppercase group-hover:opacity-90 transition-opacity">
                ORA SWISS
              </span>
              <span className="block text-[8px] md:text-[9px] tracking-[0.35em] text-[#F4F1EA]/45 uppercase mt-0.5 font-sans">
                GENEVA
              </span>
            </a>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-5 md:space-x-7 text-[#F4F1EA]">
            <a
              href="#collection"
              className="hidden lg:inline-block text-[11px] tracking-[0.2em] uppercase font-light text-[#F4F1EA]/70 hover:text-white transition-colors"
            >
              Collection
            </a>
            <a
              href="#atelier"
              className="hidden lg:inline-block text-[11px] tracking-[0.2em] uppercase font-light text-[#F4F1EA]/70 hover:text-white transition-colors"
            >
              Atelier
            </a>

            <button
              aria-label="Search timepieces"
              className="text-[#F4F1EA]/80 hover:text-white transition-colors p-1.5 cursor-pointer"
            >
              <Search className="w-4 h-4 stroke-[1.25]" />
            </button>

            <button
              onClick={onOpenCart}
              aria-label="Shopping bag"
              className="relative text-[#F4F1EA]/80 hover:text-white transition-colors p-1.5 cursor-pointer flex items-center"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.25]" />
              <span className="ml-1.5 text-[10px] tracking-widest font-mono text-[#F4F1EA]/70">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#05070B]/95 backdrop-blur-2xl transition-all duration-700 ease-in-out flex flex-col justify-between p-8 md:p-16 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="pt-20 max-w-5xl mx-auto w-full">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#F4F1EA]/40 mb-8">
            Directory — Geneva Haute Horlogerie
          </p>
          <nav className="space-y-4 md:space-y-6">
            {[
              { label: '01 / The Collection', href: '#collection' },
              { label: '02 / Technical Architecture', href: '#architecture' },
              { label: '03 / Manufacture Atelier', href: '#atelier' },
              { label: '04 / Heritage & Philosophy', href: '#heritage' },
              { label: '05 / Private Consultation', href: '#appointment' }
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block group"
              >
                <span className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#F4F1EA]/80 group-hover:text-white group-hover:translate-x-3 transition-all duration-300 inline-block font-light">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>
        </div>

        <div className="max-w-5xl mx-auto w-full border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-[#F4F1EA]/45 font-light tracking-wider">
          <p>Rue du Rhône 62, 1204 Genève, Switzerland</p>
          <p className="mt-2 md:mt-0 font-mono">TEL: +41 22 819 00 00</p>
        </div>
      </div>
    </>
  );
};
