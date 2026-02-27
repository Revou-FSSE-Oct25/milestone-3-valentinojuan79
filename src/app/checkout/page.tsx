"use client";

import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const user = useCartStore((state) => state.user);
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || "",
    address: "",
    phoneNumber: "",
    paymentMethod: "bank_transfer"
  });

  useEffect(() => {
    setMounted(true);
    if (cart.length === 0 && !isSuccess) {
      router.push("/products");
    }
  }, [cart, isSuccess, router]);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (!mounted) return null;

  if (isSuccess) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600">✓</div>
        <h1 className="text-3xl font-bold text-green-600">Order Confirmed!</h1>
        <p className="mt-4 text-gray-600 max-w-md">
          Thank you for your purchase, <span className="font-semibold text-gray-900">{shippingInfo.fullName}</span>! 
          Your order is being processed and will be shipped soon.
        </p>
        <Link href="/products" className="mt-10 rounded px-8 py-3 font-semibold text-white bg-orange-600 hover:bg-orange-700 transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <form onSubmit={handleConfirmOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/*SHIPPING DETAILS*/}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Shipping Address</h2>
            <div className="space-y-4">
              <input 
                type="text" required placeholder="Full Name"
                value={shippingInfo.fullName}
                onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition"
              />
              <input 
                type="tel" required placeholder="Phone Number"
                value={shippingInfo.phoneNumber}
                onChange={(e) => setShippingInfo({...shippingInfo, phoneNumber: e.target.value})}
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition"
              />
              <textarea 
                required rows={3} placeholder="Full Address"
                value={shippingInfo.address}
                onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition resize-none"
              />
            </div>
          </div>
        </div>

        {/*PAYMENT METHOD*/}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Payment Method</h2>
            <div className="space-y-3">
              {[
                { id: 'bank_transfer', label: 'Bank Transfer', icon: '🏦' },
                { id: 'e_wallet', label: 'E-Wallet', icon: '📱' },
                { id: 'credit_card', label: 'Credit Card', icon: '💳' },
              ].map((method) => (
                <label 
                  key={method.id}
                  className={`flex items-center justify-between cursor-pointer rounded border p-3 transition ${
                    shippingInfo.paymentMethod === method.id 
                    ? 'border-orange-600 bg-orange-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{method.icon}</span>
                    <span className="font-medium text-sm text-gray-900">{method.label}</span>
                  </div>
                  <input 
                    type="radio" 
                    name="payment"
                    className="accent-orange-600"
                    checked={shippingInfo.paymentMethod === method.id}
                    onChange={() => setShippingInfo({...shippingInfo, paymentMethod: method.id})}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/*ORDER SUMMARY*/}
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-gray-200 bg-white p-6 sticky top-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5 border-b border-gray-200 pb-4">Order Summary</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 line-clamp-1">{item.title} x{item.quantity}</span>
                  <span className="text-gray-900 font-semibold">${item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Total</span>
                <span className="text-2xl font-bold text-orange-600">${totalPrice}</span>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isProcessing}
              className="w-full rounded bg-orange-600 hover:bg-orange-700 py-3 font-semibold text-white transition disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : "Confirm Order"}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}