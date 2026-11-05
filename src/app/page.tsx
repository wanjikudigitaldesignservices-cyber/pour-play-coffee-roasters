"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroBrewExperience from "@/components/HeroBrewExperience";
import RoasteryMenu from "@/components/RoasteryMenu";
import GlobalCafesDirectory from "@/components/GlobalCafesDirectory";
import JournalSection from "@/components/JournalSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AdminCMSModal from "@/components/AdminCMSModal";
import { CoffeeProduct, CoffeeStore, CoffeeBlog, CartItem } from "@/types";
import {
  fetchProducts,
  fetchStores,
  fetchBlogs,
} from "@/lib/supabase";
import {
  INITIAL_PRODUCTS,
  INITIAL_STORES,
  INITIAL_BLOGS,
} from "@/lib/seed-data";

export default function HomePage() {
  const [products, setProducts] = useState<CoffeeProduct[]>(INITIAL_PRODUCTS);
  const [stores, setStores] = useState<CoffeeStore[]>(INITIAL_STORES);
  const [blogs, setBlogs] = useState<CoffeeBlog[]>(INITIAL_BLOGS);

  // App UI states
  const [cartOpen, setCartOpen] = useState(false);
  const [cmsOpen, setCmsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeBrewStep, setActiveBrewStep] = useState(0);
  const [currentRegion, setCurrentRegion] = useState("Tokyo Shibuya");

  // Load from Supabase on mount
  const refreshData = async () => {
    try {
      const [p, s, b] = await Promise.all([
        fetchProducts(),
        fetchStores(),
        fetchBlogs(),
      ]);
      if (p && p.length > 0) setProducts(p);
      if (s && s.length > 0) setStores(s);
      if (b && b.length > 0) setBlogs(b);
    } catch (err) {
      console.warn("Using offline seed data:", err);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Cart operations
  const handleAddToCart = (product: CoffeeProduct, grindOption?: string) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.grindOption === grindOption
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.grindOption === grindOption
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1, grindOption }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EC] text-[#1C1817] relative selection:bg-[#DF9E51] selection:text-[#161211]">
      {/* Empty Coffee Shop Background Across Homepage */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-25 filter contrast-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=2400&q=85')",
        }}
      />
      <div className="fixed inset-0 z-0 bg-[#F7F3EC]/80 backdrop-blur-[0.5px] pointer-events-none" />

      {/* 1. Global Navigation */}
      <div className="relative z-40">
        <Navbar
          cartCount={totalCartCount}
          onOpenCart={() => setCartOpen(true)}
          onOpenCMS={() => setCmsOpen(true)}
          onSelectStep={(idx) => {
            setActiveBrewStep(idx);
            const craftEl = document.getElementById("craft");
            if (craftEl) craftEl.scrollIntoView({ behavior: "smooth" });
          }}
          currentRegion={currentRegion}
          onRegionChange={(reg) => setCurrentRegion(reg)}
        />
      </div>

      {/* 2. Main Content */}
      <main className="flex-1 relative z-10">
        {/* Hero Interactive Brew Journey: 1. GRIND, 2. POUR, 3. SIP, FIND YOUR CUP (with Empty Coffee Shop Backdrop) */}
        <HeroBrewExperience
          onAddToCart={handleAddToCart}
          products={products}
          activeStep={activeBrewStep}
          onStepChange={(s) => setActiveBrewStep(s)}
        />

        {/* 3. Roastery Menu: Single Origins, Blends, Precision Gear (Grinders & Kettles) */}
        <RoasteryMenu
          products={products}
          onAddToCart={handleAddToCart}
        />

        {/* 4. Worldwide Flagship Cafés Directory (Tokyo, New York, London, Milan, Seoul, Nairobi, Dubai, Sydney) */}
        <GlobalCafesDirectory
          stores={stores}
          currentRegion={currentRegion}
          onSelectStoreRegion={(region) => setCurrentRegion(region)}
        />

        {/* 5. The Roaster's Journal & Science Editorial (Blogs & Community Discussion) */}
        <JournalSection blogs={blogs} />
      </main>

      {/* 6. Multinational Footer */}
      <div className="relative z-10">
        <Footer onOpenCMS={() => setCmsOpen(true)} />
      </div>

      {/* 7. Slide-Out Shopping Bag & Direct Supabase Checkout */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 8. Full-Featured CMS Admin Dashboard Modal */}
      <AdminCMSModal
        isOpen={cmsOpen}
        onClose={() => setCmsOpen(false)}
        onDataChange={refreshData}
      />
    </div>
  );
}
