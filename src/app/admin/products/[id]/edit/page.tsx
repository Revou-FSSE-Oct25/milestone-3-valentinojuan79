"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProduct() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then(res => res.json())
      .then(data => setTitle(data.title));
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (res.ok) {
      alert("Updated!");
      router.push("/admin");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-20 px-4">
      <form onSubmit={handleUpdate} className="bg-slate-900 p-10 rounded-3xl border border-slate-800 space-y-6">
        <h2 className="text-2xl font-black text-white italic">EDIT <span className="text-revou-yellow">PRODUCT</span></h2>
        <p className="text-slate-500 text-xs font-bold uppercase">Product ID: {id}</p>
        <input type="text" value={title} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-revou-yellow" onChange={e => setTitle(e.target.value)} />
        <button type="submit" className="w-full bg-white py-4 rounded-xl font-black text-slate-900 hover:bg-revou-yellow transition">SAVE CHANGES</button>
      </form>
    </div>
  );
}