"use client";

import React, { useState } from "react";
import { CoffeeStore } from "@/types";
import {
  MapPin,
  Clock,
  Phone,
  UserCheck,
  Compass,
  Store,
  ExternalLink
} from "lucide-react";

interface GlobalCafesDirectoryProps {
  stores: CoffeeStore[];
  currentRegion: string;
  onSelectStoreRegion: (regionName: string) => void;
}

export default function GlobalCafesDirectory({
  stores,
  currentRegion,
  onSelectStoreRegion,
}: GlobalCafesDirectoryProps) {
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>("All");

  const regions = [
    "All",
    "Asia-Pacific",
    "North America",
    "Europe",
    "Africa",
    "Middle East",
  ];

  const filteredStores =
    selectedRegionFilter === "All"
      ? stores
      : stores.filter((s) => s.region === selectedRegionFilter);

  return (
    <section id="cafes" className="py-20 md:py-28 bg-[#F4EDE3] border-b border-[#E2D6C5]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EAE0D1] text-[#C85A2B] text-xs font-bold uppercase tracking-wider">
              <Store className="w-3.5 h-3.5" />
              <span>MULTINATIONAL CAFÉ & ROASTERY NETWORK</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#1C1817] font-display uppercase tracking-tight">
              WORLDWIDE FLAGSHIPS
            </h2>
            <p className="text-sm md:text-base text-[#665B54]">
              Step into our immersive roasteries across 8 global capitals. Designed
              with Japanese-Scandinavian architectural principles and equipped with custom bars.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 mt-6 md:mt-0">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegionFilter(reg)}
                className={`text-xs font-bold px-4 py-2 rounded-full transition-all whitespace-nowrap uppercase tracking-wider ${
                  selectedRegionFilter === reg
                    ? "bg-[#1C1817] text-white shadow"
                    : "bg-[#EAE0D1] text-[#5A514B] hover:bg-[#DFD4C4]"
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className={`bg-white rounded-3xl border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                store.is_flagship ? "border-[#C85A2B]/40 ring-1 ring-[#C85A2B]/20" : "border-[#E4D7C7]"
              }`}
            >
              <div>
                {/* Store Photo */}
                <div className="relative aspect-16/10 bg-[#EAE0D1] overflow-hidden">
                  <img
                    src={store.image_url || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"}
                    alt={store.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {store.is_flagship && (
                    <span className="absolute top-3 left-3 bg-[#C85A2B] text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow">
                      Global Flagship
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    {store.city}, {store.country}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-[#1C1817] leading-snug">
                    {store.name}
                  </h3>

                  <div className="space-y-1.5 text-xs text-[#635750]">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-[#C85A2B] flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{store.address}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                      <span>{store.hours}</span>
                    </div>

                    {store.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                        <span>{store.phone}</span>
                      </div>
                    )}

                    {store.manager_name && (
                      <div className="flex items-center space-x-2 text-[11px] text-[#7A6E67]">
                        <UserCheck className="w-3.5 h-3.5 text-[#DF9E51] flex-shrink-0" />
                        <span>Head Barista: {store.manager_name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectStoreRegion(`${store.city} ${store.is_flagship ? "Flagship" : ""}`)}
                  className="w-full py-2.5 rounded-xl bg-[#F7F3EC] hover:bg-[#1C1817] text-[#1C1817] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-1.5 border border-[#E0D5C5]"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Set Active Flagship</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
