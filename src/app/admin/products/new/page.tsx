"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    price: 0,
    description: "",
    categoryId: 18,
    images: [""],
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        categoryId: Number(form.categoryId),
        images: form.images.filter((img) => img.trim() !== ""),
      }),
    });
    if (res.ok) {
      alert("Product Added!");
      router.refresh();
      router.push("/admin");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg border border-gray-200 space-y-5"
      >
        <h2 className="text-2xl font-bold text-gray-900">
          Add <span className="text-orange-600">Product</span>
        </h2>

        <div className="space-y-2">
          <label className="text-gray-700 text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Product title"
            required
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 p-3 rounded text-gray-900 outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            placeholder="0"
            required
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 p-3 rounded text-gray-900 outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 text-sm font-medium">Description</label>
          <textarea
            name="description"
            placeholder="Product description"
            required
            rows={4}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 p-3 rounded text-gray-900 outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 text-sm font-medium">Category ID</label>
          <input
            type="number"
            name="categoryId"
            defaultValue={18}
            required
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 p-3 rounded text-gray-900 outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 text-sm font-medium">Image URL</label>
          <input
            type="text"
            name="images"
            placeholder="https://example.com/image.jpg"
            onChange={(e) => setForm({ ...form, images: [e.target.value] })}
            className="w-full bg-white border border-gray-300 p-3 rounded text-gray-900 outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 py-3 rounded font-semibold text-white hover:bg-orange-700 transition"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}