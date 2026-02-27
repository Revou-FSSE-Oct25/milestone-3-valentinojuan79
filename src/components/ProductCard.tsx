import { Product } from "@/types/product";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const cleanImage = product?.images?.[0]?.replace(/[\[\]\"]/g, "") || "https://placehold.co/600x600?text=No+Image";

  return (
    <Link 
      href={`/product/${product?.id}`} 
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:shadow-md hover:border-gray-300"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img 
          src={cleanImage} 
          alt={product?.title || "Product Image"}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>
      
      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {product?.category?.name || "Uncategorized"}
        </p>
        
        <h3 className="mt-2 line-clamp-2 font-medium text-gray-900">
          {product?.title || "Untitled Product"}
        </h3>
        
        <p className="mt-3 text-lg font-semibold text-gray-900">
          ${product?.price || 0}
        </p>
      </div>
    </Link>
  );
}