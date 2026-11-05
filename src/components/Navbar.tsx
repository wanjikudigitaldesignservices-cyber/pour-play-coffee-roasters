"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Globe,
  Sliders,
  Store,
  BookOpen,
  Sparkles,
  Menu as MenuIcon,
  X,
  ShieldCheck,
  ChevronDown
} from "lucide-react";

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
      {/* Global Multinational Header Ribbon */}
      <div className="bg-[#1C1817] text-[#EDE6DC] text-[11px] font-medium tracking-wider uppercase py-2 px-4 border-b border-[#2C2725] flex justify-between items-center transition-all">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D36A38] animate-pulse"></span>
            <span className="text-[#D36A38] font-bold">GLOBAL ROASTERY NETWORK</span>
            <span className="hidden md:inline text-neutral-400">|</span>
            <span className="hidden md:inline text-neutral-300">
              Direct Trade 2026 Geisha & Anaerobic Micro-Lots Now Pouring in 18 Global Metros
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Region / Flagship Selector */}
            <div className="relative">
              <button
                onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
                className="flex items-center space-x-1.5 hover:text-white transition-colors py-0.5 px-2 rounded hover:bg-white/10"
              >
                <Globe className="w-3.5 h-3.5 text-[#DF9E51]" />
                <span className="font-semibold">{selectedRegion.flag} {selectedRegion.name}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {regionDropdownOpen && (
                <div
                  className="absolute right-0 mt-1 w-52 bg-[#1C1817] border border-[#3A3330] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseLeave={() => setRegionDropdownOpen(false)}
                >
                  <div className="px-3 py-1 text-[10px] uppercase text-neutral-400 font-bold tracking-wider border-b border-[#2C2725]">
                    Select Global Café / Currency
                  </div>
                  {REGIONS.map((r) => (
                    <button
                      key={r.code}
                      onClick={() => {
                        onRegionChange(r.name);
                        setRegionDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#2C2725] transition-colors ${
                        r.name === currentRegion
                          ? "text-[#DF9E51] font-bold"
                          : "text-neutral-300"
                      }`}
                    >
                      <span className="flex items-center space-x-2">
                        <span>{r.flag}</span>
                        <span>{r.name}</span>
                      </span>
                      <span className="text-[10px] text-neutral-500">{r.currency}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={onOpenCMS}
              className="hidden sm:flex items-center space-x-1 text-[#DF9E51] hover:text-white transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CMS Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Header */}
      <header className="sticky top-0 z-40 bg-[#F7F3EC]/90 backdrop-blur-md border-b border-[#E7DFD3] transition-all">
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo - EXACT VIDEO STYLE: POUR / PLAY */}
          <a href="#" className="flex items-center space-x-2 group">
            <div className="flex items-baseline space-x-2">
              <span className="font-extrabold text-2xl md:text-3xl tracking-tight text-[#1C1817] group-hover:text-[#C85A2B] transition-colors font-sans">
                POUR
              </span>
              <span className="text-2xl md:text-3xl font-light text-[#C85A2B]">/</span>
              <span className="font-extrabold text-2xl md:text-3xl tracking-tight text-[#1C1817] group-hover:text-[#C85A2B] transition-colors font-sans">
                PLAY
              </span>
            </div>
            <span className="hidden lg:inline-block text-[10px] font-bold tracking-widest uppercase bg-[#EAE1D2] text-[#63554F] px-2 py-0.5 rounded-full ml-1">
              GLOBAL ROASTERY
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-[#4A423F]">
            <a
              href="#craft"
              onClick={() => onSelectStep && onSelectStep(0)}
              className="hover:text-[#1C1817] hover:font-semibold transition-colors flex items-center space-x-1"
            >
              <span>The Craft</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 bg-[#EDE6DC] text-[#C85A2B] rounded">
                1-2-3
              </span>
            </a>
            <a
              href="#find-your-cup"
              className="hover:text-[#1C1817] hover:font-semibold transition-colors flex items-center space-x-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C85A2B]" />
              <span>Find Your Cup</span>
            </a>
            <a
              href="#menu"
              className="hover:text-[#1C1817] hover:font-semibold transition-colors"
            >
              Roastery Menu
            </a>
            <a
              href="#cafes"
              className="hover:text-[#1C1817] hover:font-semibold transition-colors flex items-center space-x-1"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Cafés</span>
            </a>
            <a
              href="#journal"
              className="hover:text-[#1C1817] hover:font-semibold transition-colors flex items-center space-x-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Journal</span>
            </a>
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenCMS}
              className="hidden md:inline-flex items-center space-x-1.5 text-xs font-semibold text-[#1C1817] bg-[#EDE6DC] hover:bg-[#DFD4C4] px-3.5 py-2 rounded-full transition-all border border-[#DDD3C2]"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C85A2B]" />
              <span>CMS</span>
            </button>

            <a
              href="#find-your-cup"
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-bold text-white bg-[#1C1817] hover:bg-[#C85A2B] px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all uppercase tracking-wider"
            >
              <span>Find Your Cup</span>
            </a>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              aria-label="Open Cart"
              className="relative p-2.5 rounded-full bg-[#FFFFFF] border border-[#E2D8C9] hover:border-[#C85A2B] text-[#1C1817] shadow-sm hover:shadow transition-all group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C85A2B] text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#1C1817] hover:bg-[#EAE1D2]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F7F3EC] border-b border-[#E2D8C9] px-6 py-6 space-y-4 animate-in slide-in-from-top">
            <div className="flex flex-col space-y-3 font-medium text-base text-[#1C1817]">
              <a
                href="#craft"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-[#EAE1D2] flex justify-between items-center"
              >
                <span>The Craft (Grind / Pour / Sip)</span>
                <span className="text-xs font-bold px-2 py-0.5 bg-[#EDE6DC] text-[#C85A2B] rounded">
                  1-2-3
                </span>
              </a>
              <a
                href="#find-your-cup"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-[#EAE1D2] flex items-center space-x-2 text-[#C85A2B] font-semibold"
              >
                <Sparkles className="w-4 h-4" />
                <span>Find Your Cup (Matcher)</span>
              </a>
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-[#EAE1D2]"
              >
                Roastery Menu & Beans
              </a>
              <a
                href="#cafes"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-[#EAE1D2]"
              >
                Global Cafés & Directory
              </a>
              <a
                href="#journal"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-[#EAE1D2]"
              >
                Journal & Coffee Science
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCMS();
                }}
                className="w-full text-left py-2 font-bold text-[#C85A2B] flex items-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Open CMS Admin Dashboard</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
