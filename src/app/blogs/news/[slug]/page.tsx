import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const prisma = new PrismaClient();

const getImagePath = (img: string) => {
  if (!img) return '/assets/images/placeholder.webp';
  const fileName = decodeURIComponent(img).split(/[??]/)[0].split('/').pop();
  if (!fileName) return '/assets/images/placeholder.webp';
  return `/assets/images/${fileName.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`;
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    notFound();
  }

  const imagePath = getImagePath(post.images[0]);

  return (
    <main className="min-h-screen flex flex-col bg-[#FDFBF7] selection:bg-[#E07A5F] selection:text-white">
      <TrustBar />
      <Header />
      
      <article className="py-16 md:py-24">
        <header className="container-narrow px-4 text-center mb-16">
          <Link href="/blogs/news" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2A2A2A]/40 hover:text-[#E07A5F] transition-colors mb-10 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Journal
          </Link>
          <span className="text-[#8A9A86] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Editorial • {new Date(post.createdAt).toLocaleDateString()}</span>
          <h1 className="text-5xl md:text-7xl font-heading mb-10 text-[#2A2A2A] leading-tight tracking-tight">{post.title}</h1>
        </header>

        <div className="container-normal px-4 mb-20">
          <div className="relative aspect-[21/9] bg-white overflow-hidden rounded-sm border border-[#2A2A2A]/5 shadow-xl">
            <Image src={imagePath} alt={post.title} fill className="object-cover" priority />
          </div>
        </div>

        <div className="container-narrow px-4">
          <div 
            className="prose prose-lg max-w-none text-[#2A2A2A]/70 font-body leading-relaxed space-y-8 prose-headings:font-heading prose-headings:text-[#2A2A2A] prose-a:text-[#E07A5F] hover:prose-a:text-[#8A9A86] transition-colors"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-24 pt-16 border-t border-[#2A2A2A]/10 flex flex-col items-center text-center">
              <h4 className="text-2xl font-heading mb-6">Discover the rituals behind the science.</h4>
              <p className="text-[#2A2A2A]/50 text-base mb-10 max-w-sm">Every formula mentioned is designed to reveal your skin&apos;s soft strength.</p>
              <Link href="/collections/all" className="inline-flex px-10 py-5 bg-[#2A2A2A] text-white uppercase tracking-widest text-[11px] font-bold hover:bg-[#E07A5F] transition-all rounded-sm shadow-xl hover:shadow-[#E07A5F]/20">
                  Shop the Collection
              </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
