import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import BundleDeals from "@/components/BundleDeals";
import QuizStrip from "@/components/QuizStrip";
import Reviews from "@/components/Reviews";
import Newsletter from "@/components/Newsletter";
import ProductCard from "@/components/ProductCard";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

const prisma = new PrismaClient();

const getTagsForProduct = (name: string) => {
  const tags = [];
  if (name.toLowerCase().includes('hyaluronic')) tags.push('Hyaluronic Acid', 'Deep Hydration');
  else if (name.toLowerCase().includes('retinol') || name.toLowerCase().includes('night')) tags.push('Ceramides', 'Barrier Repair');
  else if (name.toLowerCase().includes('cleanser')) tags.push('Prebiotics', 'Gentle Cleanse');
  else tags.push('Botanical Actives', 'Daily Glow');
  return tags;
};

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 4,
  });

  return (
    <main className="min-h-screen flex flex-col selection:bg-[#E07A5F] selection:text-white overflow-x-hidden">
      <TrustBar />
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-[#FDFBF7]">
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
          <span className="text-[20vw] font-heading font-bold uppercase tracking-tighter">SYLARA</span>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-[20%] left-[10%] w-32 h-40 bg-white shadow-2xl rounded-sm p-2 animate-float hidden lg:block opacity-60 hover:opacity-100 transition-opacity duration-700">
           <div className="relative w-full h-full bg-[#FDFBF7]">
             <Image src="/assets/images/gen2.webp" alt="Float 1" fill className="object-cover p-2" />
           </div>
        </div>
        <div className="absolute bottom-[20%] right-[10%] w-40 h-52 bg-white shadow-2xl rounded-sm p-2 animate-float hidden lg:block opacity-60 hover:opacity-100 transition-opacity duration-700" style={{ animationDelay: '2s' }}>
           <div className="relative w-full h-full bg-[#FDFBF7]">
             <Image src="/assets/images/RcUnk7vYXMOjbeABmG-hm1-YwDvaYfAW.webp" alt="Float 2" fill className="object-cover p-2" />
           </div>
        </div>

        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/images/gen2.webp" 
            alt="Sylara Hero" 
            fill 
            className="object-cover opacity-90 mix-blend-multiply"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/40 via-transparent to-[#FDFBF7]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mt-10">
          <div className="inline-flex items-center gap-2 mb-8 bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/50">
            <span className="w-2 h-2 bg-[#8A9A86] rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">New: Prebiotic Ritual Collection</span>
          </div>
          
          <h1 className="mb-8 text-6xl md:text-8xl lg:text-[100px] font-heading text-[#2A2A2A] leading-[0.9] tracking-tight">
            Soft Strength.<br/>
            <span className="italic relative">
              Timeless Skin.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#E07A5F]/20" viewBox="0 0 400 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 15C50 5 150 5 200 10C250 15 350 15 395 5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#1A1A1A] mb-12 leading-relaxed font-bold max-w-2xl mx-auto drop-shadow-sm">
            Experience the harmony of bio-active prebiotics and botanical extracts. Formulated in the EU to nurture your skin&apos;s natural resilience.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/collections/all" className="inline-flex justify-center items-center gap-3 px-12 py-6 bg-[#2A2A2A] text-white uppercase tracking-[0.25em] text-[11px] font-bold hover:bg-[#E07A5F] transition-all duration-500 rounded-sm shadow-2xl hover:shadow-[#E07A5F]/20 group">
              Shop The Ritual <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#quiz" className="inline-flex justify-center items-center gap-3 px-12 py-6 bg-white/80 backdrop-blur-md border border-[#2A2A2A]/10 text-[#2A2A2A] uppercase tracking-[0.25em] text-[11px] font-bold hover:bg-white transition-all duration-500 rounded-sm shadow-xl">
              Find Your Formula <Play size={14} fill="currentColor" />
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
           <span className="text-[9px] uppercase tracking-[0.4em] rotate-90 origin-left ml-4">Scroll</span>
           <div className="w-[1px] h-12 bg-gradient-to-b from-[#2A2A2A] to-transparent"></div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-32 container-normal px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <span className="text-[#E07A5F] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Proven Performance</span>
            <h2 className="mb-6 text-5xl font-heading">The Bestsellers</h2>
            <p className="text-[#2A2A2A]/50 text-lg leading-relaxed">Clinically formulated to support your skin barrier and reveal a natural, healthy glow. Loved by 50,000+ ritualists.</p>
          </div>
          <Link href="/collections/all" className="uppercase tracking-[0.2em] text-[11px] font-bold border-b border-[#2A2A2A]/20 pb-2 hover:text-[#E07A5F] hover:border-[#E07A5F] transition-all duration-300">
            Explore All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              id={product.id}
              slug={product.slug}
              name={product.name}
              price={product.price || 0}
              images={product.images as string[]}
              tags={getTagsForProduct(product.name)}
            />
          ))}
        </div>
      </section>

      {/* Quiz Section */}
      <div id="quiz">
        <QuizStrip />
      </div>

      {/* Bundle Deals Section */}
      <BundleDeals />

      {/* Brand Ethos with Visual Split */}
      <section className="py-0 bg-white flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-1/2 relative aspect-square lg:aspect-auto min-h-[600px] group">
          <Image 
            src="/assets/images/RcUnk7vYXMOjbeABmG-hm1-YwDvaYfAW.webp" 
            alt="Sylara Ethos" 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000"></div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center p-12 lg:p-32 bg-[#FDFBF7] relative">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
             <span className="text-8xl font-heading italic">S</span>
          </div>
          <div className="max-w-lg relative z-10">
            <span className="text-[#E07A5F] text-[10px] font-bold uppercase tracking-[0.3em] mb-6 block">Our Ethos</span>
            <h2 className="mb-10 leading-tight text-5xl lg:text-6xl font-heading">Skincare that honors your rhythm.</h2>
            <p className="text-[#2A2A2A]/70 text-lg mb-8 leading-relaxed">
              At SYLARA, we believe in soft strength. Our formulas are powered by nature and refined through science — combining botanical actives, gentle hydrators, and barrier-supporting nutrients to reveal radiant, healthy-looking skin.
            </p>
            <p className="text-[#2A2A2A]/70 text-lg leading-relaxed mb-12">
              Every product is a moment of calm, every result a step toward glow. Designed to be effortless, effective, and deeply nourishing.
            </p>
            <Link href="/pages/about" className="inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[11px] font-bold border-b border-[#2A2A2A]/20 pb-2 hover:text-[#E07A5F] hover:border-[#E07A5F] transition-all">
              Our Story <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews />

      {/* Editorial / Blog Section */}
      <section className="py-32 bg-white">
        <div className="container-normal px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <span className="text-[#8A9A86] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">The Journal</span>
              <h2 className="text-5xl font-heading">Editorial</h2>
            </div>
            <Link href="/blogs/news" className="uppercase tracking-[0.2em] text-[11px] font-bold border-b border-[#2A2A2A]/20 pb-2 hover:text-[#E07A5F] hover:border-[#E07A5F] transition-all">
              View All Posts
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Link href="/blogs/news/barrier-repair" className="group block">
              <div className="relative aspect-[16/10] mb-8 overflow-hidden rounded-sm bg-[#FDFBF7] border border-[#2A2A2A]/5">
                <Image src="/assets/images/gen2.webp" alt="Blog Post" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A9A86] mb-4 block">Skincare Science • 5 Min Read</span>
              <h3 className="text-3xl font-heading mb-4 group-hover:text-[#E07A5F] transition-colors leading-tight">Why Ceramides are the Secret to a Healthy Skin Barrier</h3>
              <p className="text-[#2A2A2A]/60 text-lg leading-relaxed">Discover how incorporating ceramides into your PM routine can transform dry, irritated skin into a resilient, glowing complexion.</p>
            </Link>
            <Link href="/blogs/news/am-routine" className="group block">
              <div className="relative aspect-[16/10] mb-8 overflow-hidden rounded-sm bg-[#FDFBF7] border border-[#2A2A2A]/5">
                <Image src="/assets/images/RcUnk7vYXMOjbeABmG-hm1-YwDvaYfAW.webp" alt="Blog Post" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A9A86] mb-4 block">Daily Rituals • 4 Min Read</span>
              <h3 className="text-3xl font-heading mb-4 group-hover:text-[#E07A5F] transition-colors leading-tight">The Perfect 3-Step AM Routine for Glowing Skin</h3>
              <p className="text-[#2A2A2A]/60 text-lg leading-relaxed">Keep it simple but effective. Here&apos;s exactly what you need every morning to protect and hydrate your skin all day long.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      <Footer />
    </main>
  );
}
