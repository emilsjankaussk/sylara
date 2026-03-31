"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import { useCart } from "@/store/useCart";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CartUpsell from "@/components/CartUpsell";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, addItem } = useCart();
  const [mounted, setMounted] = useState(false);

  // Demo Upsells
  const upsells = [
    {
      id: "up-1",
      slug: "premium-bamboo-pads",
      name: "Bamboo Ritual Pads",
      price: 12,
      image: "/assets/images/gen2.webp",
      benefit: "Eco-friendly cleanse"
    },
    {
      id: "up-2",
      slug: "travel-serum-mini",
      name: "Mini Glow Serum",
      price: 18,
      image: "/assets/images/RcUnk7vYXMOjbeABmG-hm1-YwDvaYfAW.webp",
      benefit: "Travel-ready hydration"
    }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = getTotalPrice();
  const freeShippingThreshold = 50;
  const progressToFreeShipping = Math.min((total / freeShippingThreshold) * 100, 100);

  return (
    <main className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <TrustBar />
      <Header />
      
      <section className="py-20 flex-grow">
        <div className="container-normal px-4">
          <div className="flex items-center gap-4 mb-16">
            <h1 className="text-4xl md:text-5xl font-heading">Your Ritual Bag</h1>
            <span className="h-[1px] flex-grow bg-[#2A2A2A]/10 mt-2"></span>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#2A2A2A]/40 mt-2">({items.length} Items)</span>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-32 bg-white border border-[#2A2A2A]/5 rounded-sm shadow-sm">
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 bg-[#FDFBF7] rounded-full flex items-center justify-center">
                  <ShoppingBag size={40} className="text-[#2A2A2A]/20" strokeWidth={1} />
                </div>
              </div>
              <h2 className="text-2xl font-heading mb-4">Your bag is empty</h2>
              <p className="text-[#2A2A2A]/50 mb-10 max-w-sm mx-auto">Start your skin journey by exploring our curated collections of botanical formulas.</p>
              <Link href="/collections/all" className="inline-flex items-center gap-3 px-10 py-5 bg-[#2A2A2A] text-white uppercase tracking-[0.2em] text-[11px] font-bold hover:bg-[#E07A5F] transition-all duration-500 rounded-sm">
                Explore Collection <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Cart Items */}
              <div className="lg:col-span-8">
                <div className="bg-white border-y border-[#2A2A2A]/5 px-0 mb-10">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="flex flex-col sm:flex-row gap-8 py-10 border-b border-[#2A2A2A]/5 last:border-0 group"
                      >
                        <div className="relative w-full sm:w-40 aspect-[4/5] bg-[#FDFBF7] flex-shrink-0 overflow-hidden rounded-sm border border-[#2A2A2A]/5">
                          <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="flex-grow flex flex-col justify-between py-1">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <Link href={`/products/${item.slug}`} className="text-2xl font-heading hover:text-[#E07A5F] transition-colors leading-tight">
                                  {item.name}
                                </Link>
                                {item.isSubscription ? (
                                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#E07A5F] mt-2 flex items-center gap-2">
                                    <Calendar size={12} /> Recurring Ritual • Every {item.frequency}
                                  </p>
                                ) : (
                                  <p className="text-[12px] font-bold uppercase tracking-widest text-[#2A2A2A]/40 mt-2">Bioactive Formula</p>
                                )}
                              </div>
                              <button onClick={() => removeItem(item.isSubscription ? `${item.id}-${item.frequency}` : item.id)} className="text-[#2A2A2A]/20 hover:text-[#E07A5F] transition-colors p-1">
                                <Trash2 size={20} strokeWidth={1.5} />
                              </button>
                            </div>
                            <div className="flex items-center gap-6 mt-8">
                              <div className="flex items-center border border-[#2A2A2A]/10 bg-[#FDFBF7] rounded-sm">
                                <button 
                                  onClick={() => updateQuantity(item.isSubscription ? `${item.id}-${item.frequency}` : item.id, item.quantity - 1)}
                                  className="p-3 hover:text-[#E07A5F] transition-colors"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="px-4 text-xs font-bold font-body min-w-[3rem] text-center border-x border-[#2A2A2A]/10">
                                  {item.quantity}
                                </span>
                                <button 
                                  onClick={() => updateQuantity(item.isSubscription ? `${item.id}-${item.frequency}` : item.id, item.quantity + 1)}
                                  className="p-3 hover:text-[#E07A5F] transition-colors"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                              <span className="text-lg font-medium">€{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Upsells Section */}
                <CartUpsell />
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4">
                <div className="sticky top-32">
                  <div className="bg-white p-10 border border-[#2A2A2A]/5 rounded-sm shadow-sm relative overflow-hidden">
                    {/* Free Shipping Progress */}
                    <div className="mb-10 p-5 bg-[#8A9A86]/5 border border-[#8A9A86]/10 rounded-sm">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                          <Truck size={14} /> 
                          {total >= freeShippingThreshold ? "Free Shipping Unlocked" : `€${(freeShippingThreshold - total).toFixed(2)} away from Free Shipping`}
                        </span>
                      </div>
                      <div className="h-1 bg-white rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progressToFreeShipping}%` }}
                          className="h-full bg-[#8A9A86]"
                        />
                      </div>
                    </div>

                    <h2 className="text-3xl font-heading mb-10">Summary</h2>
                    <div className="space-y-6 mb-10">
                      <div className="flex justify-between text-[#2A2A2A]/60 font-body">
                        <span className="text-sm">Subtotal</span>
                        <span className="font-medium">€{total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-[#2A2A2A]/60 font-body">
                        <span className="text-sm">Standard Shipping</span>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${total >= freeShippingThreshold ? 'text-[#8A9A86]' : 'text-[#2A2A2A]/40'}`}>
                          {total >= freeShippingThreshold ? "FREE" : "€4.95 (Spend €50+ for FREE)"}
                        </span>
                      </div>
                      <div className="pt-6 border-t border-[#2A2A2A]/10 flex justify-between items-end">
                        <span className="text-xl font-heading">Total</span>
                        <div className="text-right">
                          <span className="text-3xl font-medium block">€{total.toFixed(2)}</span>
                          <span className="text-[10px] text-[#2A2A2A]/40 uppercase tracking-widest">VAT Included</span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full py-6 bg-[#2A2A2A] text-white uppercase tracking-[0.25em] text-[11px] font-bold hover:bg-[#E07A5F] transition-all duration-500 shadow-xl hover:shadow-[#E07A5F]/20 flex items-center justify-center gap-3 group">
                      Proceed to Checkout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="mt-10 flex flex-col gap-4">
                      <div className="flex items-center gap-3 text-[#2A2A2A]/50 text-[11px] font-medium uppercase tracking-widest">
                        <ShieldCheck size={16} className="text-[#8A9A86]" strokeWidth={2} /> 
                        Secure Checkout Guaranteed
                      </div>
                      <div className="flex items-center gap-3 text-[#2A2A2A]/50 text-[11px] font-medium uppercase tracking-widest">
                        <Truck size={16} className="text-[#8A9A86]" strokeWidth={2} /> 
                        Fast EU-Wide Delivery
                      </div>
                    </div>

                    {/* Upsell demo at checkout footer */}
                    <div className="mt-10 pt-10 border-t border-[#2A2A2A]/5">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-[#2A2A2A]/40 mb-4 font-bold text-center">We Accept</p>
                      <div className="flex justify-center gap-4 opacity-30 grayscale">
                        {/* Mock icons */}
                        <div className="w-8 h-5 bg-[#2A2A2A]/20 rounded-sm"></div>
                        <div className="w-8 h-5 bg-[#2A2A2A]/20 rounded-sm"></div>
                        <div className="w-8 h-5 bg-[#2A2A2A]/20 rounded-sm"></div>
                        <div className="w-8 h-5 bg-[#2A2A2A]/20 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
