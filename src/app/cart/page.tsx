"use client";
import { useCartStore } from "@/lib/store";
import Link from "next/link"; // Import Link
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!mounted) return null;

  return (
    <div className="py-12">
      <h1 className="text-4xl font-black mb-10 border-l-4 border-revou-yellow pl-4">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-slate-900 rounded-3xl border border-slate-800">
          <p className="text-slate-400 text-lg mb-6">Your cart is currently empty.</p>
          <Link href="/" className="bg-revou-yellow text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* List Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-6 bg-slate-900 p-6 rounded-3xl border border-slate-800">
                <img src={item.images[0].replace(/[\[\]\"]/g, "")} alt={item.title} className="w-24 h-24 object-cover rounded-2xl" />
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  <p className="text-revou-yellow font-black">${item.price} x {item.quantity}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 h-fit">
            <h2 className="text-xl font-bold mb-6 text-white">Order Summary</h2>
            <div className="space-y-4 border-b border-slate-800 pb-6">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shipping</span>
                <span className="text-green-500">FREE</span>
              </div>
            </div>
            <div className="flex justify-between py-6 text-xl font-black text-white">
              <span>Total</span>
              <span className="text-revou-yellow">${totalPrice}</span>
            </div>
            
            {/* PERBAIKAN: Button diubah menjadi Link ke /checkout */}
            <Link 
              href="/checkout" 
              className="block w-full text-center bg-revou-yellow text-slate-900 py-4 rounded-xl font-black hover:bg-yellow-400 transition active:scale-95"
            >
              CHECKOUT NOW
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}