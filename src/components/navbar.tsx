import Link from "next/link";

export default function navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          
          <span className="text-xl font-brand tracking-tighter text-slate-900">REVOSHOP</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-blue-600">Products</Link>
          <Link href="/faq" className="hover:text-blue-600">FAQ</Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 hover:bg-slate-100">🛒</button>
          <Link href="/login" className="rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white hover:bg-slate-800 transition active:scale-95">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}