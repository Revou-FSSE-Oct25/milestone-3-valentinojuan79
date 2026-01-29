import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/app/types/type';

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getProduct(id: string): Promise<Product | null> {
  try {
    // SSR mode dengan cache: 'no-store'
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  // Tunggu params-nya siap (Solusi error JSON kamu)
  const { id } = await params;
  const product = await getProduct(id);

  // Jika produk tidak ada atau API error
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">Aduh, produknya nggak ketemu...</h2>
        <Link href="/" className="mt-4 text-blue-600 hover:underline">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      {/* Breadcrumb sederhana */}
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Products</Link>
        <span className="mx-2">/</span>
        <span className="capitalize">{product.category}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-6 md:p-12 rounded-3xl border shadow-sm">
        {/* Bagian Gambar */}
        <div className="flex items-center justify-center bg-white rounded-2xl p-4">
          <div className="relative w-full h-[300px] md:h-[400px]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Bagian Info */}
        <div className="flex flex-col">
          <span className="inline-block px-3 py-1 text-xs font-bold text-blue-600 bg-blue-50 rounded-full w-fit mb-4 uppercase tracking-widest">
            {product.category}
          </span>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            {product.title}
          </h1>

          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-3xl font-black text-gray-900">${product.price}</span>
            <span className="text-sm text-gray-400 line-through">${(product.price + 20).toFixed(2)}</span>
          </div>

          <div className="space-y-4 border-t pt-6">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Description</h3>
            <p className="text-gray-600 leading-relaxed italic">
              "{product.description}"
            </p>
          </div>

          <div className="mt-10 space-y-3">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition active:scale-[0.98]">
              Add to Cart
            </button>
            <button className="w-full bg-white border-2 border-gray-200 text-gray-800 font-bold py-4 rounded-xl hover:bg-gray-50 transition">
              Save to Wishlist
            </button>
          </div>
          
          <p className="mt-6 text-center text-xs text-gray-400">
            Free shipping on orders over $100 • 30-day return policy
          </p>
        </div>
      </div>
    </div>
  );
}