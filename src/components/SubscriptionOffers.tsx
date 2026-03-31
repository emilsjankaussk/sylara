"use client";

import { useCart } from "@/store/useCart";
import { useState } from "react";
import { Check, ShoppingBag, Calendar, Sparkles } from "lucide-react";

interface SubscriptionOffersProps {
  product: any;
}

export default function SubscriptionOffers({ product }: SubscriptionOffersProps) {
  const { addItem } = useCart();
  const [purchaseType, setPurchaseType] = useState<"one-time" | "subscription">("one-time");
  const [frequency, setFrequency] = useState("30 days");
  const [added, setAdded] = useState(false);

  const imagePath = product.images[0] 
    ? `/assets/images/${decodeURIComponent(product.images[0]).split(/[??]/)[0].split('/').pop()?.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`
    : '/assets/images/placeholder.webp';

  const subscriptionDiscount = 0.15; // 15% OFF
  const subscriptionPrice = product.price * (1 - subscriptionDiscount);

  const handleAddToCart = () => {
    if (purchaseType === "one-time") {
      addItem({
        id: String(product.id),
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: imagePath,
      });
    } else {
      addItem({
        id: String(product.id),
        slug: product.slug,
        name: `${product.name} (Subscription)`,
        price: subscriptionPrice,
        image: imagePath,
        isSubscription: true,
        frequency: frequency,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-col gap-3">
        {/* One-time Purchase */}
        <button 
          onClick={() => setPurchaseType("one-time")}
          className={`flex items-center justify-between p-4 border rounded-sm transition-all text-left ${purchaseType === "one-time" ? 'border-[#2A2A2A] bg-white shadow-sm' : 'border-[#2A2A2A]/10 bg-transparent opacity-60'}`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${purchaseType === "one-time" ? 'border-[#2A2A2A]' : 'border-[#2A2A2A]/20'}`}>
              {purchaseType === "one-time" && <div className="w-2 h-2 bg-[#2A2A2A] rounded-full" />}
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider">One-time purchase</span>
          </div>
          <span className="text-sm font-bold">€{product.price.toFixed(2)}</span>
        </button>

        {/* Subscription Purchase */}
        <div 
          onClick={() => setPurchaseType("subscription")}
          className={`flex flex-col p-4 border rounded-sm transition-all cursor-pointer ${purchaseType === "subscription" ? 'border-[#E07A5F] bg-[#E07A5F]/5 shadow-sm' : 'border-[#2A2A2A]/10 bg-transparent opacity-60'}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${purchaseType === "subscription" ? 'border-[#E07A5F]' : 'border-[#2A2A2A]/20'}`}>
                {purchaseType === "subscription" && <div className="w-2 h-2 bg-[#E07A5F] rounded-full" />}
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider">Subscribe & Save (15%)</span>
                <span className="text-[9px] uppercase tracking-widest text-[#E07A5F] font-bold flex items-center gap-1">
                  <Sparkles size={10} fill="currentColor" /> Best for consistency
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-[#E07A5F]">€{subscriptionPrice.toFixed(2)}</span>
              <span className="block text-[10px] text-[#2A2A2A]/40 line-through">€{product.price.toFixed(2)}</span>
            </div>
          </div>

          {purchaseType === "subscription" && (
            <div className="pt-4 border-t border-[#E07A5F]/10">
              <label className="text-[9px] font-bold uppercase tracking-widest text-[#2A2A2A]/40 block mb-2">Delivery Frequency</label>
              <select 
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full bg-white border border-[#2A2A2A]/10 p-2 text-xs focus:outline-none focus:border-[#E07A5F] rounded-sm"
              >
                <option value="30 days">Every 30 Days (Recommended)</option>
                <option value="45 days">Every 45 Days</option>
                <option value="60 days">Every 60 Days</option>
                <option value="90 days">Every 90 Days</option>
              </select>
              <ul className="mt-4 space-y-1">
                <li className="text-[9px] text-[#2A2A2A]/60 flex items-center gap-2">
                  <Check size={10} className="text-[#8A9A86]" /> Free shipping on all subscription orders
                </li>
                <li className="text-[9px] text-[#2A2A2A]/60 flex items-center gap-2">
                  <Check size={10} className="text-[#8A9A86]" /> Pause or cancel anytime
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <button 
        onClick={handleAddToCart}
        className={`w-full py-5 uppercase tracking-[0.25em] text-[11px] font-bold transition-all duration-500 rounded-sm flex items-center justify-center gap-3 shadow-xl ${added ? 'bg-[#8A9A86] text-white shadow-[#8A9A86]/20' : 'bg-[#2A2A2A] text-white hover:bg-[#E07A5F] hover:shadow-[#E07A5F]/20'}`}
      >
        {added ? <><Check size={18} /> Added to Bag</> : <><ShoppingBag size={18} strokeWidth={1.5} /> {purchaseType === "subscription" ? "Start Subscription" : "Add to Bag"}</>}
      </button>
    </div>
  );
}
