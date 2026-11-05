"use client";

import React, { useState } from "react";
import { CoffeeBlog } from "@/types";
import {
  BookOpen,
  Clock,
  ThumbsUp,
  Tag,
  Share2,
  X,
  MessageSquare,
  ArrowRight
} from "lucide-react";

interface JournalSectionProps {
  blogs: CoffeeBlog[];
}

export default function JournalSection({ blogs }: JournalSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeArticle, setActiveArticle] = useState<CoffeeBlog | null>(null);
  const [claps, setClaps] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string[]>>({});
  const [newComment, setNewComment] = useState("");

  const categories = [
    "All",
    "Brew Science",
    "Direct Trade",
    "Franchise Stories",
    "Roasting Mastery",
  ];

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === selectedCategory);

  const handleClap = (id: string, initialCount: number) => {
    setClaps((prev) => ({
      ...prev,
      [id]: (prev[id] || initialCount) + 1,
    }));
  };

  const handleAddComment = (id: string) => {
    if (!newComment.trim()) return;
    setComments((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), newComment.trim()],
    }));
    setNewComment("");
  };

  return (
    <section id="journal" className="py-20 md:py-28 bg-[#F7F3EC] border-b border-[#E7DFD3]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EDE4D5] text-[#C85A2B] text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>THE ROASTER'S JOURNAL & SCIENCE</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#1C1817] font-display uppercase tracking-tight">
              EDITORIAL & ARCHIVE
            </h2>
            <p className="text-sm md:text-base text-[#695A51]">
              Essays on water mineralogy, grind distribution, harvest diaries,
              and multinational franchise economics written by our master roasters.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold px-4 py-2 rounded-full transition-all whitespace-nowrap uppercase tracking-wider ${
                  selectedCategory === cat
                    ? "bg-[#1C1817] text-white shadow"
                    : "bg-[#EAE0D1] text-[#5A514B] hover:bg-[#DFD4C4]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured First Article + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Feature */}
          {filteredBlogs[0] && (
            <div
              onClick={() => setActiveArticle(filteredBlogs[0])}
              className="lg:col-span-7 bg-white rounded-3xl border border-[#E4DACD] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-16/9 overflow-hidden bg-[#F4EDE3]">
                <img
                  src={filteredBlogs[0].cover_image}
                  alt={filteredBlogs[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#1C1817]/85 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Featured Cover Story
                </span>
                <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-[#1C1817] text-[10px] font-mono px-2.5 py-1 rounded-full shadow">
                  {filteredBlogs[0].read_time}
                </span>
              </div>

              <div className="p-6 md:p-8 space-y-4">
                <div className="text-[11px] font-bold text-[#C85A2B] uppercase tracking-wider font-mono">
                  {filteredBlogs[0].category}
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-[#1C1817] group-hover:text-[#C85A2B] transition-colors leading-tight">
                  {filteredBlogs[0].title}
                </h3>
                <p className="text-xs md:text-sm text-[#665A53] leading-relaxed">
                  {filteredBlogs[0].excerpt}
                </p>

                <div className="pt-4 border-t border-[#F0E6D8] flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {filteredBlogs[0].author_avatar && (
                      <img
                        src={filteredBlogs[0].author_avatar}
                        alt={filteredBlogs[0].author_name}
                        className="w-9 h-9 rounded-full object-cover border border-[#DDD3C2]"
                      />
                    )}
                    <div>
                      <div className="text-xs font-bold text-[#1C1817]">
                        {filteredBlogs[0].author_name}
                      </div>
                      <div className="text-[10px] text-neutral-400">
                        {filteredBlogs[0].author_role}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-[#C85A2B] flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Articles List */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {filteredBlogs.slice(1, 4).map((blog) => (
              <div
                key={blog.id}
                onClick={() => setActiveArticle(blog)}
                className="bg-white p-5 rounded-2xl border border-[#E4DACD] shadow-sm hover:shadow-md transition-all cursor-pointer group flex space-x-4 items-center"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-[#F4EDE3]">
                  <img
                    src={blog.cover_image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center space-x-2 text-[10px] text-[#C85A2B] font-bold uppercase tracking-wider font-mono">
                    <span>{blog.category}</span>
                    <span>•</span>
                    <span className="text-neutral-400">{blog.read_time}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#1C1817] group-hover:text-[#C85A2B] transition-colors line-clamp-2 leading-snug">
                    {blog.title}
                  </h4>
                  <div className="text-[11px] text-neutral-400 flex items-center space-x-1">
                    <span>By {blog.author_name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full my-8 overflow-hidden shadow-2xl border border-[#E7DFD3] relative animate-in zoom-in-95">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#1C1817] shadow"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Article Hero Image */}
            <div className="relative aspect-21/9 bg-[#F4EDE3]">
              <img
                src={activeArticle.cover_image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-10 space-y-6">
              <div className="space-y-2">
                <div className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#C85A2B] bg-[#F7F3EC] px-3 py-1 rounded-full">
                  {activeArticle.category} • {activeArticle.read_time}
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-[#1C1817] font-display leading-tight">
                  {activeArticle.title}
                </h2>

                <div className="flex items-center justify-between pt-2 border-b border-[#F0E6D8] pb-4">
                  <div className="flex items-center space-x-3">
                    {activeArticle.author_avatar && (
                      <img
                        src={activeArticle.author_avatar}
                        alt={activeArticle.author_name}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                    )}
                    <div>
                      <div className="text-xs font-bold text-[#1C1817]">
                        {activeArticle.author_name}
                      </div>
                      <div className="text-[10px] text-neutral-400">
                        {activeArticle.author_role}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleClap(activeArticle.id, activeArticle.claps_count)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#F7F3EC] hover:bg-[#EAE0D1] text-[#1C1817] text-xs font-bold transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-[#C85A2B]" />
                    <span>{claps[activeArticle.id] || activeArticle.claps_count} Claps</span>
                  </button>
                </div>
              </div>

              {/* Body Content */}
              <div className="prose prose-sm max-w-none text-[#4A423F] leading-relaxed whitespace-pre-line text-sm md:text-base space-y-4">
                {activeArticle.content}
              </div>

              {/* Tags */}
              {activeArticle.tags && activeArticle.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#F0E6D8]">
                  {activeArticle.tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-[#F7F3EC] text-[#554A44] font-medium"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              {/* Reader Comments */}
              <div className="pt-6 border-t border-[#F0E6D8] space-y-4">
                <h4 className="text-sm font-bold text-[#1C1817] uppercase tracking-wider flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-[#C85A2B]" />
                  <span>Barista Community Discussion</span>
                </h4>

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your cupping notes or brewing parameters..."
                    className="flex-1 px-4 py-2 rounded-xl bg-[#F7F3EC] border border-[#DDD3C2] text-xs focus:outline-none focus:border-[#C85A2B]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddComment(activeArticle.id);
                    }}
                  />
                  <button
                    onClick={() => handleAddComment(activeArticle.id)}
                    className="px-4 py-2 rounded-xl bg-[#1C1817] hover:bg-[#C85A2B] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Post
                  </button>
                </div>

                {/* Display Comments */}
                <div className="space-y-2 pt-2">
                  {(comments[activeArticle.id] || [
                    "Spot on about unimodal fines reduction! Noticed an instant +0.4% TDS bump on my V60 bed.",
                    "Tested this with our 2026 Misty Valley lot in Tokyo. The peach floral notes blossomed remarkably.",
                  ]).map((cmt, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#FAF7F2] text-xs text-[#554A44] border border-[#EFE8DE]"
                    >
                      <span className="font-bold text-[#1C1817] block mb-0.5">
                        Specialty Barista #{idx + 1}
                      </span>
                      {cmt}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
