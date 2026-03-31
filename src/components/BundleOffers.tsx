"use client";

import { useCart } from "@/store/useCart";
import { useState } from "react";
import { Check, ShoppingBag, Zap } from "lucide-react";

interface BundleOffersProps {
  product: any;
}

export default function BundleOffers({ product }: BundleOffersProps) {
  const { addItem } = useCart();
  const [addedLabel, setAddedLabel] = useState<string | null>(null);

  const handleAddBundle = (quantity: number, discount: number, label: string) => {
    const imagePath = product.images[0] 
      ? `/assets/images/${decodeURIComponent(product.images[0]).split(/[??]/)[0].split('/').pop()?.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`
      : '/assets/images/placeholder.webp';

    const discountedPrice = product.price * (1 - discount / 100);

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: `${product.id}-${label}-${i}`, // Unique ID for bundle items if needed, or just same ID
        slug: product.slug,
        name: `${product.name} (${label})`,
        price: discountedPrice,
        image: imagePath,
      });
    }
    setAddedLabel(label);
    setTimeout(() => setAddedLabel(null), 2000);
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Zap size={16} className="text-[#E07A5F]" fill="#E07A5F" />
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2A2A2A]">Bundle & Save</span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {/* Buy 2 Offer */}
        <button 
          onClick={() => handleAddBundle(2, 10, "Duo Pack")}
          className={`flex items-center justify-between p-4 border rounded-sm transition-all text-left group ${addedLabel === "Duo Pack" ? 'bg-[#8A9A86] border-[#8A9A86]' : 'bg-white border-[#2A2A2A]/10 hover:border-[#E07A5F]'}`}
        >
          <div className="flex flex-col">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${addedLabel === "Duo Pack" ? 'text-white' : 'text-[#2A2A2A]'}`}>Buy 2 Rituals</span>
            <span className={`text-[10px] uppercase tracking-widest ${addedLabel === "Duo Pack" ? 'text-white/80' : 'text-[#2A2A2A]/40'}`}>Save 10% Instantly</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-bold ${addedLabel === "Duo Pack" ? 'text-white' : 'text-[#E07A5F]'}`}>€{(product.price * 2 * 0.9).toFixed(2)}</span>
            {addedLabel === "Duo Pack" ? <Check size={16} className="text-white" /> : <ShoppingBag size={16} className="text-[#2A2A2A]/20 group-hover:text-[#E07A5F]" />}
          </div>
        </button>

        {/* Buy 3 Offer */}
        <button 
          onClick={() => handleAddBundle(3, 20, "Family Ritual")}
          className={`flex items-center justify-between p-4 border rounded-sm transition-all text-left group relative overflow-hidden ${addedLabel === "Family Ritual" ? 'bg-[#8A9A86] border-[#8A9A86]' : 'bg-white border-[#2A2A2A]/10 hover:border-[#E07A5F]'}`}
        >
          <div className="absolute top-0 right-0 bg-[#E07A5F] text-white text-[8px] font-bold px-2 py-0.5 uppercase tracking-tighter rounded-bl-sm">Best Value</div>
          <div className="flex flex-col">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${addedLabel === "Family Ritual" ? 'text-white' : 'text-[#2A2A2A]'}`}>Buy 3 Rituals</span>
            <span className={`text-[10px] uppercase tracking-widest ${addedLabel === "Family Ritual" ? 'text-white/80' : 'text-[#2A2A2A]/40'}`}>Save 20% Instantly</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-bold ${addedLabel === "Family Ritual" ? 'text-white' : 'text-[#E07A5F]'}`}>€{(product.price * 3 * 0.8).toFixed(2)}</span>
            {addedLabel === "Family Ritual" ? <Check size={16} className="text-white" /> : <ShoppingBag size={16} className="text-[#2A2A2A]/20 group-hover:text-[#E07A5F]" />}
          </div>
        </button>
      </div>
    </div>
  );
}
