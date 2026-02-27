"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCartStore } from "@/lib/store";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useCartStore((state) => state.setUser);

  const handleLogin = async (e: React.FormEvent) => {
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
      <div className="w-full max-w-md rounded-lg border border-gray-300 bg-white p-8 relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-600 border-t-transparent"></div>
            <p className="mt-4 font-semibold text-gray-900 text-sm">
              {statusMsg}
            </p>
          </div>
        )}

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          {error && (
            <p className="mt-4 text-red-600 text-sm font-medium bg-red-50 p-2 rounded border border-red-200">
              {error}
            </p>
          )}
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              placeholder="john@mail.com"
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition disabled:opacity-50"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              placeholder="••••••••"
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition disabled:opacity-50"
              required
            />
          </div>
          <div className="rounded border border-gray-200 bg-gray-50 p-3 space-y-2 text-xs text-gray-600">
            <p className="font-semibold text-gray-900">Demo Accounts</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>👤 User:</span>
                <span className="font-mono">john@mail.com / changeme</span>
              </div>
              <div className="flex justify-between">
                <span>🛡️ Admin:</span>
                <span className="font-mono">admin@mail.com / admin123</span>
              </div>
            </div>
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full rounded py-3 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 transition disabled:opacity-50"
          >
            {isLoading ? "Please wait..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent"></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}