import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const AppointmentSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    salon: 'Geneva Salon — Rue du Rhône',
    timeframe: 'This Month'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="appointment" className="relative py-28 md:py-36 bg-[#080D15] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Copy */}
        <div>
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#F4F1EA]/50 font-mono block mb-4">
            Private Viewings // Confidential Salon
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-[#F4F1EA] font-light leading-[0.92] mb-6">
            SCHEDULE A PRIVATE AUDIENCE.
          </h2>
          <p className="text-sm md:text-base text-[#F4F1EA]/70 font-light leading-relaxed mb-8">
            Experience our timepieces in person under the guidance of an ORA horological specialist. We invite private collectors to our salons in Geneva, Zürich, and Paris.
          </p>

          <div className="space-y-4 text-xs font-mono text-[#F4F1EA]/60 border-l border-white/20 pl-6">
            <p>• Complimentary bespoke champagne service</p>
            <p>• Access to private vault and historic archives</p>
            <p>• Technical consultation with Master Watchmakers</p>
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-[#05070B] border border-white/10 p-8 md:p-12 rounded-sm shadow-2xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#F4F1EA] mx-auto stroke-1" />
              <h3 className="font-serif text-3xl text-[#F4F1EA] font-light">
                REQUEST CONFIRMED
              </h3>
              <p className="text-xs text-[#F4F1EA]/60 font-light leading-relaxed max-w-sm mx-auto">
                Our Private Client Concierge in Geneva will reach out to you within four business hours to coordinate your viewing.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase font-mono text-[#F4F1EA]/50 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Lord / Lady / M."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/15 px-4 py-3 text-sm text-[#F4F1EA] placeholder-[#F4F1EA]/25 focus:outline-none focus:border-[#F4F1EA] transition-colors font-light"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase font-mono text-[#F4F1EA]/50 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="contact@patrimony.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/15 px-4 py-3 text-sm text-[#F4F1EA] placeholder-[#F4F1EA]/25 focus:outline-none focus:border-[#F4F1EA] transition-colors font-light"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase font-mono text-[#F4F1EA]/50 mb-2">
                    Salon Location
                  </label>
                  <select
                    value={formData.salon}
                    onChange={(e) => setFormData({ ...formData, salon: e.target.value })}
                    className="w-full bg-[#05070B] border border-white/15 px-4 py-3 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#F4F1EA] font-light"
                  >
                    <option value="Geneva Salon">Geneva Salon — Rue du Rhône</option>
                    <option value="Zürich Salon">Zürich Salon — Bahnhofstrasse</option>
                    <option value="Paris Salon">Paris Salon — Place Vendôme</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase font-mono text-[#F4F1EA]/50 mb-2">
                    Timeframe
                  </label>
                  <select
                    value={formData.timeframe}
                    onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                    className="w-full bg-[#05070B] border border-white/15 px-4 py-3 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#F4F1EA] font-light"
                  >
                    <option value="This Week">Within 7 Days</option>
                    <option value="This Month">This Month</option>
                    <option value="Next Quarter">Next Quarter</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                data-cursor="SUBMIT"
                className="w-full mt-4 bg-[#F4F1EA] text-[#05070B] py-4 text-xs tracking-[0.22em] uppercase font-medium hover:bg-white transition-all duration-300 flex items-center justify-center space-x-3 group cursor-pointer"
              >
                <span>Request Private Appointment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
