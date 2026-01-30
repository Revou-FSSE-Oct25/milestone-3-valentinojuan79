"use client";

import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, clearCart, user } = useCartStore();
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
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-4xl text-green-500 animate-bounce">✓</div>
        <h1 className="text-4xl font-black text-green-500">ORDER SUCCESS!</h1>
        <p className="mt-4 text-slate-400 max-w-md">
          Thank You for your purchase, <span className="text-revou-yellow font-bold">{shippingInfo.fullName}</span>! 
          Your order is being processed and will be shipped to your address soon.
        </p>
        <Link href="/products" className="mt-10 rounded-xl bg-revou-yellow px-10 py-4 font-black text-slate-900 hover:bg-yellow-400 transition">
          BACK TO SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl py-12 px-4">
      <h1 className="text-4xl font-black text-white italic mb-10 tracking-tighter uppercase">
        Final <span className="text-revou-yellow">Checkout</span>
      </h1>

      <form onSubmit={handleConfirmOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/*SHIPPING DETAILS*/}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-revou-yellow">01</span> Shipping
            </h2>
            <div className="space-y-4">
              <input 
                type="text" required placeholder="Full Name"
                value={shippingInfo.fullName}
                onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-revou-yellow transition"
              />
              <input 
                type="tel" required placeholder="Phone Number"
                value={shippingInfo.phoneNumber}
                onChange={(e) => setShippingInfo({...shippingInfo, phoneNumber: e.target.value})}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-revou-yellow transition"
              />
              <textarea 
                required rows={3} placeholder="Full Address"
                value={shippingInfo.address}
                onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-revou-yellow transition resize-none"
              />
            </div>
          </div>
        </div>

        {/*PAYMENT METHOD*/}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-revou-yellow">02</span> Payment
            </h2>
            <div className="space-y-3">
              {[
                { id: 'bank_transfer', label: 'Bank Transfer', icon: '🏦' },
                { id: 'e_wallet', label: 'E-Wallet', icon: '📱' },
                { id: 'credit_card', label: 'Credit Card', icon: '💳' },
              ].map((method) => (
                <label 
                  key={method.id}
                  className={`flex items-center justify-between cursor-pointer rounded-2xl border p-4 transition ${
                    shippingInfo.paymentMethod === method.id 
                    ? 'border-revou-yellow bg-revou-yellow/5' 
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{method.icon}</span>
                    <span className="font-bold text-sm text-white">{method.label}</span>
                  </div>
                  <input 
                    type="radio" 
                    name="payment"
                    className="accent-revou-yellow h-4 w-4"
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
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Summary</h2>
            <div className="space-y-3 max-h-37.5 overflow-y-auto mb-6 pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-xs">
                  <span className="text-slate-400 line-clamp-1">{item.title} x{item.quantity}</span>
                  <span className="text-white font-bold">${item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-slate-800 pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-bold">Total</span>
                <span className="text-2xl font-black text-revou-yellow">${totalPrice}</span>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isProcessing}
              className="w-full rounded-2xl bg-white py-4 font-black text-slate-900 hover:bg-revou-yellow transition active:scale-95 disabled:opacity-50"
            >
              {isProcessing ? "PROCESSING..." : "CONFIRM ORDER"}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}