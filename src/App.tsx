import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { CinematicExperience } from './sections/CinematicExperience';
import { FeaturedCollection } from './sections/FeaturedCollection';
import { AtelierStory } from './sections/AtelierStory';
import { AppointmentSection } from './sections/AppointmentSection';
import { Footer } from './components/Footer';
import { WatchModal } from './components/WatchModal';
import { Timepiece } from './types';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [loading, setLoading] = useState(true);
  const [selectedWatch, setSelectedWatch] = useState<Timepiece | null>(null);
  const [cart, setCart] = useState<Timepiece[]>([]);

  // Initialize Lenis smooth scroll and connect with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  const handleAddToCart = (watch: Timepiece) => {
    setCart((prev) => [...prev, watch]);
  };

  return (
    <div className="relative min-h-screen bg-[#05070B] text-[#F4F1EA] selection:bg-[#F4F1EA] selection:text-[#05070B]">
      {/* Luxury Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Subtle Custom Cursor for Desktop */}
      <CustomCursor />

      {/* Fixed Luxury Navigation */}
      <Navbar cartCount={cart.length} onOpenCart={() => cart.length > 0 && setSelectedWatch(cart[0])} />

      {/* Main Experience Flow */}
      <main className="w-full">
        {/* Chapter 01 to 04 Canvas Sequence & Hero */}
        <CinematicExperience />

        {/* Chapter 05: Pinned Horizontal Collection */}
        <FeaturedCollection onSelectWatch={(watch) => setSelectedWatch(watch)} />

        {/* Chapter 06: Manufacture Craft & Pillars */}
        <AtelierStory />

        {/* Chapter 07: Private Consultation & Salon Appointments */}
        <AppointmentSection />
      </main>

      {/* Luxury Footer with Designer Credit */}
      <Footer />

      {/* Interactive Timepiece Specification Dossier */}
      <WatchModal
        watch={selectedWatch}
        onClose={() => setSelectedWatch(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default App;
