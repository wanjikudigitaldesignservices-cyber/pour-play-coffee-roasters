import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const displayFont = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  title: "POUR / PLAY — Global Specialty Coffee Roasters & Franchise",
  description:
    "An artisanal multinational coffee franchise and micro-roastery network across Tokyo, New York, London, Milan, Seoul, Nairobi, and Dubai. Precision brewing, direct trade micro-lots, and modern café ownership.",
  keywords: [
    "specialty coffee",
    "coffee franchise",
    "pour over",
    "flat burr grinder",
    "direct trade coffee",
    "global coffee franchise",
    "pour play",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${displayFont.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#F7F3EC] text-[#1C1817]">
        {children}
      </body>
    </html>
  );
}
