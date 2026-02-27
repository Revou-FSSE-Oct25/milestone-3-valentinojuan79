"use client";
import { useCartStore } from "@/lib/store";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  if (!mounted) return null;

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-lg mb-6">Your cart is empty.</p>
          <Link href="/" className="bg-orange-600 text-white px-6 py-2 rounded font-semibold hover:bg-orange-700 transition">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* List Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
                <img 
                  src={item.images?.[0]?.replace(/[\[\]\"]/g, "") || "https://placehold.co/600x400"} 
                  alt={item.title} 
                  className="w-20 h-20 object-cover rounded" 
                />
                <div className="flex-1">
                  <h3 className="text-gray-900 font-semibold">{item.title}</h3>
                  <p className="text-orange-600 font-semibold">${item.price} × {item.quantity}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-700 font-medium transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 h-fit">
            <h2 className="text-xl font-bold mb-6 text-gray-900">Order Summary</h2>
            <div className="space-y-3 border-b border-gray-200 pb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
            </div>
            <div className="flex justify-between py-4 text-lg font-bold text-gray-900">
              <span>Total</span>
              <span className="text-orange-600">${totalPrice}</span>
            </div>
            
            <Link 
              href="/checkout" 
              className="block w-full text-center bg-orange-600 text-white py-3 rounded font-semibold hover:bg-orange-700 transition"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}