"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const res = await fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=20");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts(products.filter((p: any) => p.id !== id));
      alert("Product deleted!");
    }
  };

  // 1. GUNAKAN STATE LOADING (Agar tidak "never read")
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-revou-yellow border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-950 rounded-2xl min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-white italic">ADMIN <span className="text-revou-yellow">PANEL</span></h1>
          <Link href="/admin/products/new" className="bg-revou-yellow px-6 py-3 rounded-xl font-black text-slate-900">+ ADD NEW</Link>
        </div>
        
        <div className="grid gap-4">
          {products.map((p: any) => (
            <div key={p.id} className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-4">
                {/* 2. GUNAKAN KOMPONEN IMAGE (Agar tidak "never read") */}
                <div className="relative w-12 h-12 overflow-hidden rounded-lg">
                  <Image 
                    src={p.images?.[0]?.replace(/[\[\]\"]/g, "") || "/fallback.png"} 
                    alt={p.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-white font-bold text-sm truncate max-w-xs">{p.title}</span>
              </div>
              <div className="flex gap-4">
                <Link href={`/admin/products/${p.id}/edit`} className="text-blue-400 font-black text-xs">EDIT</Link>
                <button onClick={() => handleDelete(p.id)} className="text-red-500 font-black text-xs">DELETE</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}