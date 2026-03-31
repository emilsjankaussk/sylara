import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import AddToCartButton from "@/components/AddToCartButton";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductGallery from "@/components/ProductGallery";
import ProductAccordion from "@/components/ProductAccordion";
import { Star, ShieldCheck, Truck, RefreshCcw, Sparkles, ArrowRight } from "lucide-react";
import Reviews from "@/components/Reviews";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import BundleOffers from "@/components/BundleOffers";
import SubscriptionOffers from "@/components/SubscriptionOffers";
import { PRODUCTS } from "@/data/mockData";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = PRODUCTS.find(p => p.slug === params.slug);

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} – SYLARA`,
    description: product.description?.slice(0, 160),
    openGraph: {
      images: [product.images[0] || ""],
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = PRODUCTS.find(p => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  // Related products logic (based on tags or just random others)
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <main className="min-h-screen flex flex-col bg-[#FDFBF7] selection:bg-[#E07A5F] selection:text-white">
      <TrustBar />
      <Header />
      
      <section className="pt-10 pb-24 md:pt-20 container-normal px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-10 text-[10px] uppercase tracking-[0.2em] text-[#2A2A2A]/40 font-bold">
            <Link href="/" className="hover:text-[#E07A5F] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/collections/all" className="hover:text-[#E07A5F] transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-[#2A2A2A]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images as string[]} name={product.name} />
          </div>

          {/* Right Column: Info & Purchase */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="flex flex-col gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} fill="#E07A5F" color="#E07A5F" size={14} />)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#2A2A2A]/40">124 Reviews</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading mb-4 leading-[1.1] tracking-tight">{product.name}</h1>
                <p className="text-2xl font-medium text-[#2A2A2A] mb-8">€{product.price?.toFixed(2)}</p>
                
                <div className="flex flex-wrap gap-2 mb-10">
                  {product.tags.map(tag => (
                    <span key={tag} className="bg-white border border-[#2A2A2A]/5 text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded-sm text-[#2A2A2A]/60">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-6 mb-12">
                  <SubscriptionOffers product={product} />
                  <BundleOffers product={product} />
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 text-[#2A2A2A]/50 text-[11px] font-bold uppercase tracking-widest bg-white/50 p-4 border border-[#2A2A2A]/5 rounded-sm">
                        <Truck size={18} className="text-[#8A9A86]" strokeWidth={1.5} />
                        Free Shipping over €50
                    </div>
                    <div className="flex items-center gap-4 text-[#2A2A2A]/50 text-[11px] font-bold uppercase tracking-widest bg-white/50 p-4 border border-[#2A2A2A]/5 rounded-sm">
                        <ShieldCheck size={18} className="text-[#8A9A86]" strokeWidth={1.5} />
                        Dermatologically Tested
                    </div>
                  </div>
                </div>

                <div className="prose prose-sm max-w-none text-[#2A2A2A]/70 leading-relaxed font-body mb-10">
                   <p className="text-base">{product.description}</p>
                </div>

                {/* Accordions for Details */}
                <ProductAccordion 
                   items={[
                     {
                       title: "How to Ritual",
                       content: "Apply a small amount to clean skin as part of your AM/PM routine. Gently massage in upward circular motions until fully absorbed. Follow with your favorite moisturizer or sunscreen."
                     },
                     {
                       title: "Core Ingredients",
                       content: "Bio-Active Prebiotics, Hyaluronic Acid (Multi-molecular), Organic Aloe Barbadensis Leaf Juice, Botanical Extracts, Panthenol (Vitamin B5). Formulated without parabens, phthalates, or synthetic fragrances."
                     },
                     {
                       title: "Full Transparency",
                       content: "Each batch is tested for purity and efficacy. Sustainability is at our core - our packaging is 100% recyclable glass and FSC-certified paper."
                     }
                   ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section with Visuals */}
      <section className="py-24 bg-white border-y border-[#2A2A2A]/5">
        <div className="container-normal px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-[#FDFBF7] rounded-full flex items-center justify-center mb-8">
                        <Sparkles className="text-[#E07A5F]" size={32} strokeWidth={1} />
                    </div>
                    <h3 className="text-2xl font-heading mb-4">Glow Sustainably</h3>
                    <p className="text-[#2A2A2A]/60 text-sm leading-relaxed">Our formulas are designed to reveal your skin&apos;s natural radiance without compromising long-term barrier health.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-[#FDFBF7] rounded-full flex items-center justify-center mb-8">
                        <ShieldCheck className="text-[#8A9A86]" size={32} strokeWidth={1} />
                    </div>
                    <h3 className="text-2xl font-heading mb-4">Barrier Support</h3>
                    <p className="text-[#2A2A2A]/60 text-sm leading-relaxed">Infused with prebiotics that feed your skin&apos;s microbiome, creating a resilient shield against environmental stressors.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-[#FDFBF7] rounded-full flex items-center justify-center mb-8">
                        <RefreshCcw className="text-[#E07A5F]" size={32} strokeWidth={1} />
                    </div>
                    <h3 className="text-2xl font-heading mb-4">Timeless Results</h3>
                    <p className="text-[#2A2A2A]/60 text-sm leading-relaxed">High-performance botanical actives combined with clinical science for visible, age-defying improvements.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews />

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="py-32 container-normal px-4">
          <div className="text-center mb-20">
            <span className="text-[#E07A5F] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Complete the Ritual</span>
            <h2 className="text-5xl font-heading">You may also like</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {relatedProducts.map(rel => (
                <ProductCard 
                    key={rel.id}
                    id={rel.id}
                    slug={rel.slug}
                    name={rel.name}
                    price={rel.price || 0}
                    images={rel.images as string[]}
                    tags={rel.tags}
                />
            ))}
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-32 bg-[#8A9A86] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container-narrow px-4 relative z-10 text-center">
            <h2 className="text-5xl font-heading mb-8">Nourish your skin. <br/><span className="italic">Nourish your soul.</span></h2>
            <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto">Join thousands who have transformed their skincare routine into a meaningful daily ritual of self-care.</p>
            <Link href="/collections/all" className="inline-flex items-center gap-3 px-12 py-6 bg-white text-[#8A9A86] uppercase tracking-[0.25em] text-[11px] font-bold hover:bg-[#FDFBF7] transition-all rounded-sm shadow-2xl">
                Explore the Whole Collection <ArrowRight size={18} />
            </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
