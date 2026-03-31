"use client";

import { useCart } from "@/store/useCart";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface SideCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideCart({ isOpen, onClose }: SideCartProps) {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const total = getTotalPrice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          
          {/* Cart Panel */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FDFBF7] shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#2A2A2A]/5 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} />
                <h2 className="text-xl font-heading tracking-tight">Your Ritual Bag ({items.length})</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-[#FDFBF7] rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto p-6 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-[#FDFBF7] rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag size={30} className="text-[#2A2A2A]/20" strokeWidth={1} />
                  </div>
                  <p className="text-[#2A2A2A]/40 font-medium text-sm mb-8 uppercase tracking-widest">Bag is currently empty</p>
                  <button 
                    onClick={onClose}
                    className="px-8 py-4 bg-[#2A2A2A] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-[#E07A5F] transition-all"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group relative">
                    <div className="relative w-24 h-32 bg-[#FDFBF7] flex-shrink-0 rounded-sm overflow-hidden border border-[#2A2A2A]/5">
                      <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1 pr-8">
                          <h3 className="text-base font-heading leading-tight">{item.name}</h3>
                        </div>
                        {item.isSubscription && (
                          <p className="text-[9px] font-bold uppercase tracking-widest text-[#E07A5F] flex items-center gap-1 mt-1">
                            <Calendar size={10} /> Every {item.frequency}
                          </p>
                        )}
                        <button 
                          onClick={() => removeItem(item.isSubscription ? `${item.id}-${item.frequency}` : item.id)} 
                          className="text-[#2A2A2A]/20 hover:text-[#E07A5F] transition-colors absolute top-0 right-0 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                        <p className="text-[12px] font-medium text-[#2A2A2A]/50 tracking-wider mb-4">€{item.price.toFixed(2)}</p>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-[#2A2A2A]/10 bg-white rounded-sm h-8">
                            <button 
                              onClick={() => updateQuantity(item.isSubscription ? `${item.id}-${item.frequency}` : item.id, item.quantity - 1)}
                              className="px-2 hover:text-[#E07A5F]"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-2 text-[11px] font-bold min-w-[1.5rem] text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.isSubscription ? `${item.id}-${item.frequency}` : item.id, item.quantity + 1)}
                              className="px-2 hover:text-[#E07A5F]"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 border-t border-[#2A2A2A]/5 bg-white space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold uppercase tracking-widest text-[#2A2A2A]/40">Subtotal</span>
                  <span className="text-2xl font-heading">€{total.toFixed(2)}</span>
                </div>
                
                {total < 50 ? (
                  <p className="text-[10px] text-center text-[#E07A5F] uppercase tracking-widest font-bold">
                    Add €{(50 - total).toFixed(2)} more for Free Shipping
                  </p>
                ) : (
                  <p className="text-[10px] text-center text-[#8A9A86] uppercase tracking-widest font-bold">
                    ✨ You&apos;ve unlocked Free Shipping!
                  </p>
                )}

                <div className="space-y-3">
                  <Link 
                    href="/cart" 
                    onClick={onClose}
                    className="block w-full py-5 border border-[#2A2A2A] text-[#2A2A2A] text-center text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#2A2A2A]/5 transition-all rounded-sm shadow-sm"
                  >
                    View Shopping Bag
                  </Link>
                  <button 
                    className="w-full py-5 bg-[#2A2A2A] text-white text-center text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#E07A5F] transition-all rounded-sm shadow-xl hover:shadow-[#E07A5F]/20 flex items-center justify-center gap-2 group"
                  >
                    Checkout <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                <div className="flex items-center justify-center gap-3 text-[9px] font-bold uppercase tracking-widest text-[#8A9A86] pt-2">
                  <ShieldCheck size={14} strokeWidth={2.5} /> Secure EU Checkout
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
