"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    description: "",
    categoryId: 1,
    images: [""],
  });

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) =>
        setFormData({
          title: data.title,
          price: data.price,
          description: data.description,
          categoryId: data.category?.id ?? 1,
          images: [data.images?.[0]?.replace(/[\[\]\"]/g, "") ?? ""],
        })
      );
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.title,
        price: Number(formData.price),
        description: formData.description,
        categoryId: Number(formData.categoryId),
        images: [formData.images[0]].filter((img) => img && img.trim() !== ""),
      }),
    });
    if (res.ok) {
      alert("Updated!");
      router.push("/admin");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-8 rounded-lg border border-gray-200 space-y-5"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Edit <span className="text-orange-600">Product</span>
          </h2>
          <p className="text-gray-500 text-xs mt-1">Product ID: {id}</p>
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 p-3 rounded text-gray-900 outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 p-3 rounded text-gray-900 outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full bg-white border border-gray-300 p-3 rounded text-gray-900 outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 text-sm font-medium">Category ID</label>
          <input
            type="number"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 p-3 rounded text-gray-900 outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 text-sm font-medium">Image URL</label>
          <input
            type="text"
            value={formData.images[0]}
            onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
            className="w-full bg-white border border-gray-300 p-3 rounded text-gray-900 outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 py-3 rounded font-semibold text-white hover:bg-orange-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}