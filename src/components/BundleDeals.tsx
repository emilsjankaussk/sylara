"use client";

import Image from "next/image";
import { useCart } from "@/store/useCart";
import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";

export default function BundleDeals() {
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const bundles = [
    {
      id: "bundle-1",
      slug: "am-glow-kit",
      name: "AM Glow Kit",
      description: "Vitamin C Serum + Daily Moisturizer + Sunscreen",
      originalPrice: 115,
      price: 89,
      image: "/assets/images/gen2.webp",
      color: "bg-[#FDFBF7]",
      tags: ["Radiance", "Daily Protection"]
    },
    {
      id: "bundle-2",
      slug: "complete-skin-reset",
      name: "Complete Skin Reset",
      description: "Cleanser + Toner + AM/PM Serums + Moisturizer",
      originalPrice: 195,
      price: 145,
      image: "/assets/images/RcUnk7vYXMOjbeABmG-hm1-YwDvaYfAW.webp",
      color: "bg-[#8A9A86]/5",
      tags: ["Full Routine", "Best Value"]
    },
    {
      id: "bundle-3",
      slug: "pm-repair-kit",
      name: "PM Repair Kit",
      description: "Gentle Cleanser + Retinol Serum + Night Cream",
      originalPrice: 125,
      price: 95,
      image: "/assets/images/gen2.webp",
      color: "bg-[#E07A5F]/5",
      tags: ["Overnight Repair", "Anti-Aging"]
    }
  ];

  const handleAdd = (bundle: any) => {
    addItem({
      id: bundle.id,
      slug: bundle.slug,
      name: bundle.name,
      price: bundle.price,
      image: bundle.image,
    });
    setAddedId(bundle.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <section className="py-32 bg-white border-y border-[#2A2A2A]/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8A9A86]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E07A5F]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="container-normal px-4 relative z-10">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <span className="text-[#E07A5F] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Limited Edition</span>
          <h2 className="mb-6 text-5xl font-heading">Curated Routines.</h2>
          <p className="text-[#2A2A2A]/60 text-lg leading-relaxed">Expertly paired formulas designed to work in synergy. Shop our bundles and save up to 25% on your ritual.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {bundles.map((bundle) => (
            <div key={bundle.id} className={`${bundle.color} rounded-sm p-8 flex flex-col h-full border border-[#2A2A2A]/10 hover:shadow-2xl hover:shadow-[#2A2A2A]/5 transition-all duration-700 group`}>
              <div className="relative aspect-square mb-10 mix-blend-multiply overflow-hidden rounded-sm bg-white/50">
                <Image src={bundle.image} alt={bundle.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {bundle.tags.map(tag => (
                    <span key={tag} className="bg-white/90 backdrop-blur-sm text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-heading leading-tight">{bundle.name}</h3>
                  <div className="text-right">
                    <span className="text-xl font-medium block">€{bundle.price}</span>
                    <span className="text-xs text-[#2A2A2A]/40 line-through">€{bundle.originalPrice}</span>
                  </div>
                </div>
                <p className="text-[14px] leading-relaxed text-[#2A2A2A]/70 mb-8 flex-grow">{bundle.description}</p>
                <div className="flex items-center gap-2 mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] bg-[#2A2A2A] text-white px-3 py-1.5 rounded-sm">
                    Save €{bundle.originalPrice - bundle.price}
                  </span>
                </div>
                <button 
                  onClick={() => handleAdd(bundle)}
                  className={`w-full py-5 uppercase tracking-[0.2em] text-[10px] font-bold transition-all duration-500 rounded-sm flex items-center justify-center gap-3 ${addedId === bundle.id ? 'bg-[#8A9A86] text-white shadow-lg' : 'bg-[#2A2A2A] text-white hover:bg-[#E07A5F] shadow-xl hover:shadow-[#E07A5F]/20'}`}
                >
                  {addedId === bundle.id ? <><Check size={16} /> Added to Bag</> : <><ShoppingBag size={16} strokeWidth={1.5} /> Add Bundle to Bag</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ShoppingBag } from "lucide-react";
