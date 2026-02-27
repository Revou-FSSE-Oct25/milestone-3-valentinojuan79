import { fetchProducts } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";

export default async function HomePage() {
  const allProducts = await fetchProducts();
  const hotProducts = allProducts.slice(0, 8);

  return (
    <div className="space-y-20">
      {/* Hero Section*/}
      <section className="flex flex-col-reverse items-center justify-between gap-12 py-12 md:flex-row md:py-20">
        
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl">
            <span className="text-orange-600">Revolve</span> <br /> 
            Around You.
            
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-600 max-w-xl">
            Everything you need, curated just for you.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:justify-start">
            <Link href="/products" className="rounded px-8 py-3 font-semibold text-white bg-orange-600 hover:bg-orange-700 transition">
              Shop Now
            </Link>
            <Link href="/about" className="rounded px-8 py-3 font-semibold text-gray-900 border border-gray-300 hover:border-gray-400 transition">
              Learn More
            </Link>
          </div>
        </div>
        
        {/* Image */}
        <div className="relative flex-1 flex justify-center">
          <img 
          src="/hero-image.svg" 
          alt="Hero" 
          className="rounded-lg w-full max-w-sm md:max-w-full h-auto object-contain hover:opacity-95 transition"
          />
        </div>
      </section>

      {/* Hot Products Section */}
      <section>
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900"><span className="text-orange-600">Hot</span> Products</h2>
          <p className="mt-2 text-gray-600">Check out our latest selection</p>
        </div>
        
        <ProductGrid products={hotProducts} />
        
        <div className="mt-12 text-center">
          <Link href="/products" className="inline-block rounded px-10 py-3 font-semibold text-gray-900 border border-gray-300 hover:bg-gray-50 transition">
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
}