import type { Metadata } from "next";
import { Bungee_Spice, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar"; // Sesuaikan path alias kamu
import Footer from "@/components/footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

const bungee = Bungee_Spice({
  weight: ["400"],
  variable: "--font-bungee",
})

export const metadata: Metadata = {
  title: "RevoShop",
  description: "E-commerce Milestone 3",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${bungee.variable} bg-slate-50 text-slate-900`}>
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 min-h-[80vh]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}