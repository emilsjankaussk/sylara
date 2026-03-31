"use client";

export default function TrustBar() {
  const items = [
    "Cruelty-Free & Vegan 🌱",
    "Formulated in the EU 🇪🇺",
    "Dermatologist Tested 🔬",
    "Free Shipping over €50 📦",
    "30-Day Money Back Guarantee ✨"
  ];

  return (
    <div className="bg-[#E07A5F] text-white py-3 overflow-hidden border-b border-white/10 relative">
      <div className="flex whitespace-nowrap">
        <div className="animate-marquee flex shrink-0">
          {items.map((item, index) => (
            <span key={`set1-${index}`} className="text-[10px] font-bold uppercase tracking-[0.25em] px-12">
              {item}
            </span>
          ))}
        </div>
        <div className="animate-marquee flex shrink-0">
          {items.map((item, index) => (
            <span key={`set2-${index}`} className="text-[10px] font-bold uppercase tracking-[0.25em] px-12">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
