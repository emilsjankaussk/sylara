"use client";

import Link from "next/link";
import { useCart } from "@/store/useCart";
import { useEffect, useState } from "react";
import { ShoppingBag, Search, Menu } from "lucide-react";
import SideCart from "./SideCart";

export default function Header() {
  const { getTotalItems } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = mounted ? getTotalItems() : 0;

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#2A2A2A]/5">
        <div className="container-normal px-4 h-20 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex-1">
            <button className="p-2 -ml-2">
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Logo - Left aligned on desktop, centered on mobile */}
          <div className="flex-1 lg:flex-initial flex lg:justify-start justify-center">
            <Link href="/" className="text-3xl font-heading tracking-[0.2em] uppercase text-[#2A2A2A] hover:text-[#E07A5F] transition-colors">
              SYLARA
            </Link>
          </div>

          {/* Centered Navigation */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-10">
            <Link href="/collections/all" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2A2A2A]/70 hover:text-[#E07A5F] transition-colors relative group">
              Shop All
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#E07A5F] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/collections/bundles" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2A2A2A]/70 hover:text-[#E07A5F] transition-colors relative group">
              Bundles
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#E07A5F] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/pages/subscriptions" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E07A5F] hover:text-[#E07A5F] transition-colors relative group italic">
              Subscribe & Save
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#E07A5F] transition-all duration-300 group-hover:w-full"></span>
            </Link>            <Link href="/blogs/news" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2A2A2A]/70 hover:text-[#E07A5F] transition-colors relative group">
              Journal
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#E07A5F] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Icons - Right Aligned */}
          <div className="flex items-center gap-4 lg:gap-8 flex-1 lg:flex-initial justify-end">
            <button className="hidden sm:block p-2 text-[#2A2A2A]/70 hover:text-[#E07A5F] transition-colors">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2A2A2A]/70 hover:text-[#E07A5F] transition-colors flex items-center gap-3 group relative py-2"
            >
              <span className="relative">
                <ShoppingBag size={20} className="group-hover:scale-110 transition-transform duration-500" strokeWidth={1.2} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center bg-[#E07A5F] text-white rounded-full w-4 h-4 text-[8px] font-bold">
                    {cartCount}
                  </span>
                )}
              </span>
              <span className="hidden lg:inline border-b border-transparent group-hover:border-[#E07A5F]/20 transition-all">Bag</span>
            </button>
          </div>
        </div>
      </header>

      <SideCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
