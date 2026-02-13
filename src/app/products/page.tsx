import { fetchProducts } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";

export const revalidate = 3600;

export default async function ProductsPage() {
  try {
    const products = await fetchProducts();

    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Products</h1>
        <ProductGrid products={products} />
      </div>
    );
  } catch (error: any) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl text-red-500">
          {error.message || "Something went wrong."}
        </h2>
      </div>
    );
  }
}
