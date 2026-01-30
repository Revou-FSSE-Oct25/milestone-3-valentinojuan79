import { fetchProducts } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";

export default async function HomePage() {
  const allProducts = await fetchProducts();
  const hotProducts = allProducts.slice(0, 8);

  return (
    <div className="space-y-24">
      {/* Hero Section*/}
      <section className="flex flex-col items-center justify-between gap-10 py-16 md:flex-row md:py-24">
        
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-black leading-[1.1] tracking-tighter md:text-7xl">
            Explore Our <br /> 
            <span className="text-revou-yellow underline decoration-revou-yellow underline-offset-8">Best</span> Collection
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-slate-400 max-w-xl">
            Elevate your lifestyle with our premium curated selection. High quality meets affordable prices only at RevoFun.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row md:justify-start">
            <Link href="/products" className="rounded-xl bg-revou-yellow px-10 py-4 font-black text-slate-900 shadow-xl shadow-yellow-900/10 hover:bg-yellow-400 transition active:scale-95">
              SHOP NOW
            </Link>
            <Link href="/about" className="rounded-xl border border-slate-700 px-10 py-4 font-bold text-white hover:bg-slate-800 transition">
              LEARN MORE
            </Link>
          </div>
        </div>
        
        {/* Image */}
        <div className="relative flex-1 group">
          <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full group-hover:bg-blue-600/30 transition-all"></div>
          
          <img 
            src="/hero-image.webp" 
            alt="RevoFun Hero Illustration" 
            className="rounded-2xl relative z-10 w-full h-auto object-contain transition-transform duration-700 hover:scale-105"
            style={{
              maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              filter: 'brightness(0.9) contrast(1.1)'
            }}
          />
        </div>
      </section>

      {/* Hot Products Section */}
      <section>
        <div className="mb-12 flex items-end justify-between border-l-4 border-revou-yellow pl-6">
          <div>
            <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase"> <span className="text-revou-yellow">Hot</span> Products</h2>
            <p className="text-slate-500 text-sm mt-1 font-medium">Handpicked trending items just for you</p>
          </div>
          <Link href="/products" className="hidden sm:block text-revou-yellow font-bold hover:text-white transition underline-offset-4 hover:underline">
            View All Catalog &rarr;
          </Link>
        </div>
        
        <ProductGrid products={hotProducts} />
        
        <div className="mt-16 text-center">
          <Link href="/products" className="inline-block rounded-2xl border-2 border-slate-800 px-12 py-4 font-black text-white hover:bg-white hover:text-slate-900 transition-all duration-300">
            BROWSE FULL CATALOG
          </Link>
        </div>
      </section>
    </div>
  );
}