"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const res = await fetch(
      "https://api.escuelajs.co/api/v1/products?offset=0&limit=20",
    );
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts(products.filter((p: any) => p.id !== id));
      alert("Product deleted!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin <span className="text-orange-600">Panel</span>
          </h1>
          <Link
            href="/admin/products/new"
            className="bg-orange-600 px-6 py-2 rounded font-semibold text-white hover:bg-orange-700 transition"
          >
            + Add Product
          </Link>
        </div>

        <div className="grid gap-3">
          {products.map((p: any) => (
            <div
              key={p.id}
              className="flex items-center justify-between bg-white p-4 rounded border border-gray-200 hover:border-gray-300 transition"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 overflow-hidden rounded">
                  <img
                    src={
                      p.images?.[0]?.replace(/[\[\]\"]/g, "") || "https://placehold.co/600x400"
                    }
                    alt={p.title}
                    className="w-12 h-12 object-cover"
                  />
                </div>
                <span className="text-gray-900 font-medium text-sm truncate max-w-xs">
                  {p.title}
                </span>
              </div>
              <div className="flex gap-4">
                <Link
                  href={`/admin/products/${p.id}/edit`}
                  className="text-blue-600 font-medium text-sm hover:text-blue-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-600 font-medium text-sm hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
