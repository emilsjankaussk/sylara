import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS, CATEGORIES } from "@/data/mockData";

export function generateStaticParams() {
  const slugs = CATEGORIES.map((c) => ({ slug: c.slug }));
  if (!slugs.find((s) => s.slug === "all")) slugs.push({ slug: "all" });
  return slugs;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  if (params.slug === "all") return { title: "Shop All Products – SYLARA" };

  const category = CATEGORIES.find(c => c.slug === params.slug);

  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} – SYLARA`,
  };
}

export default async function CollectionPage({ params }: { params: { slug: string } }) {
  let products;
  let categoryName = "";
  let categoryDescription = "";

  if (params.slug === "all") {
    products = PRODUCTS;
    categoryName = "All Products";
    categoryDescription = "Explore our complete range of bioactive skincare formulas, designed to support your skin's natural rhythm.";
  } else {
    const category = CATEGORIES.find(c => c.slug === params.slug);

    if (!category) {
      notFound();
    }

    products = PRODUCTS.filter(p => category.productIds.includes(p.id));
    categoryName = category.name;
    categoryDescription = category.description;
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <TrustBar />
      <Header />
      
      {/* Category Header */}
      <section className="py-24 bg-white border-b border-[#2A2A2A]/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] select-none pointer-events-none flex items-center justify-center">
            <span className="text-[30vw] font-heading font-bold uppercase">{categoryName}</span>
        </div>
        <div className="container-normal px-4 relative z-10 text-center max-w-3xl mx-auto">
          <span className="text-[#E07A5F] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Collection</span>
          <h1 className="mb-6 text-6xl md:text-7xl font-heading leading-tight">{categoryName}</h1>
          <p className="text-[#2A2A2A]/60 text-lg leading-relaxed">{categoryDescription}</p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24 container-normal px-4 flex-grow">
        <div className="flex justify-between items-center mb-16 border-b border-[#2A2A2A]/5 pb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2A2A2A]/40">{products.length} Products Found</p>
            <div className="flex items-center gap-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2A2A2A]/40">Sort By:</span>
                <select className="bg-transparent text-[11px] font-bold uppercase tracking-[0.2em] focus:outline-none cursor-pointer">
                    <option>Bestselling</option>
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                </select>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              id={product.id}
              slug={product.slug}
              name={product.name}
              price={product.price || 0}
              images={product.images as string[]}
              tags={product.tags}
            />
          ))}
        </div>

        {products.length === 0 && (
            <div className="text-center py-32">
                <p className="text-[#2A2A2A]/40 font-heading text-2xl mb-8">No products found in this collection.</p>
                <Link href="/collections/all" className="inline-flex px-10 py-5 bg-[#2A2A2A] text-white uppercase tracking-widest text-xs hover:bg-[#E07A5F] transition-all">
                    Return to All Products
                </Link>
            </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
