import React from 'react';
import { X, CheckCircle, ShieldCheck, Clock, Award } from 'lucide-react';
import { Timepiece } from '../types';

interface WatchModalProps {
  watch: Timepiece | null;
  onClose: () => void;
  onAddToCart: (watch: Timepiece) => void;
}

export const WatchModal: React.FC<WatchModalProps> = ({ watch, onClose, onAddToCart }) => {
  if (!watch) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#05070B] border border-white/15 p-6 md:p-12 rounded-sm shadow-2xl flex flex-col md:flex-row gap-8 lg:gap-12 text-[#F4F1EA]">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 text-[#F4F1EA]/60 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Large Watch Image */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-black/50 border border-white/5 p-6 rounded-sm">
          <img
            src={watch.image}
            alt={watch.name}
            className="w-full max-h-[360px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
          />
          <div className="mt-6 flex items-center space-x-2 text-[10px] font-mono tracking-widest text-[#F4F1EA]/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>CERTIFIED GENEVA ARCHIVE REFERENCE</span>
          </div>
        </div>

        {/* Right: Technical Dossier */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-[10px] tracking-[0.25em] font-mono text-[#F4F1EA]/50 uppercase">
                {watch.brand} // {watch.number}
              </span>
              <span className="text-[10px] tracking-widest font-mono text-[#F4F1EA]/40">
                {watch.details.reference}
              </span>
            </div>

            <h3 className="font-serif text-3xl md:text-4xl text-[#F4F1EA] font-light mb-4">
              {watch.name}
            </h3>

            <div className="text-2xl font-serif text-[#F4F1EA] font-light mb-6 pb-4 border-b border-white/10">
              {watch.price}
            </div>

            {/* Specifications Matrix */}
            <div className="space-y-3 text-xs font-mono tracking-wide mb-8">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#F4F1EA]/40">CASE</span>
                <span className="text-right text-[#F4F1EA]/90">{watch.details.case}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#F4F1EA]/40">CALIBRE</span>
                <span className="text-right text-[#F4F1EA]/90">{watch.details.movement}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#F4F1EA]/40">POWER RESERVE</span>
                <span className="text-right text-[#F4F1EA]/90">{watch.details.powerReserve}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#F4F1EA]/40">DEPTH RESISTANCE</span>
                <span className="text-right text-[#F4F1EA]/90">{watch.details.waterResistance}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#F4F1EA]/40">CRYSTAL</span>
                <span className="text-right text-[#F4F1EA]/90">{watch.details.crystal}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-[#F4F1EA]/40">BRACELET</span>
                <span className="text-right text-[#F4F1EA]/90">{watch.details.strap}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3">
            <button
              onClick={() => {
                onAddToCart(watch);
                onClose();
              }}
              data-cursor="ADD"
              className="w-full bg-[#F4F1EA] text-[#05070B] py-3.5 text-xs tracking-[0.22em] uppercase font-medium hover:bg-white transition-all cursor-pointer"
            >
              Acquire Timepiece ({watch.price})
            </button>
            <p className="text-[10px] text-center text-[#F4F1EA]/40 font-mono tracking-widest">
              INCLUDES GENEVA ESCROW &amp; ARMORED COURIER DELIVERY
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
