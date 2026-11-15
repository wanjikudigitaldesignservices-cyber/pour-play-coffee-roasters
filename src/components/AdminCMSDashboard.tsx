"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CoffeeProduct,
  CoffeeStore,
  CoffeeBlog,
  FranchiseInquiry,
  CoffeeOrder,
} from "@/types";
import {
  X,
  Plus,
  Trash2,
  Edit,
  Package,
  BookOpen,
  Users,
  Store,
  ShoppingBag,
  Database,
  RefreshCw,
  Eye,
  EyeOff,
  LogOut,
  ArrowLeft,
  Coffee,
  CheckCircle2,
  Clock,
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import {
  fetchProducts,
  fetchBlogs,
  fetchStores,
  fetchFranchiseInquiries,
  fetchOrders,
  upsertProduct,
  deleteProduct,
  upsertBlog,
  deleteBlog,
  upsertStore,
  deleteStore,
  updateInquiryStatus,
  supabase,
} from "@/lib/supabase";

export type StaffRole = "branch_manager" | "barista";

interface AdminCMSDashboardProps {
  isOpen?: boolean;
  onClose?: () => void;
  isStandalonePage?: boolean;
  onDataChange?: () => void;
}

export default function AdminCMSDashboard({
  isOpen = true,
  onClose,
  isStandalonePage = false,
  onDataChange,
}: AdminCMSDashboardProps) {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<StaffRole>("branch_manager");
  const [userName, setUserName] = useState<string>("");
  const [authUsername, setAuthUsername] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Tab & Data states
  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "blogs" | "inquiries" | "stores" | "orders"
  >("overview");

  const [products, setProducts] = useState<CoffeeProduct[]>([]);
  const [blogs, setBlogs] = useState<CoffeeBlog[]>([]);
  const [stores, setStores] = useState<CoffeeStore[]>([]);
  const [inquiries, setInquiries] = useState<FranchiseInquiry[]>([]);
  const [orders, setOrders] = useState<CoffeeOrder[]>([]);
  const [loading, setLoading] = useState(false);

  // Edit / Create states
  const [editingProduct, setEditingProduct] = useState<Partial<CoffeeProduct> | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<CoffeeBlog> | null>(null);
  const [editingStore, setEditingStore] = useState<Partial<CoffeeStore> | null>(null);

  // Check persistent session on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("pourplay_admin_auth");
      const role = sessionStorage.getItem("pourplay_admin_role") as StaffRole | null;
      const user = sessionStorage.getItem("pourplay_admin_user");

      if (auth === "authenticated" && role) {
        setIsAuthenticated(true);
        setUserRole(role);
        setUserName(user || (role === "branch_manager" ? "Branch Manager" : "Normal Barista"));
        if (role === "barista") {
          setActiveTab("orders");
        }
      }
    }
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [p, b, s, inq, ord] = await Promise.all([
        fetchProducts(),
        fetchBlogs(),
        fetchStores(),
        fetchFranchiseInquiries(),
        fetchOrders(),
      ]);
      setProducts(p);
      setBlogs(b);
      setStores(s);
      setInquiries(inq);
      setOrders(ord);
    } catch (err) {
      console.error("CMS load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadAllData();
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  // Handle Authentication for both roles
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    const u = authUsername.trim().toLowerCase();
    const p = authPassword.trim();

    // 1. Role: Branch Manager (Full Access)
    if (
      (u === "manager" || u === "manager@pourplay.coffee" || u === "admin" || u === "admin@pourplay.coffee") &&
      (p === "Manager#Pour2026" || p === "pourplay2026")
    ) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("pourplay_admin_auth", "authenticated");
        sessionStorage.setItem("pourplay_admin_role", "branch_manager");
        sessionStorage.setItem("pourplay_admin_user", "Branch Manager");
      }
      setIsAuthenticated(true);
      setUserRole("branch_manager");
      setUserName("Branch Manager");
      setActiveTab("overview");
      setAuthLoading(false);
      loadAllData();
      return;
    }

    // 2. Role: Normal Barista (Orders & Roastery menu view)
    if (
      (u === "barista" || u === "barista@pourplay.coffee") &&
      (p === "Barista#Pour2026" || p === "pourplay2026")
    ) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("pourplay_admin_auth", "authenticated");
        sessionStorage.setItem("pourplay_admin_role", "barista");
        sessionStorage.setItem("pourplay_admin_user", "Normal Barista");
      }
      setIsAuthenticated(true);
      setUserRole("barista");
      setUserName("Normal Barista");
      setActiveTab("orders");
      setAuthLoading(false);
      loadAllData();
      return;
    }

    // 3. Fallback: Supabase Auth
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: u,
        password: p,
      });

      if (!error && data.user) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("pourplay_admin_auth", "authenticated");
          sessionStorage.setItem("pourplay_admin_role", "branch_manager");
          sessionStorage.setItem("pourplay_admin_user", data.user.email || "Branch Manager");
        }
        setIsAuthenticated(true);
        setUserRole("branch_manager");
        setUserName(data.user.email || "Branch Manager");
        loadAllData();
        setAuthLoading(false);
        return;
      }
    } catch {
      // ignore
    }

    setAuthError("Invalid username or password.");
    setAuthLoading(false);
  };

  // Sign Out
  const handleSignOut = async () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("pourplay_admin_auth");
      sessionStorage.removeItem("pourplay_admin_role");
      sessionStorage.removeItem("pourplay_admin_user");
    }
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    setAuthUsername("");
    setAuthPassword("");
    setAuthError(null);
  };

  // Handle Order Status Update (Very important for Baristas)
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await supabase.from("coffee_orders").update({ status: newStatus }).eq("id", orderId);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus as any } : o))
      );
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  // Handle Product Save
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.price) return;

    await upsertProduct({
      ...editingProduct,
      slug:
        editingProduct.slug ||
        editingProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      image_url:
        editingProduct.image_url ||
        "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80",
      rating: editingProduct.rating || 4.9,
      reviews_count: editingProduct.reviews_count || 12,
      in_stock: true,
      category: editingProduct.category || "single_origin",
    });

    setEditingProduct(null);
    await loadAllData();
    if (onDataChange) onDataChange();
  };

  // Handle Blog Save
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog?.title || !editingBlog?.content) return;

    await upsertBlog({
      ...editingBlog,
      slug:
        editingBlog.slug ||
        editingBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      excerpt: editingBlog.excerpt || editingBlog.content.slice(0, 140) + "...",
      category: editingBlog.category || "Brew Science",
      author_name: editingBlog.author_name || "Head Roaster",
      cover_image:
        editingBlog.cover_image ||
        "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=1200&q=80",
      read_time: editingBlog.read_time || "5 min read",
      published: true,
      claps_count: 50,
    });

    setEditingBlog(null);
    await loadAllData();
    if (onDataChange) onDataChange();
  };

  // Handle Store Save
  const handleSaveStore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStore?.name || !editingStore?.city) return;

    await upsertStore({
      ...editingStore,
      country: editingStore.country || "Japan",
      region: editingStore.region || "Asia-Pacific",
      address: editingStore.address || "Flagship Avenue",
      hours: editingStore.hours || "07:30 - 21:00 Daily",
      is_flagship: editingStore.is_flagship || false,
      image_url:
        editingStore.image_url ||
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    });

    setEditingStore(null);
    await loadAllData();
    if (onDataChange) onDataChange();
  };

  // Define accessible tabs based on role
  const tabs =
    userRole === "barista"
      ? [
          { id: "orders", label: `Orders Queue (${orders.length})`, icon: ShoppingBag },
          { id: "products", label: `Products & Lots (${products.length})`, icon: Package },
        ]
      : [
          { id: "overview", label: "Overview Metrics", icon: Database },
          { id: "products", label: `Products (${products.length})`, icon: Package },
          { id: "blogs", label: `Blogs (${blogs.length})`, icon: BookOpen },
          { id: "inquiries", label: `Franchise Leads (${inquiries.length})`, icon: Users },
          { id: "stores", label: `Global Cafés (${stores.length})`, icon: Store },
          { id: "orders", label: `Orders (${orders.length})`, icon: ShoppingBag },
        ];

  // =========================================================================
  // VIEW A: CLEAN MINIMALIST LOGIN SCREEN ONLY
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0C0A09] text-white flex flex-col items-center justify-center p-4 selection:bg-[#DF9E51] selection:text-[#0C0A09]">
        {/* Subtle Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#241A15]/40 via-[#0C0A09] to-[#0C0A09] pointer-events-none" />

        <div className="w-full max-w-sm bg-[#120F0E] p-8 md:p-10 rounded-3xl border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative z-10 space-y-6">
          {/* Logo & Clean Title */}
          <div className="flex flex-col items-center space-y-3 text-center">
            <BrandLogo variant="light" size="md" withTagline={false} />
            <h2 className="text-xs font-mono uppercase tracking-[0.24em] text-white/50">
              CMS Portal
            </h2>
          </div>

          {/* Error Message if wrong credentials */}
          {authError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 text-center font-medium">
              {authError}
            </div>
          )}

          {/* Pure Login Form Only */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-[0.18em] text-white/60 mb-1.5">
                Username
              </label>
              <input
                type="text"
                required
                value={authUsername}
                onChange={(e) => setAuthUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.12] focus:border-[#DF9E51] text-white text-xs placeholder:text-white/20 focus:outline-none transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-[0.18em] text-white/60 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 pr-10 rounded-xl bg-white/[0.04] border border-white/[0.12] focus:border-[#DF9E51] text-white text-xs placeholder:text-white/20 focus:outline-none transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C85A2B] to-[#B34D21] hover:from-[#D96B3A] hover:to-[#C85A2B] text-white text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(200,90,43,0.3)] transition-all flex items-center justify-center space-x-2 border border-white/10"
            >
              <span>{authLoading ? "Authenticating..." : "Authenticate"}</span>
            </button>
          </form>

          {/* Exit / Return option */}
          <div className="text-center pt-2 border-t border-white/[0.06]">
            {isStandalonePage ? (
              <Link
                href="/"
                className="text-white/40 hover:text-white text-xs font-mono tracking-wider transition-colors inline-flex items-center space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Flagship</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="text-white/40 hover:text-white text-xs font-mono tracking-wider transition-colors"
              >
                Close Portal
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW B: FULLSCREEN CMS DASHBOARD WITH TWO ROLES
  // =========================================================================
  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-[#F7F3EC] flex flex-col overflow-hidden text-[#1C1817]">
      {/* ── Fullscreen Top Header Bar ── */}
      <header className="w-full bg-[#120F0E] text-white px-6 py-4 flex items-center justify-between border-b border-white/[0.08] shrink-0">
        <div className="flex items-center space-x-4">
          <BrandLogo variant="light" size="sm" withTagline={false} />
          <div className="h-5 w-[1px] bg-white/20 hidden sm:block" />

          <div className="flex items-center space-x-2.5">
            <h1 className="font-extrabold text-sm md:text-base uppercase tracking-[0.16em] text-white font-sans hidden sm:inline">
              CMS Backoffice
            </h1>

            {/* Role Badge Indicator */}
            <span
              className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase border flex items-center space-x-1.5 ${
                userRole === "branch_manager"
                  ? "bg-amber-500/10 text-[#DF9E51] border-[#DF9E51]/30"
                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              }`}
            >
              {userRole === "branch_manager" ? (
                <span>★ Branch Manager</span>
              ) : (
                <>
                  <Coffee className="w-3 h-3" />
                  <span>Normal Barista</span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* Right Controls: Refresh + Sign Out + Exit */}
        <div className="flex items-center space-x-3">
          <button
            onClick={loadAllData}
            className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white/80 hover:text-white transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={handleSignOut}
            className="px-3.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono tracking-wider transition-colors flex items-center space-x-1.5"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>

          {isStandalonePage ? (
            <Link
              href="/"
              className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white/80 hover:text-white transition-colors"
              title="Return to Site"
            >
              <X className="w-5 h-5" />
            </Link>
          ) : (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white/80 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </header>

      {/* ── Fullscreen Tab Navigation Bar ── */}
      <nav className="w-full bg-[#EDE4D5] px-6 py-2.5 border-b border-[#D8CAB5] flex items-center space-x-2 overflow-x-auto text-xs font-bold uppercase tracking-wider shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-4 rounded-xl transition-all flex items-center space-x-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#1C1817] text-white shadow-sm"
                  : "text-[#63554E] hover:bg-[#E0D5C4]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ── Fullscreen Main Content Workspace ── */}
      <main className="flex-1 w-full overflow-y-auto p-6 md:p-8">
        {/* ===================== OVERVIEW TAB (Manager Only) ===================== */}
        {activeTab === "overview" && userRole === "branch_manager" && (
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#E5DACB] shadow-sm">
                <div className="text-xs text-neutral-500 uppercase font-semibold">Active Products</div>
                <div className="text-3xl font-black text-[#1C1817] font-mono mt-1">
                  {products.length}
                </div>
                <div className="text-[10px] text-[#C85A2B] mt-1">Single origins & gear</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E5DACB] shadow-sm">
                <div className="text-xs text-neutral-500 uppercase font-semibold">Published Blogs</div>
                <div className="text-3xl font-black text-[#DF9E51] font-mono mt-1">
                  {blogs.length}
                </div>
                <div className="text-[10px] text-neutral-500 mt-1">Research & harvest notes</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E5DACB] shadow-sm">
                <div className="text-xs text-neutral-500 uppercase font-semibold">Franchise Applications</div>
                <div className="text-3xl font-black text-emerald-600 font-mono mt-1">
                  {inquiries.length}
                </div>
                <div className="text-[10px] text-neutral-500 mt-1">Prospective partners</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E5DACB] shadow-sm">
                <div className="text-xs text-neutral-500 uppercase font-semibold">International Flagships</div>
                <div className="text-3xl font-black text-[#C85A2B] font-mono mt-1">
                  {stores.length}
                </div>
                <div className="text-[10px] text-neutral-500 mt-1">Across 8 global metros</div>
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div className="bg-white p-6 rounded-2xl border border-[#E5DACB] shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm uppercase tracking-wider text-[#1C1817]">
                  Recent Franchise Applicant Leads
                </h4>
                <button
                  onClick={() => setActiveTab("inquiries")}
                  className="text-xs text-[#C85A2B] font-bold hover:underline"
                >
                  View All Leads →
                </button>
              </div>

              {inquiries.length === 0 ? (
                <p className="text-xs text-neutral-400 py-4">No franchise applications submitted yet.</p>
              ) : (
                <div className="divide-y divide-[#F2ECE3]">
                  {inquiries.slice(0, 4).map((inq, idx) => (
                    <div key={idx} className="py-3 flex justify-between items-center text-xs">
                      <div>
                        <div className="font-bold text-[#1C1817]">{inq.full_name}</div>
                        <div className="text-[11px] text-neutral-500">
                          {inq.city}, {inq.country} • Capital: {inq.investment_capital}
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                        {inq.status || "New"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================== PRODUCTS TAB ===================== */}
        {activeTab === "products" && (
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-[#1C1817]">Roastery Products Catalog</h3>
                <p className="text-xs text-neutral-500">Single origins, signature blends, and gear</p>
              </div>
              {userRole === "branch_manager" && (
                <button
                  onClick={() =>
                    setEditingProduct({
                      name: "",
                      slug: "",
                      category: "single_origin",
                      roast_level: "Medium",
                      price: 24.0,
                      description: "",
                      flavor_notes: ["Floral", "Citrus"],
                    })
                  }
                  className="px-4 py-2 rounded-xl bg-[#1C1817] hover:bg-[#C85A2B] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center space-x-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Product</span>
                </button>
              )}
            </div>

            {/* Product Edit / Add Form (Manager only) */}
            {editingProduct && userRole === "branch_manager" && (
              <form
                onSubmit={handleSaveProduct}
                className="bg-white p-6 rounded-2xl border-2 border-[#C85A2B] shadow-md space-y-4"
              >
                <div className="flex justify-between items-center border-b pb-2">
                  <h5 className="font-bold text-sm text-[#1C1817]">
                    {editingProduct.id ? "Edit Product" : "New Coffee Product"}
                  </h5>
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="text-neutral-400 hover:text-black"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1C1817] uppercase mb-1">
                      Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={editingProduct.name || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, name: e.target.value })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1C1817] uppercase mb-1">
                      Category
                    </label>
                    <select
                      value={editingProduct.category || "single_origin"}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          category: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border text-xs"
                    >
                      <option value="single_origin">Single Origin</option>
                      <option value="blend">Signature Blend</option>
                      <option value="gear">Precision Gear</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1C1817] uppercase mb-1">
                      Price (USD) *
                    </label>
                    <input
                      required
                      type="number"
                      step="0.5"
                      value={editingProduct.price || 0}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          price: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1C1817] uppercase mb-1">
                      Roast Level
                    </label>
                    <input
                      type="text"
                      value={editingProduct.roast_level || ""}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          roast_level: e.target.value,
                        })
                      }
                      placeholder="e.g. Light, Medium, Dark"
                      className="w-full px-3 py-1.5 rounded-lg border text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1C1817] uppercase mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={editingProduct.image_url || ""}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          image_url: e.target.value,
                        })
                      }
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-1.5 rounded-lg border text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1C1817] uppercase mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={editingProduct.description || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg border text-xs"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 rounded-lg border text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#C85A2B] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Save to Supabase
                  </button>
                </div>
              </form>
            )}

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-[#E5DACB] overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F3EC] text-[#695A51] uppercase font-bold text-[10px] border-b">
                  <tr>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Roast</th>
                    <th className="p-3.5">Price</th>
                    {userRole === "branch_manager" && <th className="p-3.5 text-right">Actions</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2ECE3]">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#FAF7F2]">
                      <td className="p-3.5 flex items-center space-x-3">
                        <img
                          src={prod.image_url}
                          alt=""
                          className="w-9 h-9 rounded-xl object-cover"
                        />
                        <span className="font-bold text-[#1C1817]">{prod.name}</span>
                      </td>
                      <td className="p-3.5 uppercase text-[10px] font-mono text-[#73655C]">
                        {prod.category}
                      </td>
                      <td className="p-3.5">{prod.roast_level || "N/A"}</td>
                      <td className="p-3.5 font-mono font-bold text-[#1C1817]">
                        ${prod.price.toFixed(2)}
                      </td>
                      {userRole === "branch_manager" && (
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => setEditingProduct(prod)}
                            className="p-1 hover:text-[#C85A2B]"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm(`Delete ${prod.name}?`)) {
                                await deleteProduct(prod.id);
                                await loadAllData();
                                if (onDataChange) onDataChange();
                              }
                            }}
                            className="p-1 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================== BLOGS TAB (Manager Only) ===================== */}
        {activeTab === "blogs" && userRole === "branch_manager" && (
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-[#1C1817]">Roaster's Journal CMS</h3>
                <p className="text-xs text-neutral-500">Draft and publish coffee science editorials</p>
              </div>
              <button
                onClick={() =>
                  setEditingBlog({
                    title: "",
                    content: "",
                    category: "Brew Science",
                    author_name: "Master Roaster",
                    read_time: "5 min read",
                  })
                }
                className="px-4 py-2 rounded-xl bg-[#1C1817] hover:bg-[#C85A2B] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center space-x-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Article</span>
              </button>
            </div>

            {editingBlog && (
              <form
                onSubmit={handleSaveBlog}
                className="bg-white p-6 rounded-2xl border-2 border-[#C85A2B] shadow-md space-y-4"
              >
                <div className="flex justify-between items-center border-b pb-2">
                  <h5 className="font-bold text-sm text-[#1C1817]">
                    {editingBlog.id ? "Edit Article" : "Write Article"}
                  </h5>
                  <button
                    type="button"
                    onClick={() => setEditingBlog(null)}
                    className="text-neutral-400 hover:text-black"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1C1817] uppercase mb-1">
                      Title *
                    </label>
                    <input
                      required
                      type="text"
                      value={editingBlog.title || ""}
                      onChange={(e) =>
                        setEditingBlog({ ...editingBlog, title: e.target.value })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1C1817] uppercase mb-1">
                      Category
                    </label>
                    <select
                      value={editingBlog.category || "Brew Science"}
                      onChange={(e) =>
                        setEditingBlog({ ...editingBlog, category: e.target.value })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border text-xs"
                    >
                      <option value="Brew Science">Brew Science</option>
                      <option value="Direct Trade">Direct Trade</option>
                      <option value="Franchise Stories">Franchise Stories</option>
                      <option value="Roasting Mastery">Roasting Mastery</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1C1817] uppercase mb-1">
                    Content *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={editingBlog.content || ""}
                    onChange={(e) =>
                      setEditingBlog({ ...editingBlog, content: e.target.value })
                    }
                    className="w-full px-3 py-1.5 rounded-lg border text-xs font-mono"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingBlog(null)}
                    className="px-4 py-2 rounded-lg border text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#C85A2B] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Publish Article
                  </button>
                </div>
              </form>
            )}

            {/* Blogs Table */}
            <div className="bg-white rounded-2xl border border-[#E5DACB] overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F3EC] text-[#695A51] uppercase font-bold text-[10px] border-b">
                  <tr>
                    <th className="p-3.5">Article Title</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Author</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2ECE3]">
                  {blogs.map((b) => (
                    <tr key={b.id} className="hover:bg-[#FAF7F2]">
                      <td className="p-3.5 font-bold text-[#1C1817]">{b.title}</td>
                      <td className="p-3.5 text-[10px] uppercase font-mono text-[#C85A2B]">
                        {b.category}
                      </td>
                      <td className="p-3.5">{b.author_name}</td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => setEditingBlog(b)}
                          className="p-1 hover:text-[#C85A2B]"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Delete ${b.title}?`)) {
                              await deleteBlog(b.id);
                              await loadAllData();
                              if (onDataChange) onDataChange();
                            }
                          }}
                          className="p-1 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================== INQUIRIES TAB (Manager Only) ===================== */}
        {activeTab === "inquiries" && userRole === "branch_manager" && (
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#1C1817]">Franchise Inquiries Pipeline</h3>
              <p className="text-xs text-neutral-500">
                Prospective partners applying for territorial franchise licenses
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5DACB] overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F3EC] text-[#695A51] uppercase font-bold text-[10px] border-b">
                  <tr>
                    <th className="p-3.5">Candidate</th>
                    <th className="p-3.5">Target Market</th>
                    <th className="p-3.5">Format & Capital</th>
                    <th className="p-3.5">Contact</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2ECE3]">
                  {inquiries.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-neutral-400">
                        No inquiries received yet.
                      </td>
                    </tr>
                  ) : (
                    inquiries.map((inq) => (
                      <tr key={inq.id || inq.email} className="hover:bg-[#FAF7F2]">
                        <td className="p-3.5">
                          <div className="font-bold text-[#1C1817]">{inq.full_name}</div>
                          <div className="text-[10px] text-neutral-400">
                            Exp: {inq.previous_experience || "N/A"}
                          </div>
                        </td>
                        <td className="p-3.5 font-semibold">
                          {inq.city}, {inq.country}
                        </td>
                        <td className="p-3.5">
                          <div className="text-[#C85A2B] font-bold text-[10px] uppercase">
                            {inq.model_type?.replace(/_/g, " ")}
                          </div>
                          <div className="font-mono text-[11px] text-[#1C1817]">
                            {inq.investment_capital}
                          </div>
                        </td>
                        <td className="p-3.5 text-[11px]">
                          <div>{inq.email}</div>
                          <div className="text-neutral-400">{inq.phone}</div>
                        </td>
                        <td className="p-3.5">
                          <select
                            value={inq.status || "new"}
                            onChange={async (e) => {
                              if (inq.id) {
                                await updateInquiryStatus(inq.id, e.target.value);
                                await loadAllData();
                              }
                            }}
                            className="px-2.5 py-1 rounded bg-[#F7F3EC] border text-[10px] font-bold uppercase"
                          >
                            <option value="new">New</option>
                            <option value="reviewing">In Review</option>
                            <option value="approved">Approved</option>
                            <option value="contacted">Contacted</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================== STORES TAB (Manager Only) ===================== */}
        {activeTab === "stores" && userRole === "branch_manager" && (
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-[#1C1817]">Global Cafés Directory</h3>
                <p className="text-xs text-neutral-500">Manage international locations and flagships</p>
              </div>
              <button
                onClick={() =>
                  setEditingStore({
                    name: "",
                    city: "",
                    country: "Japan",
                    region: "Asia-Pacific",
                    address: "",
                    hours: "07:30 - 21:00 Daily",
                    is_flagship: false,
                  })
                }
                className="px-4 py-2 rounded-xl bg-[#1C1817] hover:bg-[#C85A2B] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center space-x-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Café Location</span>
              </button>
            </div>

            {editingStore && (
              <form
                onSubmit={handleSaveStore}
                className="bg-white p-6 rounded-2xl border-2 border-[#C85A2B] shadow-md space-y-4"
              >
                <div className="flex justify-between items-center border-b pb-2">
                  <h5 className="font-bold text-sm text-[#1C1817]">New Global Location</h5>
                  <button
                    type="button"
                    onClick={() => setEditingStore(null)}
                    className="text-neutral-400 hover:text-black"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1C1817] uppercase mb-1">
                      Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={editingStore.name || ""}
                      onChange={(e) =>
                        setEditingStore({ ...editingStore, name: e.target.value })
                      }
                      placeholder="e.g. POUR / PLAY Ginza Lab"
                      className="w-full px-3 py-1.5 rounded-lg border text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1C1817] uppercase mb-1">
                      City *
                    </label>
                    <input
                      required
                      type="text"
                      value={editingStore.city || ""}
                      onChange={(e) =>
                        setEditingStore({ ...editingStore, city: e.target.value })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1C1817] uppercase mb-1">
                      Region
                    </label>
                    <select
                      value={editingStore.region || "Asia-Pacific"}
                      onChange={(e) =>
                        setEditingStore({ ...editingStore, region: e.target.value as any })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border text-xs"
                    >
                      <option value="Asia-Pacific">Asia-Pacific</option>
                      <option value="North America">North America</option>
                      <option value="Europe">Europe</option>
                      <option value="Africa">Africa</option>
                      <option value="Middle East">Middle East</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingStore(null)}
                    className="px-4 py-2 rounded-lg border text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#C85A2B] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Save Location
                  </button>
                </div>
              </form>
            )}

            {/* Stores Table */}
            <div className="bg-white rounded-2xl border border-[#E5DACB] overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F3EC] text-[#695A51] uppercase font-bold text-[10px] border-b">
                  <tr>
                    <th className="p-3.5">Store Name</th>
                    <th className="p-3.5">City & Region</th>
                    <th className="p-3.5">Operating Hours</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2ECE3]">
                  {stores.map((s) => (
                    <tr key={s.id} className="hover:bg-[#FAF7F2]">
                      <td className="p-3.5 font-bold text-[#1C1817]">
                        {s.name}{" "}
                        {s.is_flagship && (
                          <span className="text-[9px] bg-[#C85A2B] text-white px-2 py-0.5 rounded-full ml-1">
                            Flagship
                          </span>
                        )}
                      </td>
                      <td className="p-3.5">
                        {s.city}, {s.country} ({s.region})
                      </td>
                      <td className="p-3.5">{s.hours}</td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={async () => {
                            if (confirm(`Delete ${s.name}?`)) {
                              await deleteStore(s.id);
                              await loadAllData();
                              if (onDataChange) onDataChange();
                            }
                          }}
                          className="p-1 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================== ORDERS TAB (Both Roles - Essential for Barista) ===================== */}
        {activeTab === "orders" && (
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-[#1C1817]">Customer Roastery Orders Queue</h3>
                <p className="text-xs text-neutral-500">
                  {userRole === "barista"
                    ? "Live brewing & dispatch station for Baristas"
                    : "Live customer orders from the digital storefront"}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5DACB] overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F3EC] text-[#695A51] uppercase font-bold text-[10px] border-b">
                  <tr>
                    <th className="p-3.5">Customer</th>
                    <th className="p-3.5">Order Items</th>
                    <th className="p-3.5">Total Amount</th>
                    <th className="p-3.5">Destination</th>
                    <th className="p-3.5">Status & Dispatch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2ECE3]">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-neutral-400">
                        No orders currently in the queue. Place an order through the Cart to test.
                      </td>
                    </tr>
                  ) : (
                    orders.map((ord, idx) => (
                      <tr key={ord.id || idx} className="hover:bg-[#FAF7F2]">
                        <td className="p-3.5 font-bold text-[#1C1817]">
                          {ord.customer_name}
                          <div className="text-[10px] text-neutral-400 font-normal">
                            {ord.customer_email}
                          </div>
                        </td>
                        <td className="p-3.5">
                          <div className="font-mono text-[11px] font-semibold text-[#1C1817]">
                            {ord.items?.length || 1} item(s)
                          </div>
                          {ord.items && ord.items.length > 0 && (
                            <div className="text-[10px] text-[#73655C] truncate max-w-xs">
                              {ord.items.map((i) => `${i.name || "Coffee"} (x${i.quantity})`).join(", ")}
                            </div>
                          )}
                        </td>
                        <td className="p-3.5 font-mono font-bold text-[#C85A2B]">
                          ${ord.total_amount?.toFixed(2)}
                        </td>
                        <td className="p-3.5">{ord.shipping_country}</td>
                        <td className="p-3.5">
                          {/* Barista & Manager Status Selector */}
                          <select
                            value={ord.status || "processing"}
                            onChange={(e) => {
                              if (ord.id) {
                                handleUpdateOrderStatus(ord.id, e.target.value);
                              }
                            }}
                            className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold uppercase transition-colors ${
                              ord.status === "completed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                : ord.status === "brewing"
                                ? "bg-amber-50 text-amber-700 border-amber-300"
                                : "bg-neutral-50 text-neutral-700 border-neutral-300"
                            }`}
                          >
                            <option value="processing">Processing</option>
                            <option value="brewing">Brewing / Grinding</option>
                            <option value="ready">Ready for Pickup</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
