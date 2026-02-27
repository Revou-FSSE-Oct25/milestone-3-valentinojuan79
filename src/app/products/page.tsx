import { fetchProducts } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";

export const revalidate = 3600;

export default async function ProductsPage() {
  try {
    const products = await fetchProducts();

    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
          <p className="mt-2 text-gray-600">Explore our full selection</p>
        </div>
        <ProductGrid products={products} />
      </div>
    );
  } catch (error: any) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl text-red-600">
          {error.message || "Something went wrong."}
        </h2>
      </div>
    );
  }
}
