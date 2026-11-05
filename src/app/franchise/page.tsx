"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import MultinationalFranchiseHub from "@/components/MultinationalFranchiseHub";
import Footer from "@/components/Footer";
import AdminCMSModal from "@/components/AdminCMSModal";
import CartDrawer from "@/components/CartDrawer";

export default function FranchisePage() {
  const [cmsOpen, setCmsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [currentRegion, setCurrentRegion] = useState("Tokyo Shibuya");

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EC] text-[#1C1817]">
      <Navbar
        cartCount={0}
        onOpenCart={() => setCartOpen(true)}
        onOpenCMS={() => setCmsOpen(true)}
        currentRegion={currentRegion}
        onRegionChange={setCurrentRegion}
      />
      <main className="flex-1">
        <MultinationalFranchiseHub />
      </main>
      <Footer onOpenCMS={() => setCmsOpen(true)} />
      <AdminCMSModal isOpen={cmsOpen} onClose={() => setCmsOpen(false)} />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={[]}
        onUpdateQuantity={() => {}}
        onRemoveItem={() => {}}
        onClearCart={() => {}}
      />
    </div>
  );
}
