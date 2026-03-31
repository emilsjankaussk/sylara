"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#FDFBF7] border-t border-[#2A2A2A]/5 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute bottom-0 right-0 p-20 opacity-[0.03] select-none pointer-events-none">
          <span className="text-[15vw] font-heading italic">S</span>
      </div>

      {/* B2B / Trade teaser strip */}
      <div className="bg-[#8A9A86] py-5 text-center relative z-10 shadow-lg">
        <p className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">
          Interested in carrying SYLARA? <Link href="/pages/b2b-wholesale" className="underline underline-offset-8 hover:text-white/80 transition-colors ml-4">Apply for a Wholesale Account</Link>
        </p>
      </div>

      <div className="py-24 relative z-10">
        <div className="container-normal px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="text-3xl font-heading tracking-widest uppercase mb-10 text-[#2A2A2A]">SYLARA</h3>
            <p className="max-w-md text-[#2A2A2A]/50 leading-relaxed text-[15px] font-body mb-10">
              Soft Strength. Timeless Skin. Re-imagining luxury skincare with bioactive prebiotics and botanical extracts. Formulated in the EU for visible, balanced results.
            </p>
            <div className="flex gap-6">
                <Link href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2A2A2A]/40 hover:text-[#E07A5F] transition-colors">Instagram</Link>
                <Link href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2A2A2A]/40 hover:text-[#E07A5F] transition-colors">Facebook</Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-10 text-[#2A2A2A]/40">Collections</h4>
            <ul className="space-y-6 text-[13px] font-bold uppercase tracking-[0.15em] text-[#2A2A2A]/70">
              <li><Link href="/collections/all" className="hover:text-[#E07A5F] transition-colors">Shop All</Link></li>
              <li><Link href="/collections/face-care" className="hover:text-[#E07A5F] transition-colors">Face Care</Link></li>
              <li><Link href="/collections/body-care" className="hover:text-[#E07A5F] transition-colors">Body Care</Link></li>
              <li><Link href="/collections/hair-care" className="hover:text-[#E07A5F] transition-colors">Hair Care</Link></li>
              <li><Link href="/collections/bundles" className="hover:text-[#E07A5F] transition-colors">Bundles & Gifts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-10 text-[#2A2A2A]/40">The Brand</h4>
            <ul className="space-y-6 text-[13px] font-bold uppercase tracking-[0.15em] text-[#2A2A2A]/70">
              <li><Link href="/pages/about" className="hover:text-[#E07A5F] transition-colors">Our Story</Link></li>
              <li><Link href="/blogs/news" className="hover:text-[#E07A5F] transition-colors">The Journal</Link></li>
              <li><Link href="/pages/affiliates" className="hover:text-[#E07A5F] transition-colors">Affiliates</Link></li>
              <li><Link href="/pages/contact" className="hover:text-[#E07A5F] transition-colors">Contact Us</Link></li>
              <li><Link href="/pages/b2b-wholesale" className="hover:text-[#E07A5F] transition-colors">B2B / Trade</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-10 text-[#2A2A2A]/40">Newsletter</h4>
            <p className="text-[13px] text-[#2A2A2A]/50 mb-8 leading-relaxed">Join our inner circle for early access and skin rituals.</p>
            <div className="flex border-b border-[#2A2A2A]/20 pb-2">
                <input type="email" placeholder="Email Address" className="bg-transparent text-[11px] font-bold uppercase tracking-[0.15em] focus:outline-none w-full" />
                <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2A2A2A]/40 hover:text-[#E07A5F] transition-colors">Join</button>
            </div>
          </div>
        </div>

        <div className="container-normal px-4 mt-24 pt-10 border-t border-[#2A2A2A]/5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2A2A2A]/30 flex flex-col md:flex-row justify-between items-center gap-8">
          <p>© {new Date().getFullYear()} SYLARA. EU PROUDLY FORMULATED.</p>
          <div className="flex gap-10">
            <Link href="/pages/privacy-policy" className="hover:text-[#2A2A2A] transition-colors">Privacy Policy</Link>
            <Link href="/pages/terms-of-service" className="hover:text-[#2A2A2A] transition-colors">Terms of Use</Link>
            <Link href="/pages/refund-policy" className="hover:text-[#2A2A2A] transition-colors">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
