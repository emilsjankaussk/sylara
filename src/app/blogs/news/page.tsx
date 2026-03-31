import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/data/mockData";

export default async function BlogListPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <TrustBar />
      <Header />
      
      {/* Editorial Header */}
      <section className="py-24 bg-white border-b border-[#2A2A2A]/5">
        <div className="container-normal px-4 text-center max-w-3xl mx-auto">
          <span className="text-[#8A9A86] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Editorial</span>
          <h1 className="mb-6 text-6xl md:text-7xl font-heading leading-tight">The Journal</h1>
          <p className="text-[#2A2A2A]/60 text-lg leading-relaxed">Deep dives into skincare science, daily rituals, and the philosophy of soft strength. curated by the SYLARA laboratory.</p>
        </div>
      </section>

      <section className="py-24 container-normal px-4 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {BLOG_POSTS.map((post) => {
            return (
              <Link key={post.id} href={`/blogs/news/${post.slug}`} className="group flex flex-col h-full">
                <div className="relative aspect-[16/10] bg-white mb-8 overflow-hidden rounded-sm border border-[#2A2A2A]/5 shadow-sm">
                  <Image 
                    src={post.images[0]} 
                    alt={post.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                </div>
                <div className="flex-grow flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A9A86] mb-4 block">Skincare Science • {new Date(post.createdAt).toLocaleDateString()}</span>
                    <h2 className="text-2xl font-heading mb-4 group-hover:text-[#E07A5F] transition-colors leading-tight">{post.title}</h2>
                    <div className="text-[#2A2A2A]/60 text-sm line-clamp-3 mb-8 leading-relaxed flex-grow" dangerouslySetInnerHTML={{ __html: post.content.replace(/<[^>]*>/g, '').slice(0, 150) + '...' }} />
                    <div className="flex items-center gap-2 group/btn">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-[#2A2A2A]/10 pb-1 group-hover/btn:border-[#E07A5F] group-hover/btn:text-[#E07A5F] transition-all">Read Journal</span>
                        <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform group-hover/btn:text-[#E07A5F]" />
                    </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
