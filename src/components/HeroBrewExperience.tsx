"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Thermometer,
  Layers,
  Gauge,
  Flame,
  Coffee,
  Check,
  ShoppingBag
} from "lucide-react";
import { CoffeeProduct } from "@/types";

interface HeroBrewExperienceProps {
  onAddToCart: (product: CoffeeProduct, grind?: string) => void;
  products: CoffeeProduct[];
  activeStep?: number;
  onStepChange?: (step: number) => void;
}

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
  const [explodedView, setExplodedView] = useState(false);
  const [grindSetting, setGrindSetting] = useState<"fine" | "medium-fine" | "medium" | "medium-coarse" | "coarse">("medium");
  const [isPouring, setIsPouring] = useState(false);
  const [pourProgress, setPourProgress] = useState(65);
  const [waterTemp, setWaterTemp] = useState(93.5);

  // Find your cup state
  const [selectedOrigin, setSelectedOrigin] = useState("Ethiopia");
  const [selectedRoast, setSelectedRoast] = useState("Light");
  const [selectedFlavor, setSelectedFlavor] = useState("Floral & Bergamot");
  const [selectedBrew, setSelectedBrew] = useState("V60 Pour Over");

  // Matched bean
  const matchedProduct =
    products.find(
      (p) =>
        p.roast_level === selectedRoast ||
        p.origin?.toLowerCase().includes(selectedOrigin.toLowerCase())
    ) || products[0];

  // Auto progression pause when hovering
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setStep((activeStep + 1) % 4);
    }, 9000);
    return () => clearInterval(timer);
  }, [activeStep, isPaused]);

  // Pour simulation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPouring) {
      interval = setInterval(() => {
        setPourProgress((prev) => {
          if (prev >= 100) {
            setIsPouring(false);
            return 100;
          }
          return prev + 5;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isPouring]);

  const grindSettingsConfig = {
    fine: { name: "Espresso", microns: "210µm", clicks: "10-12", notes: "Thick golden crema, concentrated body" },
    "medium-fine": { name: "AeroPress", microns: "420µm", clicks: "16-18", notes: "Rich extraction, bright fruit clarity" },
    medium: { name: "V60 / Pour Over", microns: "680µm", clicks: "22-26", notes: "Crystalline acidity, delicate floral aromatics" },
    "medium-coarse": { name: "Chemex", microns: "890µm", clicks: "28-32", notes: "Clean tea-like body, sparkling sweetness" },
    coarse: { name: "Cold Brew", microns: "1150µm", clicks: "36-40", notes: "Zero bitterness, chocolate & molasses finish" },
  };

  return (
    <section
      id="craft"
      className="relative min-h-[840px] md:min-h-[880px] bg-[#161211] flex flex-col justify-between overflow-hidden border-b border-[#E7DFD3] select-none text-[#1C1817]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Empty Coffee Shop Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none transition-transform duration-1000 scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=2400&q=85')",
        }}
      />
      {/* Warm Ambient Tint & Blur to give tactile atmospheric depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F7F3EC]/92 via-[#F7F3EC]/84 to-[#F7F3EC]/94 backdrop-blur-[2px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_50%_40%,#EDE2D1_0%,transparent_70%)]" />

      {/* Floating Beans & Atmospheric Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-24 left-[12%] w-7 h-5 rounded-full bg-[#3B2820] opacity-30 rotate-45 animate-float-gentle" />
        <div className="absolute top-48 right-[15%] w-8 h-6 rounded-full bg-[#2A1D17] opacity-25 -rotate-12 animate-float-gentle delay-1000" />
        <div className="absolute bottom-32 left-[18%] w-6 h-4 rounded-full bg-[#4E352A] opacity-20 rotate-12 animate-float-gentle delay-700" />
      </div>

      {/* Audio Ambient Indicator */}
      <div className="container mx-auto px-6 pt-6 z-10 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#7D7068]">
          <span className="w-2 h-2 rounded-full bg-[#C85A2B] animate-ping" />
          <span>Multinational Extraction Lab · Phase 0{activeStep + 1} / 04</span>
        </div>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#EFE9DF] hover:bg-[#E5DDCF] text-[#4A423F] border border-[#DDD3C2] transition-colors"
          title="Toggle Ambient Sound"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#C85A2B]" />
              <span className="hidden sm:inline">Café Sound: On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden sm:inline">Café Sound: Muted</span>
            </>
          )}
        </button>
      </div>

      {/* ===================== SLIDE 1: GRIND ===================== */}
      {activeStep === 0 && (
        <div className="container mx-auto px-6 py-6 md:py-10 z-10 flex-1 flex flex-col justify-center animate-in fade-in duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EDE4D5] text-[#C85A2B] text-xs font-bold uppercase tracking-wider">
                <span>01 / STEP ONE</span>
                <span>•</span>
                <span>MICROMETRIC PHYSICS</span>
              </div>

              {/* Exact Video Typography */}
              <div className="relative">
                <span className="absolute -top-10 -left-6 text-7xl md:text-9xl font-black text-[#EDE4D5]/60 -z-10 select-none">
                  1
                </span>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#1C1817] uppercase font-sans">
                  GRIND
                </h1>
              </div>

              <p className="text-base md:text-lg text-[#5A514B] leading-relaxed max-w-md">
                Precision alignment begins before water touches coffee. Our 64mm
                diamond-like carbon (DLC) flat burrs guarantee a unimodal particle
                curve, minimizing astringent fines and unlocking pristine cup clarity.
              </p>

              {/* Interactive Burr Dial Controller */}
              <div className="bg-[#FFFFFF]/90 backdrop-blur-sm p-4 rounded-2xl border border-[#E4DACD] shadow-sm space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#1C1817] uppercase tracking-wider flex items-center space-x-1.5">
                    <Gauge className="w-4 h-4 text-[#C85A2B]" />
                    <span>Dial Setting:</span>
                    <span className="text-[#C85A2B]">{grindSettingsConfig[grindSetting].name}</span>
                  </span>
                  <span className="text-neutral-500 font-mono">
                    {grindSettingsConfig[grindSetting].microns} • Clicks: {grindSettingsConfig[grindSetting].clicks}
                  </span>
                </div>

                {/* Dial selector buttons */}
                <div className="grid grid-cols-5 gap-1.5">
                  {(["fine", "medium-fine", "medium", "medium-coarse", "coarse"] as const).map((key) => (
                    <button
                      key={key}
                      onClick={() => setGrindSetting(key)}
                      className={`text-[11px] font-semibold py-2 px-1 rounded-xl transition-all capitalize ${
                        grindSetting === key
                          ? "bg-[#1C1817] text-white shadow-md scale-105"
                          : "bg-[#F7F3EC] text-[#5A514B] hover:bg-[#EDE4D5]"
                      }`}
                    >
                      {key.split("-")[0]}
                    </button>
                  ))}
                </div>

                <div className="text-[11px] text-[#7A6E67] italic pt-1 border-t border-[#F2ECE3]">
                  {grindSettingsConfig[grindSetting].notes}
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
                  className="px-7 py-3.5 rounded-full bg-[#1C1817] text-white hover:bg-[#C85A2B] font-bold text-sm tracking-wider uppercase shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order Grinder · $380</span>
                </button>

                <button
                  onClick={() => setExplodedView(!explodedView)}
                  className={`px-5 py-3.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                    explodedView
                      ? "bg-[#C85A2B] text-white border-[#C85A2B]"
                      : "bg-[#EDE4D5] text-[#1C1817] border-[#DFD4C4] hover:bg-[#E5D9C8]"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{explodedView ? "Close Exploded View" : "Exploded 3D Burr View"}</span>
                </button>

                <button
                  onClick={() => setStep(1)}
                  className="p-3.5 rounded-full bg-white hover:bg-[#EDE4D5] border border-[#DDD3C2] text-[#1C1817] transition-all"
                  title="Next Step: Pour"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Visual - Grinder Simulation Mirroring Video */}
            <div className="lg:col-span-7 flex justify-center items-center relative min-h-[420px] md:min-h-[480px]">
              {/* Warm Terracotta Background Shape */}
              <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#D97742]/20 blur-3xl pointer-events-none" />
              <div className="absolute right-6 top-8 w-44 h-44 rounded-full bg-[#DF9E51]/25 blur-2xl pointer-events-none" />

              {/* Main Grinder Artifice */}
              <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
                {/* Background Giant Display Lettering as seen in video subframe 45 */}
                <div className="absolute font-black text-[120px] md:text-[180px] tracking-tighter text-[#EDE1D1] select-none font-display uppercase leading-none opacity-80 z-0">
                  GRIND
                </div>

                {/* Exploded / Assembled Visual Mockup */}
                <div
                  className={`relative z-10 transition-all duration-700 w-72 md:w-88 p-6 rounded-3xl bg-white/70 backdrop-blur-md border border-white/80 shadow-2xl flex flex-col items-center ${
                    explodedView ? "scale-105 rotate-1" : ""
                  }`}
                >
                  {/* Bean Hopper with Falling Coffee Beans */}
                  <div className="relative w-36 h-28 rounded-t-3xl bg-gradient-to-b from-[#221C1A]/20 to-[#3B2C27]/40 border-2 border-[#D6C8B8] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(#4A3728_2px,transparent_2px)] [background-size:12px_12px] opacity-70" />
                    {/* Falling beans animation */}
                    <div className="flex flex-col items-center space-y-1 z-10">
                      <div className="w-3.5 h-2.5 rounded-full bg-[#2C1D17] animate-bounce shadow" />
                      <div className="w-3 h-2 rounded-full bg-[#412B21] animate-pulse" />
                      <div className="w-4 h-2.5 rounded-full bg-[#1C120D]" />
                    </div>
                    <span className="absolute bottom-1 text-[9px] uppercase tracking-widest font-mono text-[#D4C3B2]">
                      Transparent Hopper
                    </span>
                  </div>

                  {/* Burr Mechanism Housing */}
                  <div
                    className={`w-48 py-4 my-1.5 rounded-xl bg-[#1C1817] text-white flex flex-col items-center justify-center border-2 border-[#3D3532] shadow-xl transition-all duration-500 ${
                      explodedView ? "my-6 border-[#C85A2B] scale-110 shadow-[#C85A2B]/20" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full border border-dashed border-[#DF9E51] flex items-center justify-center animate-spin">
                        <div className="w-2 h-2 rounded-full bg-[#DF9E51]" />
                      </div>
                      <span className="text-xs font-bold tracking-wider uppercase font-mono">
                        {explodedView ? "64mm Titanium DLC Burrs" : "Stepless Motor 800 RPM"}
                      </span>
                    </div>

                    {explodedView && (
                      <div className="mt-2 text-[10px] text-[#DF9E51] font-mono px-2 py-0.5 bg-white/10 rounded">
                        Micrometric Pitch: 0.01mm
                      </div>
                    )}
                  </div>

                  {/* Micrometric Adjustment Dial */}
                  <div className="w-40 py-2.5 px-4 rounded-full bg-[#EDE4D5] border border-[#DDD3C2] flex items-center justify-between text-xs font-bold text-[#1C1817]">
                    <span className="text-[10px] uppercase text-[#73655C]">Dial</span>
                    <span className="text-sm font-extrabold text-[#C85A2B] font-mono">
                      {grindSettingsConfig[grindSetting].clicks}
                    </span>
                    <span className="text-[10px] uppercase text-[#73655C]">Clicks</span>
                  </div>

                  {/* Falling Particle Cascade */}
                  <div className="h-14 w-12 flex flex-col items-center justify-center relative overflow-hidden my-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#523A2C] animate-ping" />
                    <div className="w-1 h-1 rounded-full bg-[#3B281E] my-0.5 animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2C1D17]" />
                  </div>

                  {/* Collector Cup */}
                  <div className="w-28 h-16 rounded-b-2xl bg-gradient-to-t from-[#1C1817] to-[#362E2B] text-white flex flex-col items-center justify-center border border-[#524641] shadow-lg">
                    <span className="text-[10px] font-bold text-[#EDE4D5] font-mono">
                      Precision Dose: 18.0g
                    </span>
                    <span className="text-[8px] text-neutral-400">Zero Retention Chute</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== SLIDE 2: POUR ===================== */}
      {activeStep === 1 && (
        <div className="container mx-auto px-6 py-6 md:py-10 z-10 flex-1 flex flex-col justify-center animate-in fade-in duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EDE4D5] text-[#C85A2B] text-xs font-bold uppercase tracking-wider">
                <span>02 / STEP TWO</span>
                <span>•</span>
                <span>THERMAL EXTRACTION</span>
              </div>

              {/* Exact Video Typography: Giant POUR with Steam */}
              <div className="relative">
                <span className="absolute -top-10 -left-6 text-7xl md:text-9xl font-black text-[#EDE4D5]/60 -z-10 select-none">
                  2
                </span>
                <h1 className="text-5xl md:text-8xl font-black tracking-tight text-[#1C1817] uppercase font-display">
                  POUR
                </h1>
              </div>

              <p className="text-base md:text-lg text-[#5A514B] leading-relaxed max-w-md">
                Water is the solvent of terroir. With our counter-balanced gooseneck
                kettle, control stream velocity to 4.5g/sec at an exact 93.5°C,
                blooming the bed and releasing volatile floral jasmine and stone fruit esters.
              </p>

              {/* Live Extraction Gauges */}
              <div className="grid grid-cols-3 gap-3 bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-[#E4DACD] shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-center space-x-1 text-[11px] font-bold text-neutral-500 uppercase">
                    <Thermometer className="w-3.5 h-3.5 text-[#C85A2B]" />
                    <span>Water Temp</span>
                  </div>
                  <div className="text-xl font-black text-[#1C1817] font-mono">
                    {waterTemp.toFixed(1)}°C
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold">PID Locked</div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-1 text-[11px] font-bold text-neutral-500 uppercase">
                    <Flame className="w-3.5 h-3.5 text-[#DF9E51]" />
                    <span>Pour Rate</span>
                  </div>
                  <div className="text-xl font-black text-[#1C1817] font-mono">
                    4.5 <span className="text-xs font-normal">g/s</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 font-semibold">Laminar Stream</div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-1 text-[11px] font-bold text-neutral-500 uppercase">
                    <Gauge className="w-3.5 h-3.5 text-[#1C1817]" />
                    <span>Extraction</span>
                  </div>
                  <div className="text-xl font-black text-[#C85A2B] font-mono">
                    {pourProgress}%
                  </div>
                  <div className="text-[10px] text-neutral-500 font-semibold">Yield: 300ml</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    setIsPouring(true);
                    setPourProgress(0);
                  }}
                  disabled={isPouring}
                  className="px-6 py-3.5 rounded-full bg-[#1C1817] text-white hover:bg-[#C85A2B] font-bold text-sm tracking-wider uppercase shadow-md transition-all flex items-center space-x-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{isPouring ? "Pouring Hot Water..." : "Simulate Pour"}</span>
                </button>

                <button
                  onClick={() =>
                    onAddToCart(
                      products.find((p) => p.name.includes("Kettle")) || products[0]
                    )
                  }
                  className="px-5 py-3.5 rounded-full bg-[#EDE4D5] text-[#1C1817] hover:bg-[#E5D9C8] text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Shop Kettle · $165
                </button>

                <button
                  onClick={() => setStep(2)}
                  className="p-3.5 rounded-full bg-white hover:bg-[#EDE4D5] border border-[#DDD3C2] text-[#1C1817] transition-all"
                  title="Next Step: Sip"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Visual - Exact Video Frame: Gooseneck kettle pouring into Glass V60 with rising steam */}
            <div className="lg:col-span-7 flex justify-center items-center relative min-h-[420px] md:min-h-[480px]">
              {/* Background Terracotta Atmosphere */}
              <div className="absolute w-80 h-80 rounded-full bg-[#D97742]/20 blur-3xl" />

              <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
                {/* Giant Display text behind like video */}
                <div className="absolute font-black text-[140px] md:text-[200px] tracking-tighter text-[#EDE1D1] select-none font-display uppercase leading-none opacity-80 z-0">
                  POUR
                </div>

                {/* Interactive Pour Apparatus Container */}
                <div className="relative z-10 w-80 md:w-96 p-8 rounded-3xl bg-white/75 backdrop-blur-md border border-white shadow-2xl flex flex-col items-center">
                  {/* Kettle Gooseneck Spout */}
                  <div className="relative w-full flex justify-end pr-4">
                    <div className="relative flex flex-col items-end">
                      <div className="text-[11px] font-mono text-[#C85A2B] bg-[#F7F3EC] px-2 py-0.5 rounded border border-[#E2D8C9] shadow-sm mb-1">
                        Gooseneck Spout · 93.5°C
                      </div>
                      {/* Kettle spout curved SVG */}
                      <svg
                        className="w-24 h-16 text-[#1C1817]"
                        viewBox="0 0 100 60"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeLinecap="round"
                      >
                        <path d="M 90 10 C 60 10, 40 30, 25 55" />
                      </svg>
                      {/* Water stream pouring down */}
                      <div className="relative w-1 h-24 bg-gradient-to-b from-sky-200 via-sky-300 to-amber-100 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)] -mr-6 animate-pulse" />
                    </div>
                  </div>

                  {/* Rising Steam Effect */}
                  <div className="relative w-28 h-12 flex justify-around items-end -mt-4 mb-2 pointer-events-none">
                    <div className="w-1.5 h-10 bg-gradient-to-t from-white/70 to-transparent rounded-full animate-steam-1" />
                    <div className="w-2 h-14 bg-gradient-to-t from-white/80 to-transparent rounded-full animate-steam-2" />
                    <div className="w-1.5 h-9 bg-gradient-to-t from-white/70 to-transparent rounded-full animate-steam-3" />
                  </div>

                  {/* Glass V60 Dripper with Ribs and Blooming Bed */}
                  <div className="relative w-44 h-28 flex flex-col items-center">
                    {/* Conical Fluted Dripper */}
                    <div className="w-40 h-24 border-t-[36px] border-t-amber-900/60 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-b-[8px] border-b-amber-900/90 rounded-b-xl relative shadow-lg overflow-hidden">
                      {/* Blooming coffee bed */}
                      <div className="absolute inset-x-2 top-0 h-4 bg-[#261A14] rounded-full flex items-center justify-center">
                        <span className="text-[8px] text-[#DF9E51] font-mono font-bold animate-pulse">
                          BLOOM 45s
                        </span>
                      </div>
                    </div>
                    {/* Glass stand ring */}
                    <div className="w-48 h-3 rounded-full bg-[#1C1817]/80 -mt-1 shadow" />
                  </div>

                  {/* Glass Server / Carafe Receiving Fresh Coffee */}
                  <div className="relative w-40 h-36 rounded-2xl bg-gradient-to-b from-white/20 to-white/40 border-2 border-white/80 shadow-inner flex flex-col justify-end p-2 mt-2">
                    {/* Extracted Coffee Level */}
                    <div
                      className="w-full rounded-xl bg-gradient-to-t from-[#2E1A11] via-[#48281B] to-[#733E29] transition-all duration-300 shadow-md relative overflow-hidden flex items-center justify-center"
                      style={{ height: `${Math.max(25, (pourProgress / 100) * 110)}px` }}
                    >
                      <div className="absolute top-0 inset-x-0 h-1 bg-[#D97742]/50 animate-pulse" />
                      <span className="text-[10px] text-[#F5EFE6] font-mono font-bold">
                        {Math.round((pourProgress / 100) * 300)} ml
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== SLIDE 3: SIP ===================== */}
      {activeStep === 2 && (
        <div className="container mx-auto px-6 py-6 md:py-10 z-10 flex-1 flex flex-col justify-center animate-in fade-in duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EDE4D5] text-[#C85A2B] text-xs font-bold uppercase tracking-wider">
                <span>03 / STEP THREE</span>
                <span>•</span>
                <span>THE SENSORY FINISH</span>
              </div>

              {/* Exact Video Typography: Giant Retro SIP */}
              <div className="relative">
                <span className="absolute -top-10 -left-6 text-7xl md:text-9xl font-black text-[#EDE4D5]/60 -z-10 select-none">
                  3
                </span>
                <h1 className="text-5xl md:text-8xl font-black tracking-tight text-[#1C1817] uppercase font-display">
                  SIP
                </h1>
              </div>

              <p className="text-base md:text-lg text-[#5A514B] leading-relaxed max-w-md">
                Cooling to 60°C reveals the true architecture of the bean. First
                comes ethereal star jasmine, transitioning into sweet white peach,
                finishing with velvety bergamot tea notes.
              </p>

              {/* Tasting Notes Wheel Matrix */}
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-[#E4DACD] shadow-sm space-y-3">
                <span className="text-xs font-bold text-[#1C1817] uppercase tracking-wider">
                  Sensory Cupping Matrix · SCA 92.5
                </span>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span>Floral & Jasmine Intensity</span>
                      <span className="text-[#C85A2B] font-mono">9.6 / 10</span>
                    </div>
                    <div className="w-full bg-[#F2ECE3] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#C85A2B] h-full w-[96%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span>Sweetness & Honeyed Sugar</span>
                      <span className="text-[#DF9E51] font-mono">9.4 / 10</span>
                    </div>
                    <div className="w-full bg-[#F2ECE3] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#DF9E51] h-full w-[94%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span>Body Cleanliness & Silky Finish</span>
                      <span className="text-[#1C1817] font-mono">9.8 / 10</span>
                    </div>
                    <div className="w-full bg-[#F2ECE3] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#1C1817] h-full w-[98%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() =>
                    onAddToCart(
                      products.find((p) => p.slug.includes("yirgacheffe")) || products[0]
                    )
                  }
                  className="px-7 py-3.5 rounded-full bg-[#1C1817] text-white hover:bg-[#C85A2B] font-bold text-sm tracking-wider uppercase shadow-md transition-all flex items-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Taste Yirgacheffe G1 · $24.50</span>
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-3.5 rounded-full bg-[#EDE4D5] text-[#1C1817] hover:bg-[#E5D9C8] text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C85A2B]" />
                  <span>Find Your Cup</span>
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="p-3.5 rounded-full bg-white hover:bg-[#EDE4D5] border border-[#DDD3C2] text-[#1C1817] transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Visual - Exact Video Frame: Ceramic Mug with Rich Coffee Swirl & Splashes */}
            <div className="lg:col-span-7 flex justify-center items-center relative min-h-[420px] md:min-h-[480px]">
              <div className="absolute w-88 h-88 rounded-full bg-[#DF9E51]/20 blur-3xl" />

              <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
                <div className="absolute font-black text-[150px] md:text-[220px] tracking-tighter text-[#EDE1D1] select-none font-display uppercase leading-none opacity-80 z-0">
                  SIP
                </div>

                <div className="relative z-10 w-80 md:w-96 p-8 rounded-3xl bg-white/75 backdrop-blur-md border border-white shadow-2xl flex flex-col items-center">
                  {/* Floating Coffee Droplets as seen in video frame 7 */}
                  <div className="absolute -top-6 left-12 w-4 h-4 rounded-full bg-[#C85A2B] animate-ping" />
                  <div className="absolute -top-3 right-16 w-5 h-5 rounded-full bg-[#523223] shadow-md animate-bounce" />
                  <div className="absolute top-10 -right-4 w-3.5 h-3.5 rounded-full bg-[#DF9E51] shadow" />

                  {/* Ceramic Tasting Mug */}
                  <div className="relative w-48 h-40 flex items-center justify-center">
                    {/* Mug Handle */}
                    <div className="absolute -right-6 top-8 w-14 h-24 rounded-r-3xl border-8 border-[#E8DFCFA0] -z-10 shadow-md" />

                    {/* Mug Body */}
                    <div className="w-48 h-36 rounded-b-[60px] rounded-t-[16px] bg-gradient-to-b from-[#F9F6F0] to-[#E5DACB] border-4 border-[#FFFFFF] shadow-2xl overflow-hidden flex flex-col justify-start p-3 relative">
                      {/* Rich Coffee Surface with crema & ripples */}
                      <div className="w-full h-20 rounded-[40px] bg-gradient-to-r from-[#2B1B14] via-[#48281B] to-[#2B1B14] border-2 border-[#5C3928] shadow-inner relative flex items-center justify-center overflow-hidden">
                        {/* Crema swirl */}
                        <div className="w-20 h-10 rounded-full border border-dashed border-[#DF9E51]/60 animate-spin" />
                        <div className="absolute w-6 h-3 rounded-full bg-[#DF9E51]/40 blur-xs" />
                      </div>

                      <div className="mt-4 text-center">
                        <span className="text-[11px] font-bold text-[#695A51] uppercase tracking-wider font-mono">
                          Seto Stoneware · 300ml
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Aroma Tag Pills */}
                  <div className="flex flex-wrap gap-2 justify-center mt-6">
                    <span className="px-3 py-1 rounded-full bg-[#F5EFE6] text-[#C85A2B] font-bold text-[11px] border border-[#E7DFD3]">
                      ✦ White Peach
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#F5EFE6] text-[#695A51] font-bold text-[11px] border border-[#E7DFD3]">
                      ✦ Wildflower Honey
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#F5EFE6] text-[#DF9E51] font-bold text-[11px] border border-[#E7DFD3]">
                      ✦ Bergamot
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== SLIDE 4: FIND YOUR CUP (EXACT SUBFRAME 245) ===================== */}
      {activeStep === 3 && (
        <div
          id="find-your-cup"
          className="container mx-auto px-6 py-6 md:py-8 z-10 flex-1 flex flex-col justify-center animate-in fade-in duration-700"
        >
          {/* Headline - Exact Video Typography "FIND YOUR CUP" */}
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EDE4D5] text-[#C85A2B] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CUSTOM PALATE MATCHER</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-[#1C1817] font-display uppercase tracking-tight">
              FIND YOUR CUP
            </h1>
            <p className="text-sm md:text-base text-[#695A51]">
              Select your origin preference, roast profile, and preferred extraction.
              We calibrate our multinational roastery lots to your morning ritual.
            </p>
          </div>

          {/* 4 Interactive Floating Selector Cards - EXACT SUBFRAME 245 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto w-full mb-6">
            {/* 1. ORIGIN CARD */}
            <div className="bg-white/85 backdrop-blur-md p-4 rounded-2xl border border-[#E4DACD] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-[#7D7068] uppercase tracking-widest block mb-2">
                  01 / ORIGIN
                </span>
                <div className="text-sm font-bold text-[#1C1817] mb-2">{selectedOrigin}</div>
              </div>
              <div className="flex flex-wrap gap-1">
                {["Ethiopia", "Colombia", "Panama", "Kenya"].map((orig) => (
                  <button
                    key={orig}
                    onClick={() => setSelectedOrigin(orig)}
                    className={`text-[10px] font-semibold px-2 py-1 rounded-lg transition-colors ${
                      selectedOrigin === orig
                        ? "bg-[#1C1817] text-white"
                        : "bg-[#F7F3EC] text-[#5A514B] hover:bg-[#EDE4D5]"
                    }`}
                  >
                    {orig}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. ROAST CARD */}
            <div className="bg-white/85 backdrop-blur-md p-4 rounded-2xl border border-[#E4DACD] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-[#7D7068] uppercase tracking-widest block mb-2">
                  02 / ROAST
                </span>
                <div className="text-sm font-bold text-[#1C1817] mb-2">{selectedRoast}</div>
              </div>
              <div className="flex flex-wrap gap-1">
                {["Light", "Medium-Light", "Medium", "Medium-Dark"].map((roast) => (
                  <button
                    key={roast}
                    onClick={() => setSelectedRoast(roast)}
                    className={`text-[10px] font-semibold px-2 py-1 rounded-lg transition-colors ${
                      selectedRoast === roast
                        ? "bg-[#C85A2B] text-white"
                        : "bg-[#F7F3EC] text-[#5A514B] hover:bg-[#EDE4D5]"
                    }`}
                  >
                    {roast}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. FLAVOR CARD */}
            <div className="bg-white/85 backdrop-blur-md p-4 rounded-2xl border border-[#E4DACD] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-[#7D7068] uppercase tracking-widest block mb-2">
                  03 / FLAVOR NOTE
                </span>
                <div className="text-sm font-bold text-[#1C1817] mb-2 truncate">
                  {selectedFlavor}
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {[
                  "Floral & Bergamot",
                  "Blood Orange & Guava",
                  "Smoked Cacao & Nut",
                ].map((flv) => (
                  <button
                    key={flv}
                    onClick={() => setSelectedFlavor(flv)}
                    className={`text-[9px] font-semibold px-2 py-1 rounded-lg transition-colors ${
                      selectedFlavor === flv
                        ? "bg-[#DF9E51] text-[#1C1817] font-bold"
                        : "bg-[#F7F3EC] text-[#5A514B] hover:bg-[#EDE4D5]"
                    }`}
                  >
                    {flv.split("&")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. BREW CARD */}
            <div className="bg-white/85 backdrop-blur-md p-4 rounded-2xl border border-[#E4DACD] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-[#7D7068] uppercase tracking-widest block mb-2">
                  04 / BREW STYLE
                </span>
                <div className="text-sm font-bold text-[#1C1817] mb-2">{selectedBrew}</div>
              </div>
              <div className="flex flex-wrap gap-1">
                {["V60 Pour Over", "Espresso", "AeroPress", "Cold Brew"].map((brew) => (
                  <button
                    key={brew}
                    onClick={() => setSelectedBrew(brew)}
                    className={`text-[10px] font-semibold px-2 py-1 rounded-lg transition-colors ${
                      selectedBrew === brew
                        ? "bg-[#1C1817] text-white"
                        : "bg-[#F7F3EC] text-[#5A514B] hover:bg-[#EDE4D5]"
                    }`}
                  >
                    {brew.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Matched Recommendation Banner */}
          {matchedProduct && (
            <div className="max-w-4xl mx-auto w-full bg-[#FFFFFF] rounded-2xl border-2 border-[#C85A2B]/40 p-4 md:p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <img
                  src={matchedProduct.image_url}
                  alt={matchedProduct.name}
                  className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl shadow-md border border-[#E7DFD3]"
                />
                <div className="space-y-1">
                  <div className="inline-block text-[10px] font-bold uppercase bg-[#EDE4D5] text-[#C85A2B] px-2 py-0.5 rounded">
                    ★ 99% Palate Match
                  </div>
                  <h3 className="text-base md:text-xl font-bold text-[#1C1817]">
                    {matchedProduct.name}
                  </h3>
                  <p className="text-xs text-[#70645D]">
                    {matchedProduct.origin} • {matchedProduct.roast_level} Roast •{" "}
                    {matchedProduct.flavor_notes?.slice(0, 3).join(", ")}
                  </p>
                  <div className="text-sm font-extrabold text-[#C85A2B]">
                    ${matchedProduct.price.toFixed(2)}{" "}
                    <span className="text-xs text-neutral-400 font-normal">/ 250g Whole Bean</span>
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
      <div className="container mx-auto px-6 py-5 z-10 border-t border-[#E7DFD3] flex items-center justify-between">
        {/* Step Name Tabs */}
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
                  ? "bg-[#1C1817] text-white shadow-sm"
                  : "text-[#7A6F68] hover:text-[#1C1817] hover:bg-[#EAE1D2]"
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Carousel Dots & Arrows */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setStep((activeStep - 1 + 4) % 4)}
            className="p-2 rounded-full hover:bg-[#EAE1D2] text-[#4A423F] transition-colors"
            aria-label="Previous Step"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots as seen in video carousel */}
          <div className="flex items-center space-x-2">
            {[0, 1, 2, 3].map((dot) => (
              <button
                key={dot}
                onClick={() => setStep(dot)}
                className={`transition-all duration-300 rounded-full ${
                  activeStep === dot
                    ? "w-7 h-2 bg-[#C85A2B]"
                    : "w-2 h-2 bg-[#D1C6B7] hover:bg-[#A89C8D]"
                }`}
                aria-label={`Go to slide ${dot + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setStep((activeStep + 1) % 4)}
            className="p-2 rounded-full hover:bg-[#EAE1D2] text-[#4A423F] transition-colors"
            aria-label="Next Step"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
