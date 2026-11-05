"use client";

import React, { useState } from "react";
import { CartItem } from "@/types";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import confetti from "canvas-confetti";
import { createOrder } from "@/lib/supabase";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "checkout" | "success">("cart");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCountry, setShippingCountry] = useState("Japan");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderRef, setOrderRef] = useState("");

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 9.50;
  const total = subtotal + shipping;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderPayload = {
        customer_name: customerName,
        customer_email: customerEmail,
        total_amount: total,
        shipping_country: shippingCountry,
        shipping_address: shippingAddress,
        items: items.map((i) => ({
          id: i.product.id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
          grindOption: i.grindOption || "Whole Bean",
        })),
      };

      const res = await createOrder(orderPayload);
      if (res.success) {
        setOrderRef(res.id || `PP-${Math.floor(100000 + Math.random() * 900000)}`);
        setCheckoutStep("success");
        onClearCart();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#C85A2B", "#DF9E51", "#1C1817"],
        });
      }
    } catch (err) {
      console.error("Order error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in">
      <div className="bg-[#F7F3EC] w-full max-w-md h-full flex flex-col justify-between shadow-2xl border-l border-[#E7DFD3] animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-6 bg-white border-b border-[#E7DFD3] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#C85A2B]" />
            <h3 className="font-extrabold text-base uppercase tracking-wider text-[#1C1817]">
              {checkoutStep === "cart" && `Roastery Bag (${items.reduce((acc, i) => acc + i.quantity, 0)})`}
              {checkoutStep === "checkout" && "Direct Roastery Checkout"}
              {checkoutStep === "success" && "Order Confirmed"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F7F3EC] text-[#1C1817] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {checkoutStep === "cart" && (
            <>
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                  <div className="w-16 h-16 rounded-full bg-[#EAE0D1] flex items-center justify-center text-[#73655C]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-[#1C1817]">Your Bag is Empty</h4>
                    <p className="text-xs text-neutral-500 max-w-xs">
                      Explore our 1. GRIND, 2. POUR, 3. SIP catalog or find your custom single-origin roast.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-white p-4 rounded-2xl border border-[#E7DFD3] shadow-sm flex space-x-3 items-center"
                    >
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover bg-[#F7F3EC] flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="text-xs font-bold text-[#1C1817] truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[10px] text-[#C85A2B] font-mono">
                          {item.grindOption || "Whole Bean"}
                        </div>
                        <div className="text-xs font-black text-[#1C1817] font-mono">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex items-center space-x-1.5 bg-[#F7F3EC] px-2 py-1 rounded-full border border-[#E0D5C5]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-neutral-600 hover:text-black"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold font-mono px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-neutral-600 hover:text-black"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1 text-neutral-400 hover:text-red-500"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {checkoutStep === "checkout" && (
            <form onSubmit={handleCheckoutSubmit} id="checkout-form" className="space-y-4">
              <div className="text-xs font-bold text-[#1C1817] uppercase tracking-wider border-b pb-2">
                Shipping Destination & Dispatch
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1817] mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Kenji Takahashi"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C2] text-xs focus:outline-none focus:border-[#C85A2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1817] mb-1">Email (for Tracking)</label>
                <input
                  required
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C2] text-xs focus:outline-none focus:border-[#C85A2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1817] mb-1">Country</label>
                <select
                  value={shippingCountry}
                  onChange={(e) => setShippingCountry(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C2] text-xs focus:outline-none focus:border-[#C85A2B]"
                >
                  <option value="Japan">Japan (Tokyo Roastery Hub)</option>
                  <option value="United States">United States (Soho Foundry)</option>
                  <option value="United Kingdom">United Kingdom (Shoreditch Hub)</option>
                  <option value="Italy">Italy (Milan Atelier)</option>
                  <option value="Kenya">Kenya (Nairobi Reserve)</option>
                  <option value="United Arab Emirates">United Arab Emirates (Dubai DIFC)</option>
                  <option value="Australia">Australia (Sydney Roastery)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1817] mb-1">Street Address</label>
                <textarea
                  required
                  rows={2}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Full street address, apartment / suite, postal code..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C2] text-xs focus:outline-none focus:border-[#C85A2B]"
                />
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E7DFD3] text-[11px] text-[#695A51] flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Orders are freshly dispatched in nitrogen-sealed valved pouches.</span>
              </div>
            </form>
          )}

          {checkoutStep === "success" && (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
              <h4 className="text-xl font-bold text-[#1C1817]">Harvest Order Dispatched</h4>
              <p className="text-xs text-[#635750] max-w-xs mx-auto">
                Thank you, <span className="font-bold text-[#1C1817]">{customerName}</span>. Your order{" "}
                <span className="font-mono font-bold text-[#C85A2B]">#{orderRef}</span> has been logged directly into our global roastery production queue.
              </p>
              <button
                onClick={() => {
                  setCheckoutStep("cart");
                  onClose();
                }}
                className="mt-6 px-6 py-2.5 rounded-full bg-[#1C1817] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#C85A2B] transition-colors"
              >
                Back To Roastery
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {checkoutStep !== "success" && items.length > 0 && (
          <div className="p-6 bg-white border-t border-[#E7DFD3] space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#695A51]">
                <span>Roastery Subtotal</span>
                <span className="font-mono text-[#1C1817]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#695A51]">
                <span>Global Express Dispatch</span>
                <span className="font-mono text-[#1C1817]">
                  {shipping === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE (Over $75)</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#1C1817] pt-2 border-t">
                <span>Total Due</span>
                <span className="font-mono text-[#C85A2B] text-base">${total.toFixed(2)} USD</span>
              </div>
            </div>

            {checkoutStep === "cart" ? (
              <button
                onClick={() => setCheckoutStep("checkout")}
                className="w-full py-3.5 rounded-full bg-[#1C1817] hover:bg-[#C85A2B] text-white font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>Proceed To Roastery Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep("cart")}
                  className="px-4 py-3 rounded-full border border-[#DDD3C2] text-xs font-bold text-[#1C1817] hover:bg-[#F7F3EC]"
                >
                  Back
                </button>
                <button
                  form="checkout-form"
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-full bg-[#C85A2B] hover:bg-[#B34D21] text-white font-bold text-xs uppercase tracking-widest shadow transition-all flex items-center justify-center space-x-1"
                >
                  {isSubmitting ? (
                    <span>Logging Order...</span>
                  ) : (
                    <span>Confirm Order · ${total.toFixed(2)}</span>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
