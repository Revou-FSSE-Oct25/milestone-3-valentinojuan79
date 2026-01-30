import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-900 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-2xl font-black tracking-tighter">
              <span className="text-revou-yellow">Revo</span>
              <span className="text-white">Fun</span>
            </span>
            <p className="mt-2 text-sm text-slate-400">
              Elevate your style with our premium curated collection.
            </p>
          </div>
          
          <div className="flex gap-10 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-revou-yellow transition">Shop</Link>
            <Link href="/about" className="hover:text-revou-yellow transition">Our Story</Link>
            <Link href="/faq" className="hover:text-revou-yellow transition">FAQ</Link>
          </div>
        </div>
        
        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} RevoFun. All rights reserved.
        </div>
      </div>
    </footer>
  );
}