import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return ['about', 'privacy-policy', 'terms-of-service', 'refund-policy', 'affiliates', 'b2b-wholesale'].map((slug) => ({ slug }));
}

const FALLBACK_PAGES: Record<string, { title: string, content: string }> = {
  'about': {
    title: 'Our Story',
    content: `
      <h2 class="text-3xl font-heading mb-6">Rooted in Nature. Refined by Science.</h2>
      <p class="mb-6 leading-relaxed">SYLARA was born from a simple belief: that luxury skincare should be as kind to your skin as it is effective. Our journey began in the heart of Europe, where we set out to bridge the gap between pure botanical extracts and high-performance clinical actives.</p>
      <p class="mb-6 leading-relaxed">We specialize in bioactive prebiotics that support your skin's natural microbiome, creating a resilient and radiant complexion from the inside out. Every formula is a tribute to the "soft strength" of the modern individual.</p>
      <div class="my-12 relative aspect-video bg-gray-100 rounded-sm overflow-hidden shadow-sm">
        <img src="/assets/images/RcUnk7vYXMOjbeABmG-hm1-YwDvaYfAW.webp" alt="About Sylara" class="object-cover w-full h-full" />
      </div>
      <h2 class="text-3xl font-heading mb-6 mt-12">The SYLARA Standard</h2>
      <p class="mb-6 leading-relaxed">We are committed to full transparency, EU-only manufacturing, and sustainable practices. Our products are always cruelty-free, vegan, and free from harsh synthetics that disrupt your skin's natural balance.</p>
    `
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    content: `
      <p class="mb-6 leading-relaxed text-[#2A2A2A]/60">Your privacy is of paramount importance to us. This policy outlines how SYLARA collects, uses, and protects your personal information when you interact with our website and purchase our rituals.</p>
      <h3 class="text-xl font-heading mb-4">Data Collection</h3>
      <p class="mb-6 leading-relaxed">We collect information such as your name, email, and shipping address solely to fulfill your orders and improve your shopping experience.</p>
      <h3 class="text-xl font-heading mb-4">Security</h3>
      <p class="mb-6 leading-relaxed">We use industry-standard encryption and secure payment gateways to ensure your data is always protected.</p>
    `
  },
  'terms-of-service': {
    title: 'Terms of Use',
    content: `
      <p class="mb-6 leading-relaxed text-[#2A2A2A]/60">By using the SYLARA website, you agree to comply with our terms of service. Our rituals are intended for personal use and follow all EU cosmetic regulations.</p>
      <h3 class="text-xl font-heading mb-4">Orders & Payments</h3>
      <p class="mb-6 leading-relaxed">All prices are shown in EUR. We reserve the right to modify pricing or availability at any time without prior notice.</p>
    `
  },
  'refund-policy': {
      title: 'Refunds & Returns',
      content: `
        <h2 class="text-2xl font-heading mb-6">Our 30-Day Glow Guarantee</h2>
        <p class="mb-6 leading-relaxed">We want you to love your SYLARA ritual. If for any reason you are not satisfied, we offer a 30-day money-back guarantee on your first order. Simply contact our support team to initiate the process.</p>
      `
  },
  'affiliates': {
      title: 'Affiliate Program',
      content: `
        <h2 class="text-3xl font-heading mb-6">Join the SYLARA Circle</h2>
        <p class="mb-6 leading-relaxed">Are you passionate about clean, effective skincare? Join our affiliate program and earn commissions while sharing the SYLARA philosophy with your community.</p>
        <button class="px-10 py-5 bg-[#2A2A2A] text-white uppercase tracking-widest text-[11px] font-bold rounded-sm mt-8">Apply to Join</button>
      `
  },
  'b2b-wholesale': {
      title: 'B2B / Wholesale',
      content: `
        <h2 class="text-3xl font-heading mb-6">Elevate Your Professional Offering</h2>
        <p class="mb-6 leading-relaxed">SYLARA partners with premium spas, concept stores, and dermatological clinics across Europe. Apply for a wholesale account to bring our bioactive rituals to your clients.</p>
        <button class="px-10 py-5 bg-[#8A9A86] text-white uppercase tracking-widest text-[11px] font-bold rounded-sm mt-8">Wholesale Application</button>
      `
  }
};

export default async function StaticPage({ params }: { params: { slug: string } }) {
  let title = "";
  let contentHtml = "";

  if (FALLBACK_PAGES[params.slug]) {
    title = FALLBACK_PAGES[params.slug].title;
    contentHtml = FALLBACK_PAGES[params.slug].content;
  } else {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <TrustBar />
      <Header />
      
      <section className="py-24 container-narrow px-4 flex-grow">
        <div className="mb-16">
            <span className="text-[#E07A5F] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">SYLARA Rituals</span>
            <h1 className="text-5xl md:text-7xl font-heading text-[#2A2A2A] capitalize">{title}</h1>
        </div>
        <div 
            className="prose prose-lg max-w-none text-[#2A2A2A]/70 font-body prose-headings:font-heading prose-headings:text-[#2A2A2A] prose-a:text-[#E07A5F] hover:prose-a:text-[#8A9A86] transition-colors"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </section>

      <Footer />
    </main>
  );
}
