"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Globe,
  Store,
  BookOpen,
  Sparkles,
  Menu as MenuIcon,
  X,
  Lock,
  ChevronDown,
  Layers,
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenCMS: () => void;
  onSelectStep?: (stepIndex: number) => void;
  currentRegion: string;
  onRegionChange: (region: string) => void;
}

export const REGIONS = [
  { code: "JP", name: "Tokyo Shibuya", flag: "🇯🇵", currency: "¥ / $" },
  { code: "US", name: "New York Soho", flag: "🇺🇸", currency: "$" },
  { code: "GB", name: "London Shoreditch", flag: "🇬🇧", currency: "£ / $" },
  { code: "IT", name: "Milan Navigli", flag: "🇮🇹", currency: "€ / $" },
  { code: "KE", name: "Nairobi Reserve", flag: "🇰🇪", currency: "KES / $" },
  { code: "AE", name: "Dubai DIFC", flag: "🇦🇪", currency: "AED / $" },
  { code: "KR", name: "Seoul Gangnam", flag: "🇰🇷", currency: "₩ / $" },
  { code: "AU", name: "Sydney Crown St", flag: "🇦🇺", currency: "A$ / $" },
];

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenCMS,
  onSelectStep,
  currentRegion,
  onRegionChange,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);

  const selectedRegion =
    REGIONS.find((r) => r.name === currentRegion) || REGIONS[0];

  return (
    <>
      {/* ── Top Auxiliary Ribbon (Haute Global Network) ── */}
      <div className="bg-[#0C0A09] text-white/70 text-[10.5px] font-mono tracking-[0.16em] uppercase py-2 px-4 md:px-8 border-b border-white/[0.06] select-none transition-all">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DF9E51] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DF9E51]" />
            </span>
            <span className="text-[#DF9E51] font-semibold tracking-[0.2em]">
              GLOBAL ROASTERY NETWORK
            </span>
            <span className="hidden md:inline text-white/20">/</span>
            <span className="hidden md:inline text-white/60 font-sans tracking-normal text-xs">
              Direct-Trade 2026 Micro-Lots pouring across 18 Flagship Salons
            </span>
          </div>

          <div className="flex items-center space-x-5">
            {/* Global Metro & Currency Switcher */}
            <div className="relative">
              <button
                onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
                className="flex items-center space-x-2 py-0.5 px-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 text-white/80 hover:text-white transition-all"
              >
                <Globe className="w-3 h-3 text-[#DF9E51]" />
                <span className="font-sans font-medium text-[11px] tracking-normal">
                  {selectedRegion.flag} {selectedRegion.name}
                </span>
                <span className="text-[9.5px] text-[#DF9E51] font-mono ml-0.5">
                  ({selectedRegion.currency.split("/")[0].trim()})
                </span>
                <ChevronDown className="w-3 h-3 text-white/40" />
              </button>

              {regionDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-[#120F0E]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95"
                  onMouseLeave={() => setRegionDropdownOpen(false)}
                >
                  <div className="px-3.5 py-1.5 text-[9px] uppercase text-white/40 font-mono tracking-[0.2em] border-b border-white/[0.06]">
                    Select Flagship Salon
                  </div>
                  {REGIONS.map((r) => (
                    <button
                      key={r.code}
                      onClick={() => {
                        onRegionChange(r.name);
                        setRegionDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-white/[0.06] transition-colors ${
                        r.name === currentRegion
                          ? "text-[#DF9E51] font-semibold bg-white/[0.03]"
                          : "text-white/80"
                      }`}
                    >
                      <span className="flex items-center space-x-2">
                        <span className="text-sm">{r.flag}</span>
                        <span className="font-sans">{r.name}</span>
                      </span>
                      <span className="text-[10px] font-mono text-white/40">{r.currency}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CMS Portal Trigger Link */}
            <button
              onClick={onOpenCMS}
              className="hidden sm:inline-flex items-center space-x-1.5 text-white/60 hover:text-[#DF9E51] transition-colors text-[10.5px] tracking-[0.16em]"
              title="Restricted Staff Portal"
            >
              <Lock className="w-3 h-3 text-[#DF9E51]" />
              <span>CMS Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Posh Header (Porsche-Inspired Minimalist Smoked Glass) ── */}
      <header className="sticky top-0 z-40 bg-[#100D0C]/85 backdrop-blur-2xl border-b border-white/[0.08] transition-all shadow-[0_4px_30px_rgba(0,0,0,0.35)]">
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo with Bespoke Minimalist Luxury Emblem */}
          <a
            href="#"
            className="flex items-center transition-opacity hover:opacity-90"
            aria-label="POUR / PLAY Homepage"
          >
            <BrandLogo variant="light" size="md" withTagline={true} />
          </a>

          {/* Desktop Navigation Links — Ultra-Refined & Posh */}
          <nav className="hidden lg:flex items-center space-x-9 text-[11.5px] font-medium tracking-[0.18em] uppercase text-white/70">
            <a
              href="#craft"
              onClick={() => onSelectStep && onSelectStep(0)}
              className="hover:text-white transition-all flex items-center space-x-1.5 py-2 relative group"
            >
              <span className="group-hover:tracking-[0.22em] transition-all">The Craft</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-[#DF9E51] border border-white/[0.08]">
                01-03
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#DF9E51] group-hover:w-full transition-all duration-300" />
            </a>

            <a
              href="#find-your-cup"
              className="hover:text-white transition-all flex items-center space-x-1.5 py-2 relative group"
            >
              <Sparkles className="w-3 h-3 text-[#DF9E51]" />
              <span className="group-hover:tracking-[0.22em] transition-all">Palate Matcher</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#DF9E51] group-hover:w-full transition-all duration-300" />
            </a>

            <a
              href="#menu"
              className="hover:text-white transition-all py-2 relative group"
            >
              <span className="group-hover:tracking-[0.22em] transition-all">Roastery Lots</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#DF9E51] group-hover:w-full transition-all duration-300" />
            </a>

            <a
              href="#cafes"
              className="hover:text-white transition-all flex items-center space-x-1.5 py-2 relative group"
            >
              <Store className="w-3.5 h-3.5 text-white/50 group-hover:text-[#DF9E51] transition-colors" />
              <span className="group-hover:tracking-[0.22em] transition-all">Flagships</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#DF9E51] group-hover:w-full transition-all duration-300" />
            </a>

            <a
              href="#journal"
              className="hover:text-white transition-all flex items-center space-x-1.5 py-2 relative group"
            >
              <BookOpen className="w-3.5 h-3.5 text-white/50 group-hover:text-[#DF9E51] transition-colors" />
              <span className="group-hover:tracking-[0.22em] transition-all">Editorial</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#DF9E51] group-hover:w-full transition-all duration-300" />
            </a>
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center space-x-3.5">
            {/* CMS Restricted Access Pill */}
            <button
              onClick={onOpenCMS}
              className="hidden md:inline-flex items-center space-x-1.5 text-[11px] font-mono tracking-[0.16em] uppercase text-white/70 hover:text-[#DF9E51] bg-white/[0.04] hover:bg-white/[0.08] px-3.5 py-2 rounded-full border border-white/[0.08] hover:border-[#DF9E51]/40 transition-all shadow-sm"
            >
              <Lock className="w-3 h-3 text-[#DF9E51]" />
              <span>CMS</span>
            </button>

            {/* Find Your Cup CTA (Porsche-inspired aerodynamic pill) */}
            <a
              href="#find-your-cup"
              className="hidden sm:inline-flex items-center space-x-2 text-[11px] font-semibold text-white bg-gradient-to-r from-[#C85A2B] to-[#B34D21] hover:from-[#D96B3A] hover:to-[#C85A2B] px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(200,90,43,0.3)] hover:shadow-[0_0_25px_rgba(200,90,43,0.5)] transition-all uppercase tracking-[0.18em] border border-white/10"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFE6C2]" />
              <span>Curate Ritual</span>
            </a>

            {/* Shopping Cart Trigger */}
            <button
              onClick={onOpenCart}
              aria-label="Open Shopping Bag"
              className="relative p-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-[#DF9E51]/60 text-white transition-all shadow-inner group"
            >
              <ShoppingBag className="w-4 h-4 text-white/90 group-hover:text-[#DF9E51] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C85A2B] text-white text-[10px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg border border-[#0C0A09]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Navigation Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-white/80 hover:text-white bg-white/[0.05] border border-white/[0.08]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Flyout Menu — Smoked Glass Architecture */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#100D0C]/98 backdrop-blur-2xl border-b border-white/[0.1] px-6 py-6 space-y-4 animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-3 font-medium text-xs tracking-[0.18em] uppercase text-white/80">
              <a
                href="#craft"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/[0.06] flex justify-between items-center hover:text-white"
              >
                <span>The Craft (Extraction Lab)</span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.08] text-[#DF9E51]">
                  01-03
                </span>
              </a>

              <a
                href="#find-your-cup"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/[0.06] flex items-center justify-between text-[#DF9E51] hover:text-white"
              >
                <span className="flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Palate Matcher</span>
                </span>
                <span className="text-[9px] font-mono uppercase text-white/40">Interactive</span>
              </a>

              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/[0.06] hover:text-white"
              >
                Roastery Menu & Rare Lots
              </a>

              <a
                href="#cafes"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/[0.06] hover:text-white flex items-center space-x-2"
              >
                <Store className="w-3.5 h-3.5 text-[#DF9E51]" />
                <span>Global Cafés Directory</span>
              </a>

              <a
                href="#journal"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/[0.06] hover:text-white flex items-center space-x-2"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#DF9E51]" />
                <span>Journal & Harvest Notes</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCMS();
                }}
                className="w-full text-left py-2 text-[#DF9E51] flex items-center justify-between font-mono text-[11px] pt-3"
              >
                <span className="flex items-center space-x-2">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Access CMS Console (Sign-In)</span>
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-[#DF9E51]/10 border border-[#DF9E51]/30">
                  Staff Only
                </span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
