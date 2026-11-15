"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  ShoppingBag,
  Coffee,
} from "lucide-react";
import { CoffeeProduct } from "@/types";

interface HeroBrewExperienceProps {
  onAddToCart: (product: CoffeeProduct, grind?: string) => void;
  products: CoffeeProduct[];
  activeStep?: number;
  onStepChange?: (step: number) => void;
}

/* ── Beautiful Unsplash coffee images for each step ── */
const STEP_IMAGES = {
  grind: [
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
  ],
  pour: [
    "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?auto=format&fit=crop&w=800&q=80",
  ],
  sip: [
    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80",
  ],
  find: [
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80",
  ],
};

export default function HeroBrewExperience({
  onAddToCart,
  products,
  activeStep: externalActiveStep,
  onStepChange,
}: HeroBrewExperienceProps) {
  const [internalStep, setInternalStep] = useState(0);
  const activeStep =
    externalActiveStep !== undefined ? externalActiveStep : internalStep;

  const setStep = (s: number) => {
    setInternalStep(s);
    if (onStepChange) onStepChange(s);
  };

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Find your cup state
  const [selectedOrigin, setSelectedOrigin] = useState("Ethiopia");
  const [selectedRoast, setSelectedRoast] = useState("Light");
  const [selectedFlavor, setSelectedFlavor] = useState("Floral & Bergamot");
  const [selectedBrew, setSelectedBrew] = useState("V60 Pour Over");

  const matchedProduct =
    products.find(
      (p) =>
        p.roast_level === selectedRoast ||
        p.origin?.toLowerCase().includes(selectedOrigin.toLowerCase())
    ) || products[0];

  // Auto advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setStep((activeStep + 1) % 4);
    }, 9000);
    return () => clearInterval(timer);
  }, [activeStep, isPaused]);

  const grindSettings: Record<string, { name: string; microns: string; clicks: string }> = {
    fine: { name: "Espresso", microns: "210µm", clicks: "10-12" },
    "medium-fine": { name: "AeroPress", microns: "420µm", clicks: "16-18" },
    medium: { name: "V60 / Pour Over", microns: "680µm", clicks: "22-26" },
    "medium-coarse": { name: "Chemex", microns: "890µm", clicks: "28-32" },
    coarse: { name: "Cold Brew", microns: "1150µm", clicks: "36-40" },
  };
  const [grindSetting, setGrindSetting] = useState<string>("medium");

  return (
    <section
      id="craft"
      className="relative min-h-[840px] md:min-h-[880px] flex flex-col justify-between overflow-hidden border-b border-[#E7DFD3] select-none text-[#1C1817]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Full-bleed coffee shop background – no white overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[1200ms]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=2400&q=85')",
        }}
      />
      {/* Subtle warm tint – NOT white, keeps bg visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C1817]/50 via-[#1C1817]/30 to-[#1C1817]/60 pointer-events-none" />

      {/* Audio Ambient Indicator */}
      <div className="container mx-auto px-6 pt-6 z-10 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#E7DFD3]">
          <span className="w-2 h-2 rounded-full bg-[#C85A2B] animate-pulse" />
          <span>Multinational Extraction Lab · Phase 0{activeStep + 1} / 04</span>
        </div>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white/80 border border-white/20 transition-colors"
          title="Toggle Ambient Sound"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#C85A2B]" />
              <span className="hidden sm:inline">Café Sound: On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-white/60" />
              <span className="hidden sm:inline">Café Sound: Muted</span>
            </>
          )}
        </button>
      </div>

      {/* ===================== SLIDE 1: GRIND ===================== */}
      {activeStep === 0 && (
        <div className="container mx-auto px-6 py-6 md:py-10 z-10 flex-1 flex flex-col justify-center animate-fadeSlideUp">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-[#DF9E51] text-xs font-bold uppercase tracking-wider border border-white/10">
                <span>01 / STEP ONE</span>
                <span>•</span>
                <span>MICROMETRIC PHYSICS</span>
              </div>

              <div className="relative">
                <span className="absolute -top-10 -left-6 text-7xl md:text-9xl font-black text-white/10 -z-10 select-none">
                  1
                </span>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white uppercase font-sans">
                  GRIND
                </h1>
              </div>

              <p className="text-base md:text-lg text-[#E7DFD3]/90 leading-relaxed max-w-md">
                Precision alignment begins before water touches coffee. Our 64mm
                diamond-like carbon (DLC) flat burrs guarantee a unimodal particle
                curve, minimizing astringent fines and unlocking pristine cup clarity.
              </p>

              {/* Grind Setting Selector — transparent, no white card */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white uppercase tracking-wider">
                    ⚙ Dial Setting: <span className="text-[#DF9E51]">{grindSettings[grindSetting].name}</span>
                  </span>
                  <span className="text-white/60 font-mono text-[11px]">
                    {grindSettings[grindSetting].microns} • Clicks: {grindSettings[grindSetting].clicks}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {(["fine", "medium-fine", "medium", "medium-coarse", "coarse"] as const).map((key) => (
                    <button
                      key={key}
                      onClick={() => setGrindSetting(key)}
                      className={`text-[11px] font-semibold py-2 px-1 rounded-xl transition-all capitalize ${
                        grindSetting === key
                          ? "bg-[#C85A2B] text-white shadow-md"
                          : "bg-white/10 text-white/70 hover:bg-white/20"
                      }`}
                    >
                      {key.split("-")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() =>
                    onAddToCart(
                      products.find((p) => p.category === "gear") || products[0]
                    )
                  }
                  className="px-7 py-3.5 rounded-full bg-[#C85A2B] text-white hover:bg-[#B34D21] font-bold text-sm tracking-wider uppercase shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order Grinder · $380</span>
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="p-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
                  title="Next Step: Pour"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Visual — Real coffee images with simple animation */}
            <div className="lg:col-span-7 flex justify-center items-center relative min-h-[420px] md:min-h-[480px]">
              <div className="relative w-full max-w-lg flex items-center justify-center">
                {/* Main hero image */}
                <img
                  src={STEP_IMAGES.grind[0]}
                  alt="Freshly ground coffee beans"
                  className="w-72 md:w-80 h-72 md:h-80 object-cover rounded-3xl shadow-2xl animate-fadeSlideUp border-2 border-white/20"
                />
                {/* Secondary floating image */}
                <img
                  src={STEP_IMAGES.grind[1]}
                  alt="Latte art"
                  className="absolute -bottom-6 -right-4 md:right-2 w-40 h-40 object-cover rounded-2xl shadow-xl animate-floatSlow border-2 border-white/20"
                />
                {/* Decorative accent */}
                <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-[#C85A2B]/30 blur-2xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== SLIDE 2: POUR ===================== */}
      {activeStep === 1 && (
        <div className="container mx-auto px-6 py-6 md:py-10 z-10 flex-1 flex flex-col justify-center animate-fadeSlideUp">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-[#DF9E51] text-xs font-bold uppercase tracking-wider border border-white/10">
                <span>02 / STEP TWO</span>
                <span>•</span>
                <span>THERMAL EXTRACTION</span>
              </div>

              <div className="relative">
                <span className="absolute -top-10 -left-6 text-7xl md:text-9xl font-black text-white/10 -z-10 select-none">
                  2
                </span>
                <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white uppercase font-display">
                  POUR
                </h1>
              </div>

              <p className="text-base md:text-lg text-[#E7DFD3]/90 leading-relaxed max-w-md">
                Water is the solvent of terroir. With our counter-balanced gooseneck
                kettle, control stream velocity at an exact 93.5°C, blooming the bed
                and releasing volatile floral jasmine and stone fruit esters.
              </p>

              {/* Extraction Info — glass style */}
              <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
                <div className="space-y-1 text-center">
                  <div className="text-[11px] font-bold text-white/60 uppercase">Water Temp</div>
                  <div className="text-xl font-black text-white font-mono">93.5°C</div>
                  <div className="text-[10px] text-emerald-400 font-semibold">PID Locked</div>
                </div>
                <div className="space-y-1 text-center">
                  <div className="text-[11px] font-bold text-white/60 uppercase">Pour Rate</div>
                  <div className="text-xl font-black text-white font-mono">4.5 <span className="text-xs font-normal">g/s</span></div>
                  <div className="text-[10px] text-white/50 font-semibold">Laminar Stream</div>
                </div>
                <div className="space-y-1 text-center">
                  <div className="text-[11px] font-bold text-white/60 uppercase">Extraction</div>
                  <div className="text-xl font-black text-[#C85A2B] font-mono">65%</div>
                  <div className="text-[10px] text-white/50 font-semibold">Yield: 300ml</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() =>
                    onAddToCart(
                      products.find((p) => p.name.includes("Kettle")) || products[0]
                    )
                  }
                  className="px-7 py-3.5 rounded-full bg-[#C85A2B] text-white hover:bg-[#B34D21] font-bold text-sm tracking-wider uppercase shadow-lg transition-all flex items-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop Kettle · $165</span>
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="p-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Visual — Pour images */}
            <div className="lg:col-span-7 flex justify-center items-center relative min-h-[420px] md:min-h-[480px]">
              <div className="relative w-full max-w-lg flex items-center justify-center">
                <img
                  src={STEP_IMAGES.pour[0]}
                  alt="Pour over coffee brewing"
                  className="w-72 md:w-80 h-72 md:h-80 object-cover rounded-3xl shadow-2xl animate-fadeSlideUp border-2 border-white/20"
                />
                <img
                  src={STEP_IMAGES.pour[1]}
                  alt="Coffee pouring from kettle"
                  className="absolute -bottom-6 -left-4 md:left-2 w-40 h-40 object-cover rounded-2xl shadow-xl animate-floatSlow border-2 border-white/20"
                />
                <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-[#DF9E51]/20 blur-2xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== SLIDE 3: SIP ===================== */}
      {activeStep === 2 && (
        <div className="container mx-auto px-6 py-6 md:py-10 z-10 flex-1 flex flex-col justify-center animate-fadeSlideUp">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-[#DF9E51] text-xs font-bold uppercase tracking-wider border border-white/10">
                <span>03 / STEP THREE</span>
                <span>•</span>
                <span>THE SENSORY FINISH</span>
              </div>

              <div className="relative">
                <span className="absolute -top-10 -left-6 text-7xl md:text-9xl font-black text-white/10 -z-10 select-none">
                  3
                </span>
                <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white uppercase font-display">
                  SIP
                </h1>
              </div>

              <p className="text-base md:text-lg text-[#E7DFD3]/90 leading-relaxed max-w-md">
                Cooling to 60°C reveals the true architecture of the bean. First
                comes ethereal star jasmine, transitioning into sweet white peach,
                finishing with velvety bergamot tea notes.
              </p>

              {/* Tasting Notes — glass style */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Sensory Cupping Matrix · SCA 92.5
                </span>
                <div className="space-y-2 text-xs">
                  {[
                    { label: "Floral & Jasmine Intensity", score: "9.6", pct: "96%", color: "bg-[#C85A2B]" },
                    { label: "Sweetness & Honeyed Sugar", score: "9.4", pct: "94%", color: "bg-[#DF9E51]" },
                    { label: "Body Cleanliness & Silky Finish", score: "9.8", pct: "98%", color: "bg-white" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between font-semibold mb-1 text-white/80">
                        <span>{item.label}</span>
                        <span className="text-[#DF9E51] font-mono">{item.score} / 10</span>
                      </div>
                      <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                        <div className={`${item.color} h-full rounded-full transition-all duration-1000`} style={{ width: item.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() =>
                    onAddToCart(
                      products.find((p) => p.slug?.includes("yirgacheffe")) || products[0]
                    )
                  }
                  className="px-7 py-3.5 rounded-full bg-[#C85A2B] text-white hover:bg-[#B34D21] font-bold text-sm tracking-wider uppercase shadow-lg transition-all flex items-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Taste Yirgacheffe · $24.50</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 border border-white/20"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#DF9E51]" />
                  <span>Find Your Cup</span>
                </button>
              </div>
            </div>

            {/* Right Visual — Sip images */}
            <div className="lg:col-span-7 flex justify-center items-center relative min-h-[420px] md:min-h-[480px]">
              <div className="relative w-full max-w-lg flex items-center justify-center">
                <img
                  src={STEP_IMAGES.sip[0]}
                  alt="Hot coffee in a mug"
                  className="w-72 md:w-80 h-72 md:h-80 object-cover rounded-3xl shadow-2xl animate-fadeSlideUp border-2 border-white/20"
                />
                <img
                  src={STEP_IMAGES.sip[1]}
                  alt="Coffee tasting experience"
                  className="absolute -top-6 -right-4 md:right-2 w-40 h-40 object-cover rounded-2xl shadow-xl animate-floatSlow border-2 border-white/20"
                />
                {/* Aroma Tag Pills */}
                <div className="absolute bottom-4 left-0 right-0 flex flex-wrap gap-2 justify-center">
                  {["✦ White Peach", "✦ Wildflower Honey", "✦ Bergamot"].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white font-bold text-[11px] border border-white/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== SLIDE 4: FIND YOUR CUP ===================== */}
      {activeStep === 3 && (
        <div
          id="find-your-cup"
          className="container mx-auto px-6 py-6 md:py-8 z-10 flex-1 flex flex-col justify-center animate-fadeSlideUp"
        >
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-[#DF9E51] text-xs font-bold uppercase tracking-wider border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CUSTOM PALATE MATCHER</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white font-display uppercase tracking-tight">
              FIND YOUR CUP
            </h1>
            <p className="text-sm md:text-base text-[#E7DFD3]/80">
              Select your origin, roast profile, and preferred extraction.
              We calibrate our multinational roastery lots to your morning ritual.
            </p>
          </div>

          {/* Images across the top */}
          <div className="flex justify-center gap-4 mb-6">
            <img
              src={STEP_IMAGES.find[0]}
              alt="Coffee beans variety"
              className="w-32 h-32 md:w-44 md:h-44 object-cover rounded-2xl shadow-xl animate-fadeSlideUp border-2 border-white/20"
            />
            <img
              src={STEP_IMAGES.find[1]}
              alt="Coffee preparation"
              className="w-32 h-32 md:w-44 md:h-44 object-cover rounded-2xl shadow-xl animate-floatSlow border-2 border-white/20"
            />
          </div>

          {/* 4 Interactive Selector Cards — glass morphism */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto w-full mb-6">
            {/* 1. ORIGIN */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 hover:bg-white/15 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-white/50 uppercase tracking-widest block mb-2">01 / ORIGIN</span>
                <div className="text-sm font-bold text-white mb-2">{selectedOrigin}</div>
              </div>
              <div className="flex flex-wrap gap-1">
                {["Ethiopia", "Colombia", "Panama", "Kenya"].map((orig) => (
                  <button
                    key={orig}
                    onClick={() => setSelectedOrigin(orig)}
                    className={`text-[10px] font-semibold px-2 py-1 rounded-lg transition-colors ${
                      selectedOrigin === orig
                        ? "bg-white text-[#1C1817]"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    {orig}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. ROAST */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 hover:bg-white/15 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-white/50 uppercase tracking-widest block mb-2">02 / ROAST</span>
                <div className="text-sm font-bold text-white mb-2">{selectedRoast}</div>
              </div>
              <div className="flex flex-wrap gap-1">
                {["Light", "Medium-Light", "Medium", "Medium-Dark"].map((roast) => (
                  <button
                    key={roast}
                    onClick={() => setSelectedRoast(roast)}
                    className={`text-[10px] font-semibold px-2 py-1 rounded-lg transition-colors ${
                      selectedRoast === roast
                        ? "bg-[#C85A2B] text-white"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    {roast}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. FLAVOR */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 hover:bg-white/15 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-white/50 uppercase tracking-widest block mb-2">03 / FLAVOR NOTE</span>
                <div className="text-sm font-bold text-white mb-2 truncate">{selectedFlavor}</div>
              </div>
              <div className="flex flex-wrap gap-1">
                {["Floral & Bergamot", "Blood Orange & Guava", "Smoked Cacao & Nut"].map((flv) => (
                  <button
                    key={flv}
                    onClick={() => setSelectedFlavor(flv)}
                    className={`text-[9px] font-semibold px-2 py-1 rounded-lg transition-colors ${
                      selectedFlavor === flv
                        ? "bg-[#DF9E51] text-[#1C1817] font-bold"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    {flv.split("&")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. BREW */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 hover:bg-white/15 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-white/50 uppercase tracking-widest block mb-2">04 / BREW STYLE</span>
                <div className="text-sm font-bold text-white mb-2">{selectedBrew}</div>
              </div>
              <div className="flex flex-wrap gap-1">
                {["V60 Pour Over", "Espresso", "AeroPress", "Cold Brew"].map((brew) => (
                  <button
                    key={brew}
                    onClick={() => setSelectedBrew(brew)}
                    className={`text-[10px] font-semibold px-2 py-1 rounded-lg transition-colors ${
                      selectedBrew === brew
                        ? "bg-white text-[#1C1817]"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    {brew.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Matched Product */}
          {matchedProduct && (
            <div className="max-w-4xl mx-auto w-full bg-white/10 backdrop-blur-md rounded-2xl border-2 border-[#C85A2B]/40 p-4 md:p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <img
                  src={matchedProduct.image_url}
                  alt={matchedProduct.name}
                  className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl shadow-md border border-white/20"
                />
                <div className="space-y-1">
                  <div className="inline-block text-[10px] font-bold uppercase bg-[#C85A2B] text-white px-2 py-0.5 rounded">
                    ★ 99% Palate Match
                  </div>
                  <h3 className="text-base md:text-xl font-bold text-white">
                    {matchedProduct.name}
                  </h3>
                  <p className="text-xs text-white/60">
                    {matchedProduct.origin} • {matchedProduct.roast_level} Roast •{" "}
                    {matchedProduct.flavor_notes?.slice(0, 3).join(", ")}
                  </p>
                  <div className="text-sm font-extrabold text-[#DF9E51]">
                    ${matchedProduct.price.toFixed(2)}{" "}
                    <span className="text-xs text-white/40 font-normal">/ 250g Whole Bean</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto">
                <button
                  onClick={() => onAddToCart(matchedProduct, selectedBrew)}
                  className="w-full md:w-auto px-6 py-3.5 rounded-full bg-[#C85A2B] hover:bg-[#B34D21] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Bag</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================== BOTTOM CONTROLS & PAGINATION ===================== */}
      <div className="container mx-auto px-6 py-5 z-10 border-t border-white/15 flex items-center justify-between">
        <div className="flex items-center space-x-2 md:space-x-6 text-xs font-bold uppercase tracking-wider">
          {[
            { idx: 0, label: "1. GRIND" },
            { idx: 1, label: "2. POUR" },
            { idx: 2, label: "3. SIP" },
            { idx: 3, label: "FIND YOUR CUP" },
          ].map((item) => (
            <button
              key={item.idx}
              onClick={() => setStep(item.idx)}
              className={`transition-all py-1 px-2.5 rounded-lg flex items-center space-x-1.5 ${
                activeStep === item.idx
                  ? "bg-[#C85A2B] text-white shadow-sm"
                  : "text-white/50 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setStep((activeStep - 1 + 4) % 4)}
            className="p-2 rounded-full hover:bg-white/10 text-white/60 transition-colors"
            aria-label="Previous Step"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2">
            {[0, 1, 2, 3].map((dot) => (
              <button
                key={dot}
                onClick={() => setStep(dot)}
                className={`transition-all duration-300 rounded-full ${
                  activeStep === dot
                    ? "w-7 h-2 bg-[#C85A2B]"
                    : "w-2 h-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${dot + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setStep((activeStep + 1) % 4)}
            className="p-2 rounded-full hover:bg-white/10 text-white/60 transition-colors"
            aria-label="Next Step"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
