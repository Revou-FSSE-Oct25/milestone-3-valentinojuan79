import { Product } from "@/types/product";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const cleanImage = product?.images?.[0]?.replace(/[\[\]\"]/g, "") || "https://placehold.co/600x600?text=No+Image";

  return (
    <Link 
      href={`/product/${product?.id}`} 
      className="group block overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-2 transition hover:border-revou-yellow"
    >
      <div className="aspect-square overflow-hidden rounded-2xl bg-slate-800">
        <img 
          src={cleanImage} 
          alt={product?.title || "Product Image"}
          className="h-full w-full object-cover transition group-hover:scale-110"
        />
      </div>
      
      <div className="p-4">
        <p className="text-[9px] font-light uppercase tracking-widest text-amber-200">
          {product?.category?.name || "Uncategorized"}
        </p>
        
        <h3 className="mt-1 line-clamp-1 font-medium text-slate-200">
          {product?.title || "Untitled Product"}
        </h3>
        
        <p className="mt-2 text-xl font-black text-revou-yellow">
          ${product?.price || 0}
        </p>
      </div>
    </Link>
  );
}