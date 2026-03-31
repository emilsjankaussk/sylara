"use client";

import { useCart } from "@/store/useCart";
import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";

export default function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: String(product.id),
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0] 
        ? `/assets/images/${decodeURIComponent(product.images[0]).split(/[??]/)[0].split('/').pop()?.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`
        : '/assets/images/placeholder.webp',
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button 
      onClick={handleAdd}
      className={`w-full py-5 uppercase tracking-[0.25em] text-[11px] font-bold transition-all duration-500 rounded-sm flex items-center justify-center gap-3 shadow-xl ${added ? 'bg-[#8A9A86] text-white shadow-[#8A9A86]/20' : 'bg-[#2A2A2A] text-white hover:bg-[#E07A5F] hover:shadow-[#E07A5F]/20'}`}
    >
      {added ? (
        <><Check size={18} /> Added to Bag</>
      ) : (
        <><ShoppingBag size={18} strokeWidth={1.5} /> Add to Bag</>
      )}
    </button>
  );
}
