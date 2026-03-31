"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/useCart";
import { useState } from "react";
import { Check, Plus } from "lucide-react";

interface ProductCardProps {
  id: any;
  slug: string;
  name: string;
  price: number;
  images: string[];
  tags: string[];
}

export default function ProductCard({ id, slug, name, price, images, tags }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const imagePath = images[0] ? `/assets/images/${decodeURIComponent(images[0]).split(/[??]/)[0].split('/').pop()?.replace(/\.(jpg|jpeg|png)$/i, '.webp') || 'placeholder.webp'}` : '/assets/images/placeholder.webp';

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: String(id),
      slug,
      name,
      price,
      image: imagePath,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link href={`/products/${slug}`} className="group flex flex-col h-full animate-float" style={{ animationDelay: `${(Number(id) % 3) * 0.5}s` }}>
      <div className="relative aspect-[4/5] bg-[#FDFBF7] mb-6 overflow-hidden rounded-sm border border-[#2A2A2A]/5 group-hover:border-[#E07A5F]/20 transition-all duration-700">
        <Image 
          src={imagePath} 
          alt={name} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Benefit Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {tags.map((tag) => (
            <span key={tag} className="bg-white/95 backdrop-blur-sm text-[9px] font-bold uppercase tracking-[0.1em] px-2.5 py-1.5 rounded-sm text-[#2A2A2A] shadow-sm">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
          <button 
            onClick={handleAdd}
            className="w-full py-4 bg-white/95 backdrop-blur-md text-[#2A2A2A] text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center justify-center gap-2"
          >
            {added ? <><Check size={14} className="text-[#8A9A86]" /> Added</> : <><Plus size={14} /> Quick Add</>}
          </button>
        </div>
      </div>
      
      <div className="flex-grow flex flex-col justify-between px-1">
        <div>
          <h3 className="text-xl font-heading mb-1.5 group-hover:text-[#E07A5F] transition-colors leading-tight">{name}</h3>
          <p className="text-[13px] font-medium text-[#2A2A2A]/50 tracking-wider">€{price.toFixed(2)}</p>
        </div>
        <div className="mt-5 border-t border-[#2A2A2A]/5 pt-4">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#2A2A2A]/40 group-hover:text-[#E07A5F] transition-colors flex items-center gap-2">
            View Details <Plus size={10} strokeWidth={3} />
          </span>
        </div>
      </div>
    </Link>
  );
}
