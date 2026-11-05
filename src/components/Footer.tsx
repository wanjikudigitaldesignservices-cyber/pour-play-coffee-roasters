"use client";

import React, { useState } from "react";
import {
  Globe,
  Mail,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  Check
} from "lucide-react";

interface FooterProps {
  onOpenCMS: () => void;
}

export default function Footer({ onOpenCMS }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 3000);
  };

  return (
    <footer className="bg-[#1C1817] text-[#EDE6DC] pt-16 pb-12 border-t border-[#2C2725]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2E2825]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-baseline space-x-2">
              <span className="font-extrabold text-2xl tracking-tight text-white font-sans">
                POUR
              </span>
              <span className="text-2xl font-light text-[#C85A2B]">/</span>
              <span className="font-extrabold text-2xl tracking-tight text-white font-sans">
                PLAY
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase bg-[#2C2725] text-[#DF9E51] px-2 py-0.5 rounded ml-2">
                GLOBAL ROASTERS
              </span>
            </div>

            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Architectural specialty coffee and precision extraction. Operating
              continental micro-roasteries and bespoke franchise cafés across 18 countries.
            </p>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#2C2725] text-neutral-300 border border-[#3A3330]">
                ✦ 100% Direct Fair Trade
              </span>
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#2C2725] text-neutral-300 border border-[#3A3330]">
                ✦ Zero-Emission Roasting
              </span>
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#2C2725] text-neutral-300 border border-[#3A3330]">
                ✦ SCA 88+ Micro-Lots
              </span>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#DF9E51]">
              The Craft Experience
            </div>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a href="#craft" className="hover:text-white transition-colors">
                  1. GRIND (Flat Burr Precision)
                </a>
              </li>
              <li>
                <a href="#craft" className="hover:text-white transition-colors">
                  2. POUR (Laminar Gooseneck)
                </a>
              </li>
              <li>
                <a href="#craft" className="hover:text-white transition-colors">
                  3. SIP (Aroma Architecture)
                </a>
              </li>
              <li>
                <a href="#find-your-cup" className="hover:text-white transition-colors flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-[#C85A2B]" />
                  <span>Find Your Cup (Quiz)</span>
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Precision Gear & Kettles
                </a>
              </li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#DF9E51]">
              Franchise & Global
            </div>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a href="#franchise" className="hover:text-white transition-colors">
                  Franchise Overview
                </a>
              </li>
              <li>
                <a href="#franchise" className="hover:text-white transition-colors">
                  Interactive ROI Calculator
                </a>
              </li>
              <li>
                <a href="#franchise" className="hover:text-white transition-colors">
                  Territory Application
                </a>
              </li>
              <li>
                <a href="#cafes" className="hover:text-white transition-colors">
                  Worldwide Cafés Directory
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenCMS}
                  className="hover:text-[#C85A2B] transition-colors flex items-center space-x-1"
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>CMS Admin Console</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#DF9E51]">
              The Roaster's Dispatch
            </div>
            <p className="text-xs text-neutral-400">
              Weekly cupping scores, water recipes, and exclusive harvest reserve drops.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="barista@yourdomain.com"
                  className="w-full px-3 py-2 rounded-xl bg-[#2C2725] border border-[#3D3633] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C85A2B]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-[#C85A2B] hover:bg-[#B34D21] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-1"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe to Dispatch</span>
                    <ArrowRight className="w-3 h-3" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Global Flagship Addresses Ticker */}
        <div className="pt-8 pb-4 border-b border-[#26211F] text-[11px] text-neutral-400 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
          <div>
            <div className="font-bold text-neutral-200">🇯🇵 TOKYO</div>
            <div className="text-[10px]">Shibuya Jingumae</div>
          </div>
          <div>
            <div className="font-bold text-neutral-200">🇺🇸 NEW YORK</div>
            <div className="text-[10px]">Soho Spring St</div>
          </div>
          <div>
            <div className="font-bold text-neutral-200">🇬🇧 LONDON</div>
            <div className="text-[10px]">Shoreditch Redchurch</div>
          </div>
          <div>
            <div className="font-bold text-neutral-200">🇮🇹 MILAN</div>
            <div className="text-[10px]">Navigli Ticinese</div>
          </div>
          <div>
            <div className="font-bold text-neutral-200">🇰🇷 SEOUL</div>
            <div className="text-[10px]">Gangnam Dosan</div>
          </div>
          <div>
            <div className="font-bold text-neutral-200">🇰🇪 NAIROBI</div>
            <div className="text-[10px]">Westlands Reserve</div>
          </div>
          <div>
            <div className="font-bold text-neutral-200">🇦🇪 DUBAI</div>
            <div className="text-[10px]">DIFC Gate Village</div>
          </div>
          <div>
            <div className="font-bold text-neutral-200">🇦🇺 SYDNEY</div>
            <div className="text-[10px]">Surry Hills Crown</div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-neutral-400 space-y-3 md:space-y-0">
          <div>
            © 2026 POUR / PLAY GLOBAL ROASTERS CO. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#franchise" className="hover:text-white">Franchise Disclosure (FDD)</a>
            <a href="#journal" className="hover:text-white">Ethics & Direct Trade</a>
            <a href="#menu" className="hover:text-white">Global Shipping Policy</a>
            <button onClick={onOpenCMS} className="hover:text-[#DF9E51]">
              Backend DB Supabase
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
