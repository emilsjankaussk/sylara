"use client";

import { Star } from "lucide-react";

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      name: "Sophie M.",
      verified: true,
      text: "The AM glow kit completely changed my skin texture. It's so gentle but incredibly effective. Will definitely repurchase!",
      product: "AM Glow Kit"
    },
    {
      id: 2,
      name: "Elena R.",
      verified: true,
      text: "Finally a moisturizer that doesn't break me out but keeps my dry patches away. The prebiotics make a huge difference.",
      product: "Daily Barrier Cream"
    },
    {
      id: 3,
      name: "Clara T.",
      verified: true,
      text: "I love the subtle natural scent and how quickly the serum absorbs. Perfect base for makeup.",
      product: "Hyaluronic Serum"
    }
  ];

  return (
    <section className="py-24 bg-[#FDFBF7]">
      <div className="container-normal px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-heading mb-4">Real Results.</h2>
            <p className="text-[#2A2A2A]/70 text-lg">Don&apos;t just take our word for it. Discover what our community has to say about their SYLARA journey.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} fill="#E07A5F" color="#E07A5F" size={20} />)}
            </div>
            <span className="font-bold text-lg">4.9/5</span>
            <span className="text-[#2A2A2A]/50 text-sm">(2k+ Reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 border border-[#2A2A2A]/5 hover:border-[#E07A5F]/30 transition-colors">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} fill="#E07A5F" color="#E07A5F" size={16} />)}
              </div>
              <p className="text-lg italic mb-8">&quot;{review.text}&quot;</p>
              <div className="flex justify-between items-end border-t border-[#2A2A2A]/10 pt-4">
                <div>
                  <p className="font-bold text-sm">{review.name}</p>
                  {review.verified && <p className="text-[10px] uppercase tracking-wider text-[#8A9A86]">Verified Buyer</p>}
                </div>
                <p className="text-xs text-[#2A2A2A]/50">{review.product}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
