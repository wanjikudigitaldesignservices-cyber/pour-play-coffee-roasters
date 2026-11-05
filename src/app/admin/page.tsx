"use client";

import React, { useState } from "react";
import AdminCMSModal from "@/components/AdminCMSModal";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function AdminPage() {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#F4EDE3] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-4">
        <div className="inline-flex p-4 rounded-3xl bg-[#1C1817] text-[#C85A2B] shadow-xl">
          <ShieldCheck className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-black text-[#1C1817] font-display uppercase">
          POUR / PLAY CMS CONTROL ROOM
        </h1>
        <p className="text-sm text-[#665B54]">
          Full administration over roastery lots, blogs, global franchise partner applications, and orders.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => setModalOpen(true)}
            className="px-6 py-3 rounded-full bg-[#1C1817] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#C85A2B] transition-colors"
          >
            Launch CMS Console
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-white border border-[#DDD3C2] text-[#1C1817] text-xs font-bold uppercase tracking-wider hover:bg-[#FAF7F2] transition-colors flex items-center justify-center space-x-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Site</span>
          </Link>
        </div>
      </div>

      <AdminCMSModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
