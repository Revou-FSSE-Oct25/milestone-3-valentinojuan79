import { fetchProducts } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="py-10">
      <div className="mb-12 border-b border-slate-800 pb-8">
        <h1 className="text-4xl font-black text-white"><span className="text-revou-yellow">Full</span> Catalog</h1>
        <p className="mt-2 text-slate-400">Showing all {products.length} products available in our store.</p>
      </div>
      
      <ProductGrid products={products} />
    </div>
  );
}