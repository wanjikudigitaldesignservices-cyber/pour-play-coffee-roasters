"use client";

import React from "react";

interface BrandLogoProps {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  withTagline?: boolean;
}

export default function BrandLogo({
  variant = "light",
  size = "md",
  withTagline = true,
}: BrandLogoProps) {
  const isDark = variant === "dark";

  // Sizing definitions
  const dimensions = {
    sm: { icon: 30, text: "text-sm", sub: "text-[7.5px]", spacing: "space-x-2.5" },
    md: { icon: 38, text: "text-base md:text-lg", sub: "text-[8.5px] md:text-[9px]", spacing: "space-x-3" },
    lg: { icon: 48, text: "text-xl md:text-2xl", sub: "text-[10px]", spacing: "space-x-3.5" },
  }[size];

  return (
    <div className={`flex items-center ${dimensions.spacing} group select-none`}>
      {/* Precision Geometric Insignia — Minimalist Luxury Atelier Emblem */}
      <div className="relative flex items-center justify-center">
        <svg
          width={dimensions.icon}
          height={dimensions.icon}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-500 group-hover:scale-105"
        >
          {/* Subtle Outer Chrono/Burr Precision Ring */}
          <circle
            cx="22"
            cy="22"
            r="20.5"
            stroke="url(#goldGradient)"
            strokeWidth="1.2"
            className="opacity-70 group-hover:opacity-100 transition-opacity"
          />
          {/* Micro Precision Tick Marks at 12, 3, 6, 9 */}
          <line x1="22" y1="1.5" x2="22" y2="3.5" stroke="#DF9E51" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="22" y1="40.5" x2="22" y2="42.5" stroke="#DF9E51" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="1.5" y1="22" x2="3.5" y2="22" stroke="#DF9E51" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="40.5" y1="22" x2="42.5" y2="22" stroke="#DF9E51" strokeWidth="1.5" strokeLinecap="round" />

          {/* Inner Geometric Shield / Diamond Aura */}
          <circle
            cx="22"
            cy="22"
            r="16.5"
            stroke="#DF9E51"
            strokeWidth="0.6"
            strokeDasharray="2 3"
            className="opacity-40"
          />

          {/* Stylized Interlocking Monogram / Precision Pour Droplet Core */}
          <path
            d="M22 9C22 9 14 19 14 24.5C14 28.9 17.6 32.5 22 32.5C26.4 32.5 30 28.9 30 24.5C30 19 22 9 22 9Z"
            fill="url(#terracottaGoldGradient)"
            className="opacity-95"
          />

          {/* Golden S-Curve Center Meridian representing Coffee Bean Crema & Flow */}
          <path
            d="M22 13C20.5 17 23.5 21 22 25C21 27.5 22 29.5 22 30.5"
            stroke="#FFF2DC"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Precision Center Core Pearl */}
          <circle cx="22" cy="22" r="1.5" fill="#FFF2DC" />

          {/* Gradients */}
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F5D089" />
              <stop offset="50%" stopColor="#DF9E51" />
              <stop offset="100%" stopColor="#A86E2A" />
            </linearGradient>
            <linearGradient id="terracottaGoldGradient" x1="14" y1="9" x2="30" y2="33" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#DF9E51" />
              <stop offset="45%" stopColor="#C85A2B" />
              <stop offset="100%" stopColor="#1C1817" />
            </linearGradient>
          </defs>
        </svg>

        {/* Ambient Backlight Glow on hover */}
        <div className="absolute inset-0 rounded-full bg-[#DF9E51]/15 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Haute Typographic Wordmark */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center space-x-2">
          <span
            className={`font-sans font-semibold tracking-[0.22em] uppercase transition-colors ${
              dimensions.text
            } ${
              isDark
                ? "text-[#1C1817] group-hover:text-[#C85A2B]"
                : "text-white group-hover:text-[#F3CE86]"
            }`}
          >
            POUR
          </span>
          <span className="text-[#DF9E51] font-light text-sm opacity-70">/</span>
          <span
            className={`font-sans font-semibold tracking-[0.22em] uppercase transition-colors ${
              dimensions.text
            } ${
              isDark
                ? "text-[#1C1817] group-hover:text-[#C85A2B]"
                : "text-white group-hover:text-[#F3CE86]"
            }`}
          >
            PLAY
          </span>
        </div>

        {withTagline && (
          <div className="flex items-center space-x-1.5 mt-0.5">
            <span
              className={`font-mono uppercase tracking-[0.28em] font-medium ${
                dimensions.sub
              } ${isDark ? "text-[#877970]" : "text-[#D6C7B7]/75"}`}
            >
              HAUTE ROASTERY
            </span>
            <span className="w-1 h-1 rounded-full bg-[#DF9E51] opacity-70 inline-block" />
            <span
              className={`font-mono uppercase tracking-[0.24em] ${
                dimensions.sub
              } ${isDark ? "text-[#A8988D]" : "text-[#D6C7B7]/50"}`}
            >
              EST. 2026
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
