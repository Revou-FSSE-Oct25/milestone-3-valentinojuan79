"use client";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { useCartStore } from "@/lib/store";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    async function getDetail() {
      try {
        const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    }
    getDetail();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  if (loading) return <div className="py-20 text-center text-orange-600 font-semibold">Loading product...</div>;
  if (!product) return <div className="py-20 text-center text-gray-900">Product not found.</div>;

  const cleanImage = product.images?.[0]?.replace(/[\[\]\"]/g, "") || "https://placehold.co/600x400";

  return (
    <div className="py-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 items-start">
        {/* Product Image Section */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-4">
          <img 
            src={cleanImage} 
            alt={product.title} 
            className="w-full rounded object-cover hover:opacity-95 transition duration-300" 
          />
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col">
          <span className="inline-block w-fit rounded px-3 py-1 text-xs font-semibold uppercase text-orange-600 bg-orange-50">
            {product.category?.name ?? "Uncategorized"}
          </span>
          
          <h1 className="mt-4 text-3xl font-bold text-gray-900 leading-tight md:text-4xl">
            {product.title}
          </h1>
          
          <div className="mt-6 flex items-center gap-4">
            <p className="text-3xl font-bold text-orange-600">${product.price}</p>
            <span className="rounded px-3 py-1 text-sm font-medium text-green-600 bg-green-50">
              In Stock
            </span>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="font-semibold text-gray-900">Description</h3>
            <p className="mt-4 leading-relaxed text-gray-600">
              {product.description}
            </p>
          </div>
          
          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`mt-10 flex w-full items-center justify-center gap-2 rounded py-4 font-semibold transition ${
              isAdded 
                ? "bg-green-600 text-white" 
                : "bg-orange-600 text-white hover:bg-orange-700"
            }`}
          >
            {isAdded ? (
              <>
                <span>Added to Cart</span>
                <span>✓</span>
              </>
            ) : (
              <>
                <span>Add to Cart</span>
                <span>🛒</span>
              </>
            )}
          </button>

          <p className="mt-6 text-center text-sm text-gray-500">
            Free shipping worldwide.
          </p>
        </div>
      </div>
    </div>
  );
}