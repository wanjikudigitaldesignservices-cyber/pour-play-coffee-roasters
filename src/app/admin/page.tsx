"use client";

import React, { useState } from "react";
import AdminCMSModal from "@/components/AdminCMSModal";
import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";
import { ArrowLeft, Lock, KeyRound, ShieldCheck } from "lucide-react";

export default function AdminPage() {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#0C0A09] text-white flex flex-col items-center justify-center p-6 text-center selection:bg-[#DF9E51] selection:text-[#0C0A09] relative overflow-hidden">
      {/* Subtle Atmospheric Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#241A15]/40 via-[#0C0A09] to-[#0C0A09] pointer-events-none" />

      <div className="max-w-md w-full space-y-6 relative z-10 bg-[#120F0E]/90 p-8 md:p-10 rounded-3xl border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        <div className="flex justify-center pb-2">
          <BrandLogo variant="light" size="lg" withTagline={true} />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-[#DF9E51]/30 text-[#DF9E51] text-[10px] font-mono uppercase tracking-[0.2em]">
            <Lock className="w-3 h-3" />
            <span>Restricted Backoffice</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white uppercase font-sans">
            Roastery Administration
          </h1>
          <p className="text-xs text-white/50 leading-relaxed font-sans">
            Centralized terminal for micro-lot inventory, extraction research, franchise territorial pipeline, and client orders.
          </p>
        </div>

        {/* Strict Security Badge */}
        <div className="bg-[#1A1513] border border-white/[0.08] rounded-2xl p-3.5 text-left text-xs text-white/70 space-y-1">
          <div className="flex items-center space-x-1.5 text-[#DF9E51] font-mono text-[10px] uppercase font-bold tracking-wider">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Strict Access Policy</span>
          </div>
          <p className="text-[11px] text-white/50">
            Public sign-up is permanently disabled. Authentication requires valid administrative credentials.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3 justify-center">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C85A2B] to-[#B34D21] hover:from-[#D96B3A] hover:to-[#C85A2B] text-white text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(200,90,43,0.3)] transition-all flex items-center justify-center space-x-2 border border-white/10"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Authenticate to CMS Console</span>
          </button>

          <Link
            href="/"
            className="w-full py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white/70 hover:text-white text-xs font-mono uppercase tracking-[0.16em] transition-all flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Flagship</span>
          </Link>
        </div>
      </div>

      <AdminCMSModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
