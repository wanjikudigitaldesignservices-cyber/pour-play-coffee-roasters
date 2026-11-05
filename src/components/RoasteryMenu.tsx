"use client";

import React, { useState } from "react";
import { CoffeeProduct } from "@/types";
import {
  ShoppingBag,
  Star,
  Sparkles,
  Coffee,
  Check,
  ChevronRight,
  X
} from "lucide-react";

interface RoasteryMenuProps {
  products: CoffeeProduct[];
  onAddToCart: (product: CoffeeProduct, grind?: string) => void;
}

export default function RoasteryMenu({
  products,
  onAddToCart,
}: RoasteryMenuProps) {
  const [activeCategory, setActiveCategory] = useState<
    "all" | "single_origin" | "blend" | "gear"
  >("all");

  const [selectedProduct, setSelectedProduct] = useState<CoffeeProduct | null>(
    null
  );
  const [selectedGrind, setSelectedGrind] = useState("Whole Bean");
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleAdd = (product: CoffeeProduct, grind?: string) => {
    onAddToCart(product, grind || selectedGrind);
    setAddedSlug(product.slug);
    setTimeout(() => setAddedSlug(null), 1800);
  };

  return (
    <section id="menu" className="py-20 md:py-28 bg-[#F7F3EC] border-b border-[#E7DFD3] relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EDE4D5] text-[#C85A2B] text-xs font-bold uppercase tracking-wider">
              <Coffee className="w-3.5 h-3.5" />
              <span>ROASTERY & APPARATUS CATALOG</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#1C1817] font-display uppercase tracking-tight">
              HARVEST & BAR GEAR
            </h2>
            <p className="text-sm md:text-base text-[#695A51]">
              Micro-lots roasted on closed-loop electric fluid beds and
              laboratory-grade brewing equipment shipped worldwide.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 mt-6 md:mt-0">
            {[
              { id: "all", label: "All Items" },
              { id: "single_origin", label: "Single Origins" },
              { id: "blend", label: "Signature Blends" },
              { id: "gear", label: "Precision Gear" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`text-xs font-bold px-4 py-2 rounded-full transition-all whitespace-nowrap uppercase tracking-wider ${
                  activeCategory === tab.id
                    ? "bg-[#1C1817] text-white shadow"
                    : "bg-[#EAE0D1] text-[#5A514B] hover:bg-[#DFD4C4]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-[#E4DACD] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Container with Badges */}
              <div
                onClick={() => setSelectedProduct(product)}
                className="relative aspect-4/3 overflow-hidden cursor-pointer bg-[#F4EDE3]"
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Roast Level or Gear Badge */}
                {product.roast_level && product.roast_level !== "N/A" ? (
                  <span className="absolute top-4 left-4 bg-[#1C1817]/85 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {product.roast_level} Roast
                  </span>
                ) : (
                  <span className="absolute top-4 left-4 bg-[#C85A2B] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Precision Gear
                  </span>
                )}

                {/* Direct Trade Tag */}
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#1C1817] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full shadow">
                  SCA {product.rating} ★
                </span>
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {product.origin && (
                    <div className="text-[11px] font-bold text-[#C85A2B] uppercase tracking-wider font-mono">
                      {product.origin} {product.altitude ? `• ${product.altitude}` : ""}
                    </div>
                  )}

                  <h3
                    onClick={() => setSelectedProduct(product)}
                    className="text-lg font-bold text-[#1C1817] group-hover:text-[#C85A2B] transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#6B5E57] line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Flavor Notes */}
                  {product.flavor_notes && product.flavor_notes.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {product.flavor_notes.slice(0, 3).map((note, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-[#F7F3EC] text-[#554A44] font-medium border border-[#E9DFD3]"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price and Cart Button */}
                <div className="pt-4 border-t border-[#F2ECE3] flex items-center justify-between">
                  <div>
                    <div className="text-xl font-black text-[#1C1817] font-mono">
                      ${product.price.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-neutral-400">
                      {product.category === "gear" ? "Unit Price" : "250g Nitrogen Flush"}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAdd(product)}
                    className={`px-4 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                      addedSlug === product.slug
                        ? "bg-emerald-600 text-white"
                        : "bg-[#1C1817] text-white hover:bg-[#C85A2B] shadow-sm hover:shadow"
                    }`}
                  >
                    {addedSlug === product.slug ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add To Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E7DFD3] relative animate-in zoom-in-95">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#1C1817] shadow"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto bg-[#F7F3EC]">
                <img
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#C85A2B] bg-[#F7F3EC] px-2.5 py-1 rounded">
                    {selectedProduct.category === "gear" ? "Precision Tool" : "Single Origin Micro-Lot"}
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-[#1C1817]">
                    {selectedProduct.name}
                  </h3>

                  <div className="text-2xl font-black text-[#1C1817] font-mono">
                    ${selectedProduct.price.toFixed(2)}
                  </div>

                  <p className="text-xs text-[#635750] leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {selectedProduct.category !== "gear" && (
                    <div className="space-y-2 pt-2">
                      <label className="block text-[11px] font-bold text-[#1C1817] uppercase tracking-wider">
                        Select Grind Calibration
                      </label>
                      <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                        {["Whole Bean", "V60 Filter", "Espresso", "AeroPress", "Cold Brew"].map((g) => (
                          <button
                            key={g}
                            onClick={() => setSelectedGrind(g)}
                            className={`py-1.5 px-2 rounded-lg font-semibold transition-colors ${
                              selectedGrind === g
                                ? "bg-[#1C1817] text-white"
                                : "bg-[#F7F3EC] text-[#554A44] hover:bg-[#EAE0D1]"
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#F0E6D8]">
                  <button
                    onClick={() => {
                      handleAdd(selectedProduct, selectedGrind);
                      setSelectedProduct(null);
                    }}
                    className="w-full py-3.5 rounded-full bg-[#1C1817] hover:bg-[#C85A2B] text-white font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add To Bag · ${selectedProduct.price.toFixed(2)}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
