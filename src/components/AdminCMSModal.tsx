"use client";

import React, { useState, useEffect } from "react";
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
  ShieldCheck,
  Package,
  BookOpen,
  Users,
  Store,
  ShoppingBag,
  CheckCircle,
  Database,
  RefreshCw,
  Search
} from "lucide-react";
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

interface AdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChange?: () => void;
}

export default function AdminCMSModal({
  isOpen,
  onClose,
  onDataChange,
}: AdminCMSModalProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "blogs" | "inquiries" | "stores" | "orders"
  >("overview");

  const [products, setProducts] = useState<CoffeeProduct[]>([]);
  const [blogs, setBlogs] = useState<CoffeeBlog[]>([]);
  const [stores, setStores] = useState<CoffeeStore[]>([]);
  const [inquiries, setInquiries] = useState<FranchiseInquiry[]>([]);
  const [orders, setOrders] = useState<CoffeeOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState<"connected" | "checking">("connected");

  // Edit / Create states
  const [editingProduct, setEditingProduct] = useState<Partial<CoffeeProduct> | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<CoffeeBlog> | null>(null);
  const [editingStore, setEditingStore] = useState<Partial<CoffeeStore> | null>(null);

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
      setDbStatus("connected");
    } catch (err) {
      console.error("CMS load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadAllData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto animate-in fade-in">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-6xl w-full h-[90vh] flex flex-col shadow-2xl border border-[#DFD3C1] overflow-hidden animate-in zoom-in-95">
        {/* Top Header */}
        <div className="p-4 md:p-6 bg-[#1C1817] text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-[#C85A2B] text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-lg uppercase tracking-wider">
                  POUR / PLAY CMS BACKOFFICE
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Supabase Live</span>
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Connected to Postgres DB <span className="font-mono text-neutral-300">rdaudofnzkilnsyhtahk</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={loadAllData}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#EDE4D5] px-6 py-2 border-b border-[#D8CAB5] flex items-center space-x-2 overflow-x-auto text-xs font-bold uppercase tracking-wider">
          {[
            { id: "overview", label: "Overview Metrics", icon: Database },
            { id: "products", label: `Products (${products.length})`, icon: Package },
            { id: "blogs", label: `Blogs (${blogs.length})`, icon: BookOpen },
            { id: "inquiries", label: `Franchise Leads (${inquiries.length})`, icon: Users },
            { id: "stores", label: `Global Cafés (${stores.length})`, icon: Store },
            { id: "orders", label: `Orders (${orders.length})`, icon: ShoppingBag },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-3.5 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
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
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-6">
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

              {/* Recent Franchise Inquiries Preview */}
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
                    {inquiries.slice(0, 3).map((inq, idx) => (
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

          {/* PRODUCTS TAB */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-bold text-[#1C1817]">Roastery Products Catalog</h4>
                  <p className="text-xs text-neutral-500">Manage coffee lots, roast profiles, and gear</p>
                </div>
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
              </div>

              {/* Product Form Modal */}
              {editingProduct && (
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
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Roast</th>
                      <th className="p-3">Price</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2ECE3]">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#FAF7F2]">
                        <td className="p-3 flex items-center space-x-2">
                          <img
                            src={prod.image_url}
                            alt=""
                            className="w-8 h-8 rounded-lg object-cover"
                          />
                          <span className="font-bold text-[#1C1817]">{prod.name}</span>
                        </td>
                        <td className="p-3 uppercase text-[10px] font-mono text-[#73655C]">
                          {prod.category}
                        </td>
                        <td className="p-3">{prod.roast_level || "N/A"}</td>
                        <td className="p-3 font-mono font-bold text-[#1C1817]">
                          ${prod.price.toFixed(2)}
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => setEditingProduct(prod)}
                            className="p-1 hover:text-[#C85A2B]"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
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
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* BLOGS TAB */}
          {activeTab === "blogs" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-bold text-[#1C1817]">Roaster's Journal CMS</h4>
                  <p className="text-xs text-neutral-500">Draft and publish coffee research and stories</p>
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
                      Content (Markdown / Text) *
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
                      <th className="p-3">Article Title</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Author</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2ECE3]">
                    {blogs.map((b) => (
                      <tr key={b.id} className="hover:bg-[#FAF7F2]">
                        <td className="p-3 font-bold text-[#1C1817]">{b.title}</td>
                        <td className="p-3 text-[10px] uppercase font-mono text-[#C85A2B]">
                          {b.category}
                        </td>
                        <td className="p-3">{b.author_name}</td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => setEditingBlog(b)}
                            className="p-1 hover:text-[#C85A2B]"
                          >
                            <Edit className="w-3.5 h-3.5" />
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
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* INQUIRIES TAB */}
          {activeTab === "inquiries" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-[#1C1817]">Franchise Inquiries Pipeline</h4>
                <p className="text-xs text-neutral-500">
                  Prospective partners applying for territorial franchise licenses
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E5DACB] overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F3EC] text-[#695A51] uppercase font-bold text-[10px] border-b">
                    <tr>
                      <th className="p-3">Candidate</th>
                      <th className="p-3">Target Market</th>
                      <th className="p-3">Format & Capital</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2ECE3]">
                    {inquiries.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-neutral-400">
                          No inquiries received yet. Submit one from the Franchise Hub!
                        </td>
                      </tr>
                    ) : (
                      inquiries.map((inq) => (
                        <tr key={inq.id || inq.email} className="hover:bg-[#FAF7F2]">
                          <td className="p-3">
                            <div className="font-bold text-[#1C1817]">{inq.full_name}</div>
                            <div className="text-[10px] text-neutral-400">
                              Exp: {inq.previous_experience || "N/A"}
                            </div>
                          </td>
                          <td className="p-3 font-semibold">
                            {inq.city}, {inq.country}
                          </td>
                          <td className="p-3">
                            <div className="text-[#C85A2B] font-bold text-[10px] uppercase">
                              {inq.model_type?.replace(/_/g, " ")}
                            </div>
                            <div className="font-mono text-[11px] text-[#1C1817]">
                              {inq.investment_capital}
                            </div>
                          </td>
                          <td className="p-3 text-[11px]">
                            <div>{inq.email}</div>
                            <div className="text-neutral-400">{inq.phone}</div>
                          </td>
                          <td className="p-3">
                            <select
                              value={inq.status || "new"}
                              onChange={async (e) => {
                                if (inq.id) {
                                  await updateInquiryStatus(inq.id, e.target.value);
                                  await loadAllData();
                                }
                              }}
                              className="px-2 py-1 rounded bg-[#F7F3EC] border text-[10px] font-bold uppercase"
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

          {/* STORES TAB */}
          {activeTab === "stores" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-bold text-[#1C1817]">Global Cafés Directory</h4>
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
                      <th className="p-3">Store Name</th>
                      <th className="p-3">City & Region</th>
                      <th className="p-3">Operating Hours</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2ECE3]">
                    {stores.map((s) => (
                      <tr key={s.id} className="hover:bg-[#FAF7F2]">
                        <td className="p-3 font-bold text-[#1C1817]">
                          {s.name}{" "}
                          {s.is_flagship && (
                            <span className="text-[9px] bg-[#C85A2B] text-white px-2 py-0.5 rounded-full ml-1">
                              Flagship
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          {s.city}, {s.country} ({s.region})
                        </td>
                        <td className="p-3">{s.hours}</td>
                        <td className="p-3 text-right space-x-2">
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
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-[#1C1817]">Customer Roastery Orders</h4>
                <p className="text-xs text-neutral-500">Live order dispatch queue from the website</p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E5DACB] overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F3EC] text-[#695A51] uppercase font-bold text-[10px] border-b">
                    <tr>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Total Amount</th>
                      <th className="p-3">Shipping Country</th>
                      <th className="p-3">Items Count</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2ECE3]">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-neutral-400">
                          No orders placed yet. Place a test order through the Cart Drawer!
                        </td>
                      </tr>
                    ) : (
                      orders.map((ord, idx) => (
                        <tr key={idx} className="hover:bg-[#FAF7F2]">
                          <td className="p-3 font-bold text-[#1C1817]">
                            {ord.customer_name}
                            <div className="text-[10px] text-neutral-400 font-normal">
                              {ord.customer_email}
                            </div>
                          </td>
                          <td className="p-3 font-mono font-bold text-[#C85A2B]">
                            ${ord.total_amount?.toFixed(2)}
                          </td>
                          <td className="p-3">{ord.shipping_country}</td>
                          <td className="p-3 font-mono">{ord.items?.length || 1} items</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                              {ord.status || "Processing"}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
