"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const [form, setForm] = useState({ title: "", price: 0, description: "New product description", categoryId: 1, images: ["https://placehold.co/600x400"] });
  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("Product Added!");
      router.refresh();
      router.push("/admin");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-20 px-4">
      <form onSubmit={handleSubmit} className="bg-slate-900 p-10 rounded-3xl border border-slate-800 space-y-6">
        <h2 className="text-2xl font-black text-white italic">ADD <span className="text-revou-yellow">PRODUCT</span></h2>
        <input type="text" placeholder="Title" required className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-revou-yellow" onChange={e => setForm({...form, title: e.target.value})} />
        <input type="number" placeholder="Price" required className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-revou-yellow" onChange={e => setForm({...form, price: Number(e.target.value)})} />
        <button type="submit" className="w-full bg-revou-yellow py-4 rounded-xl font-black text-slate-900">CREATE PRODUCT</button>
      </form>
    </div>
  );
}