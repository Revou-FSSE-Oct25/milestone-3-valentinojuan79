"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NavigationBar() {
  const { user, setUser, totalItems, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    useCartStore.persist.rehydrate();
    setMounted(true);
  }, []);

  const handleLogout = () => {
    setUser(null);
    clearCart();
    document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/");
    router.refresh();
  };

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white h-16">
        <div className="mx-auto max-w-7xl h-full flex items-center px-4">
          <span className="font-bold text-2xl text-gray-900">
            Revo<span className="text-orange-600">Shop</span>
          </span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          Revo<span className="text-orange-600">Shop</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/products"
            className="text-sm font-medium text-gray-700 hover:text-orange-600 transition"
          >
            Shop
          </Link>

          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="text-xs font-semibold text-orange-600 border border-orange-600 px-3 py-1 rounded hover:bg-orange-600 hover:text-white transition"
            >
              ADMIN
            </Link>
          )}

          <Link href="/cart" className="relative p-2 text-xl hover:opacity-70 transition">
            🛒
            {totalItems() > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white">
                {totalItems()}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-4 border-l border-gray-200 pl-6">
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500 font-medium">
                  Welcome
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {user.name}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="rounded px-3 py-2 text-xs font-medium text-white bg-red-600 hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded px-6 py-2 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}