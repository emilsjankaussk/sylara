"use client";

import { useCart } from "@/store/useCart";
import Image from "next/image";
import { Sparkles, ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function CartUpsell() {
  const { items, addItem } = useCart();
  
  // Logic: if cart has a cleanser, upsell a serum. If it has a serum, upsell a moisturizer.
  // For demo, we'll just show some products with a discount tag.
  
  const upsellProducts = [
    {
      id: "up-serum-1",
      slug: "hydrating-serum",
      name: "Bio-Active Hydrating Serum",
      price: 45,
      image: "/assets/images/gen2.webp",
      benefit: "Pairs perfectly with your ritual",
      discountCode: "RITUAL10"
    },
    {
      id: "up-pads-1",
      slug: "bamboo-ritual-pads",
      name: "Bamboo Ritual Pads",
      price: 12,
      image: "/assets/images/RcUnk7vYXMOjbeABmG-hm1-YwDvaYfAW.webp",
      benefit: "Eco-friendly application",
      discountCode: "RITUAL10"
    }
  ];

  // Filter out products already in cart
  const availableUpsells = upsellProducts.filter(up => !items.find(item => item.slug === up.slug));

  if (availableUpsells.length === 0) return null;

  return (
    <div className="mt-12 bg-white p-8 border border-[#E07A5F]/20 rounded-sm shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles size={20} className="text-[#E07A5F]" />
        <h3 className="text-xl font-heading">Complete Your Ritual</h3>
      </div>
      
      <p className="text-sm text-[#2A2A2A]/60 mb-8 font-body">Add one of these pairings to your bag and receive an extra <span className="text-[#E07A5F] font-bold">10% OFF</span> your entire order with code: <span className="bg-[#E07A5F]/10 px-2 py-0.5 rounded text-[#E07A5F] font-bold">RITUAL10</span></p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {availableUpsells.map((up) => (
          <div key={up.id} className="flex gap-4 group items-center">
            <div className="relative w-20 h-24 bg-[#FDFBF7] flex-shrink-0 rounded-sm overflow-hidden border border-[#2A2A2A]/5">
              <Image src={up.image} alt={up.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="flex-grow">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#8A9A86] mb-1 block">{up.benefit}</span>
              <h4 className="text-sm font-heading mb-2 leading-tight">{up.name}</h4>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-sm">€{(up.price * 0.9).toFixed(2)} <span className="text-[10px] line-through text-[#2A2A2A]/30 ml-1">€{up.price.toFixed(2)}</span></span>
                <button 
                  onClick={() => addItem({ ...up, price: up.price * 0.9, quantity: 1 })}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E07A5F] border-b border-[#E07A5F]/30 pb-0.5 hover:border-[#E07A5F] transition-all"
                >
                  + Add to Bag
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
