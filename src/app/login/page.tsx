"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCartStore } from "@/lib/store";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useCartStore((state) => state.setUser);

  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setStatusMsg("Authenticating...");

    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid email or password.");

      const data = await res.json();
      document.cookie = `access_token=${data.access_token}; path=/; max-age=3600; SameSite=Lax`;

      setStatusMsg("Fetching Profile...");

      const profileRes = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
        headers: { Authorization: `Bearer ${data.access_token}` },
      });
      
      if (!profileRes.ok) throw new Error("Failed to fetch user profile.");
      
      const userData = await profileRes.json();
      document.cookie = `user_role=${userData.role}; path=/; max-age=3600; SameSite=Lax`;

      setUser(userData);
      setStatusMsg("Redirecting...");
      
      const callbackUrl = searchParams.get("callbackUrl") || "/";
      router.push(callbackUrl);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-12 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-revou-yellow border-t-transparent"></div>
            <p className="mt-4 font-black text-white animate-pulse uppercase tracking-widest text-xs">
              {statusMsg}
            </p>
          </div>
        )}

        <div className="text-center">
          <h2 className="text-3xl font-black text-white italic">Welcome Back</h2>
          {error && (
            <p className="mt-4 text-red-500 text-sm font-bold bg-red-500/10 p-2 rounded-lg border border-red-500/20">
              {error}
            </p>
          )}
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-400">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              placeholder="john@mail.com"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-revou-yellow transition disabled:opacity-50"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-400">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-revou-yellow transition disabled:opacity-50"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full rounded-xl bg-revou-yellow py-4 text-sm font-black text-slate-900 hover:bg-yellow-400 transition active:scale-95 shadow-lg shadow-yellow-900/20 disabled:grayscale"
          >
            {isLoading ? "PLEASE WAIT..." : "SIGN IN"}
          </button>
        </form>
      </div>
    </div>
  );
}