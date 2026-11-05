"use client";

import React, { useState } from "react";
import {
  Building2,
  TrendingUp,
  DollarSign,
  Globe2,
  Award,
  CheckCircle2,
  Send,
  Sparkles,
  Calculator,
  ShieldAlert
} from "lucide-react";
import confetti from "canvas-confetti";
import { submitFranchiseInquiry } from "@/lib/supabase";

export default function MultinationalFranchiseHub() {
  // Calculator state
  const [selectedModel, setSelectedModel] = useState<"flagship" | "urban" | "kiosk">("urban");
  const [dailyCups, setDailyCups] = useState<number>(550);
  const [ticketPrice, setTicketPrice] = useState<number>(6.80);

  // Form state
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    country: "Japan",
    city: "Tokyo",
    model_type: "urban_espresso_bar",
    investment_capital: "$250k - $500k",
    previous_experience: "F&B / Hospitality Operator",
    proposed_timeline: "6 - 12 Months",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Models config
  const models = {
    flagship: {
      name: "Flagship Roastery & Sensory Lab",
      footprint: "3,500 - 5,000 sq ft",
      capex: 750000,
      margin: 0.28,
      desc: "Turnkey architectural statement featuring in-house electric fluid-bed roaster, cupping auditorium, and barista training center.",
    },
    urban: {
      name: "Urban Espresso & Pour-Over Bar",
      footprint: "1,200 - 2,000 sq ft",
      capex: 380000,
      margin: 0.26,
      desc: "Optimized for high-density metropolitan financial districts and pedestrian avenues with dual modular espresso bars.",
    },
    kiosk: {
      name: "Transit Kiosk & Drive-Thru Pod",
      footprint: "400 - 800 sq ft",
      capex: 195000,
      margin: 0.31,
      desc: "High-throughput rapid-service kiosk designed for premium transit hubs, corporate campuses, and international airports.",
    },
  };

  // Financial calculations
  const monthlyRevenue = dailyCups * ticketPrice * 30;
  const annualRevenue = monthlyRevenue * 12;
  const currentModel = models[selectedModel];
  const monthlyNet = monthlyRevenue * currentModel.margin;
  const annualNet = monthlyNet * 12;
  const paybackMonths = Math.max(10, Math.round(currentModel.capex / monthlyNet));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
      const res = await submitFranchiseInquiry({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        city: formData.city,
        model_type: formData.model_type,
        investment_capital: formData.investment_capital,
        previous_experience: formData.previous_experience,
        proposed_timeline: formData.proposed_timeline,
        message: formData.message,
      });

      if (res.success) {
        setSubmittedSuccess(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#C85A2B", "#DF9E51", "#1C1817"],
        });
      } else {
        setErrorMessage(res.error || "Failed to submit. Please try again.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error";
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="franchise" className="py-20 md:py-28 bg-[#F4EDE3] border-b border-[#E2D6C5] relative overflow-hidden">
      {/* Background Subtle Lines */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#C85A2B_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#EAE0D1] text-[#C85A2B] text-xs font-extrabold uppercase tracking-widest border border-[#DACBB7]">
            <Globe2 className="w-3.5 h-3.5" />
            <span>GLOBAL PARTNERSHIP PORTAL</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-[#1C1817] font-display tracking-tight uppercase">
            FRANCHISE WITH POUR / PLAY
          </h2>

          <p className="text-base md:text-lg text-[#665B54] leading-relaxed">
            Bring the vanguard of Fourth Wave specialty coffee to your city. We
            provide full architectural CAD plans, direct trade green bean supply,
            custom electric roasters, and our proprietary digital POS & telemetry system.
          </p>
        </div>

        {/* Global Network Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-[#E4D7C7] shadow-sm text-center">
            <div className="text-3xl md:text-4xl font-black text-[#C85A2B] font-mono mb-1">
              148+
            </div>
            <div className="text-xs font-bold text-[#1C1817] uppercase tracking-wider">
              Cafés Worldwide
            </div>
            <div className="text-[11px] text-neutral-500 mt-1">Across 18 Countries</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-[#E4D7C7] shadow-sm text-center">
            <div className="text-3xl md:text-4xl font-black text-[#DF9E51] font-mono mb-1">
              32%
            </div>
            <div className="text-xs font-bold text-[#1C1817] uppercase tracking-wider">
              Higher Average Ticket
            </div>
            <div className="text-[11px] text-neutral-500 mt-1">vs Conventional Chains</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-[#E4D7C7] shadow-sm text-center">
            <div className="text-3xl md:text-4xl font-black text-[#1C1817] font-mono mb-1">
              100%
            </div>
            <div className="text-xs font-bold text-[#1C1817] uppercase tracking-wider">
              Direct Trade Sourced
            </div>
            <div className="text-[11px] text-neutral-500 mt-1">Direct from 48 Co-ops</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-[#E4D7C7] shadow-sm text-center">
            <div className="text-3xl md:text-4xl font-black text-emerald-700 font-mono mb-1">
              14-20mo
            </div>
            <div className="text-xs font-bold text-[#1C1817] uppercase tracking-wider">
              Avg. Payback Period
            </div>
            <div className="text-[11px] text-neutral-500 mt-1">High Return on Capital</div>
          </div>
        </div>

        {/* 3 Franchise Formats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {(
            [
              { key: "flagship", ...models.flagship },
              { key: "urban", ...models.urban },
              { key: "kiosk", ...models.kiosk },
            ] as const
          ).map((m) => (
            <div
              key={m.key}
              onClick={() => setSelectedModel(m.key as any)}
              className={`p-6 rounded-3xl border-2 transition-all cursor-pointer relative ${
                selectedModel === m.key
                  ? "bg-white border-[#C85A2B] shadow-xl scale-[1.02]"
                  : "bg-white/60 border-[#E2D5C4] hover:bg-white/80"
              }`}
            >
              {selectedModel === m.key && (
                <span className="absolute -top-3 right-6 bg-[#C85A2B] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                  Active Model
                </span>
              )}
              <div className="text-xs font-bold uppercase tracking-widest text-[#C85A2B] mb-2 font-mono">
                {m.footprint}
              </div>
              <h3 className="text-xl font-bold text-[#1C1817] mb-2">{m.name}</h3>
              <p className="text-xs text-[#665B54] leading-relaxed mb-4">{m.desc}</p>
              <div className="border-t border-[#F0E6D8] pt-4 flex justify-between items-center text-xs">
                <span className="text-neutral-500">Est. Turnkey Capex:</span>
                <span className="font-extrabold text-[#1C1817] font-mono">
                  ${(m.capex / 1000).toFixed(0)}k USD
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Franchise ROI & Investment Calculator */}
        <div className="bg-white rounded-3xl border border-[#DFD3C1] shadow-xl p-6 md:p-10 mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-[#F4EDE3] text-[#C85A2B] rounded-2xl">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#1C1817] font-display uppercase">
                Interactive Franchise ROI Estimator
              </h3>
              <p className="text-xs text-neutral-500">
                Calibrate daily guest volume and ticket size to model projected returns for{" "}
                <span className="text-[#C85A2B] font-bold">{currentModel.name}</span>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-[#1C1817] uppercase tracking-wider">
                    Projected Daily Cups Sold:
                  </span>
                  <span className="text-[#C85A2B] font-mono text-base font-extrabold">
                    {dailyCups} cups / day
                  </span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="1400"
                  step="25"
                  value={dailyCups}
                  onChange={(e) => setDailyCups(Number(e.target.value))}
                  className="w-full accent-[#C85A2B] h-2 bg-[#F0E6D8] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                  <span>200 cups (Boutique)</span>
                  <span>700 cups (High Street)</span>
                  <span>1,400 cups (Transit Hub)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-[#1C1817] uppercase tracking-wider">
                    Average Beverage & Pastry Ticket:
                  </span>
                  <span className="text-[#C85A2B] font-mono text-base font-extrabold">
                    ${ticketPrice.toFixed(2)} USD
                  </span>
                </div>
                <input
                  type="range"
                  min="4.50"
                  max="11.00"
                  step="0.25"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(Number(e.target.value))}
                  className="w-full accent-[#C85A2B] h-2 bg-[#F0E6D8] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                  <span>$4.50 (Express)</span>
                  <span>$7.00 (Standard)</span>
                  <span>$11.00 (Signature Reserve)</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F7F3EC] border border-[#E5DACB] text-xs text-[#665B54] space-y-1">
                <div className="font-bold text-[#1C1817] flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-[#C85A2B]" />
                  <span>POUR / PLAY Turnkey Partner Guarantee</span>
                </div>
                <p>
                  Includes dedicated regional operations director, supply chain allocation,
                  barista barista certification, and proprietary IoT telemetry integration.
                </p>
              </div>
            </div>

            {/* Projected Metrics Dashboard */}
            <div className="lg:col-span-6 bg-[#1C1817] text-white p-6 md:p-8 rounded-2xl space-y-6">
              <div className="text-xs uppercase tracking-widest text-[#DF9E51] font-bold">
                Projected Financial Model
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-[#312B28] pb-6">
                <div>
                  <div className="text-[11px] text-neutral-400 uppercase">Monthly Gross Revenue</div>
                  <div className="text-2xl md:text-3xl font-black text-white font-mono mt-1">
                    ${Math.round(monthlyRevenue).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-neutral-400 uppercase">Annual Gross Revenue</div>
                  <div className="text-2xl md:text-3xl font-black text-[#DF9E51] font-mono mt-1">
                    ${Math.round(annualRevenue).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] text-neutral-400 uppercase">
                    Est. Annual Net Profit ({Math.round(currentModel.margin * 100)}%)
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-emerald-400 font-mono mt-1">
                    ${Math.round(annualNet).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-neutral-400 uppercase">Est. Payback Timeline</div>
                  <div className="text-2xl md:text-3xl font-black text-[#C85A2B] font-mono mt-1">
                    {paybackMonths} Months
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-neutral-400 italic">
                *Projections are estimates based on existing flagship performance across Tokyo Shibuya, London Shoreditch, and New York Soho. Actual figures depend on location and operational execution.
              </div>
            </div>
          </div>
        </div>

        {/* Franchise Inquiry Form - Direct to Supabase */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#DFD3C1] shadow-2xl p-6 md:p-10">
          <div className="text-center space-y-2 mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-[#1C1817] font-display uppercase">
              Apply For Franchise Territory Rights
            </h3>
            <p className="text-xs md:text-sm text-[#665B54]">
              Exclusive territorial licenses are currently open for qualified multi-unit operators.
              Applications are reviewed by our executive expansion committee within 48 hours.
            </p>
          </div>

          {submittedSuccess ? (
            <div className="p-8 rounded-2xl bg-[#F7F3EC] border-2 border-emerald-500/40 text-center space-y-3 animate-in zoom-in-95">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-xl font-bold text-[#1C1817]">Application Received</h4>
              <p className="text-xs md:text-sm text-[#5A514B] max-w-md mx-auto">
                Thank you, <span className="font-bold text-[#1C1817]">{formData.full_name}</span>. Your franchise dossier for{" "}
                <span className="font-bold text-[#C85A2B]">{formData.city}, {formData.country}</span> has been logged directly into our global partnership database. An expansion director will be in touch shortly.
              </p>
              <button
                onClick={() => setSubmittedSuccess(false)}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#1C1817] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#C85A2B] transition-colors"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center space-x-2">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1C1817] uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="e.g. Kenjiro Takahashi"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F7F3EC] border border-[#DDD3C2] text-xs focus:outline-none focus:border-[#C85A2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1817] uppercase tracking-wider mb-1">
                    Business Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="partner@yourcompany.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F7F3EC] border border-[#DDD3C2] text-xs focus:outline-none focus:border-[#C85A2B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1C1817] uppercase tracking-wider mb-1">
                    Direct Phone *
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+81 90 1234 5678"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F7F3EC] border border-[#DDD3C2] text-xs focus:outline-none focus:border-[#C85A2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1817] uppercase tracking-wider mb-1">
                    Target Country *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. Japan, UK, UAE"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F7F3EC] border border-[#DDD3C2] text-xs focus:outline-none focus:border-[#C85A2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1817] uppercase tracking-wider mb-1">
                    Target City / Metro *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Tokyo Shibuya"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F7F3EC] border border-[#DDD3C2] text-xs focus:outline-none focus:border-[#C85A2B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1C1817] uppercase tracking-wider mb-1">
                    Preferred Franchise Format
                  </label>
                  <select
                    value={formData.model_type}
                    onChange={(e) => setFormData({ ...formData, model_type: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F7F3EC] border border-[#DDD3C2] text-xs focus:outline-none focus:border-[#C85A2B]"
                  >
                    <option value="flagship_roastery">Flagship Roastery & Sensory Lab (3,500+ sq ft)</option>
                    <option value="urban_espresso_bar">Urban Espresso & Pour-Over Bar (1,500 sq ft)</option>
                    <option value="transit_kiosk">Transit Kiosk & Airport Pod (600 sq ft)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1817] uppercase tracking-wider mb-1">
                    Liquid Investment Capital Tier
                  </label>
                  <select
                    value={formData.investment_capital}
                    onChange={(e) => setFormData({ ...formData, investment_capital: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F7F3EC] border border-[#DDD3C2] text-xs focus:outline-none focus:border-[#C85A2B]"
                  >
                    <option value="$250k - $500k">$250,000 - $500,000 USD</option>
                    <option value="$500k - $1M">$500,000 - $1,000,000 USD</option>
                    <option value="$1M - $3M">$1,000,000 - $3,000,000 USD (Multi-Unit)</option>
                    <option value="$3M+">$3,000,000+ USD (Master Franchise)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1817] uppercase tracking-wider mb-1">
                  Candidate Background & Prime Real Estate Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail your existing hospitality holdings, proposed flagship addresses, or partner credentials..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F7F3EC] border border-[#DDD3C2] text-xs focus:outline-none focus:border-[#C85A2B]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-full bg-[#1C1817] hover:bg-[#C85A2B] text-white font-bold text-xs uppercase tracking-widest shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                {submitting ? (
                  <span>Submitting to Global Database...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Franchise Application</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
