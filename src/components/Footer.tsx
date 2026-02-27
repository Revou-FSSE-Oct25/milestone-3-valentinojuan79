import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-2xl font-bold text-gray-900">
              Revo<span className="text-orange-600">Shop</span>
            </span>
            <p className="mt-2 text-sm text-gray-600">
              Quality products at great prices.
            </p>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-orange-600 transition">Shop</Link>
            <Link href="/about" className="hover:text-orange-600 transition">About</Link>
            <Link href="/faq" className="hover:text-orange-600 transition">FAQ</Link>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} RevoShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}