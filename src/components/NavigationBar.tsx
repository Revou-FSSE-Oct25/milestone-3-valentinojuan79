"use client";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NavigationBar() {
  const { user, setUser, totalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    useCartStore.persist.rehydrate(); 
    setMounted(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    router.push("/");
    router.refresh();
  };

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900 h-16">
        <div className="mx-auto max-w-7xl h-full flex items-center px-4">
           <span className="text-revou-yellow font-black text-2xl">Revo<span className="text-white">Fun</span></span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-2xl font-black">
          <span className="text-revou-yellow">Revo</span><span className="text-white">Fun</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link href="/products" className="text-sm font-bold text-slate-300 hover:text-revou-yellow">Shop</Link>
          
          <Link href="/cart" className="relative p-2">
            🛒 {totalItems() > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-revou-yellow text-[10px] font-black text-slate-900 ring-2 ring-slate-900">
                {totalItems()}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-4 border-l border-slate-800 pl-6">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Welcome</span>
                <span className="text-sm font-black text-white italic">John Doe</span> 
              </div>
              <button 
                onClick={handleLogout} 
                className="rounded-lg bg-red-500/10 px-4 py-2 text-xs font-black text-red-500 hover:bg-red-500 hover:text-white transition"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="rounded-xl bg-revou-yellow px-6 py-2 text-sm font-black text-slate-900 hover:bg-yellow-400 shadow-lg shadow-yellow-900/20"
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}