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

  if (loading) return <div className="py-20 text-center text-revou-yellow font-bold animate-pulse">Loading Product Details...</div>;
  if (!product) return <div className="py-20 text-center text-white">Product not found.</div>;

  const cleanImage = product.images[0]?.replace(/[\[\]\"]/g, "");

  return (
    <div className="py-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
        {/* Product Image Section */}
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-4">
          <img 
            src={cleanImage} 
            alt={product.title} 
            className="w-full rounded-2xl object-cover shadow-2xl transition hover:scale-105 duration-500" 
          />
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col">
          <span className="inline-block w-fit rounded-full bg-blue-600/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-revou-yellow">
            {product.category.name}
          </span>
          
          <h1 className="mt-4 text-4xl font-black text-white leading-tight md:text-5xl">
            {product.title}
          </h1>
          
          <div className="mt-6 flex items-center gap-4">
            <p className="text-4xl font-black text-revou-yellow">${product.price}</p>
            <span className="rounded-lg bg-slate-800 px-3 py-1 text-sm font-medium text-slate-400">
              In Stock
            </span>
          </div>

          <div className="mt-8 border-t border-slate-800 pt-8">
            <h3 className="text-lg font-bold text-white">Description</h3>
            <p className="mt-4 text-lg leading-relaxed text-slate-400">
              {product.description}
            </p>
          </div>
          
          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`mt-10 flex w-full items-center justify-center gap-3 rounded-2xl py-5 text-lg font-black transition-all active:scale-95 shadow-xl ${
              isAdded 
                ? "bg-green-500 text-white cursor-default" 
                : "bg-revou-yellow text-slate-900 hover:bg-yellow-400 shadow-yellow-900/10"
            }`}
          >
            {isAdded ? (
              <>
                <span>Added to Cart!</span>
                <span className="text-2xl">✓</span>
              </>
            ) : (
              <>
                <span>Add to Cart</span>
                <span className="text-2xl">🛒</span>
              </>
            )}
          </button>

          <p className="mt-6 text-center text-sm text-slate-500">
            Free shipping worldwide.
          </p>
        </div>
      </div>
    </div>
  );
}