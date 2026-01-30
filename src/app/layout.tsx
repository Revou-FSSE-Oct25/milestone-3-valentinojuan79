import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "RevoShop | E-commerce",
  description: "Your one-stop shop for the latest and greatest products.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="font-sans antialiased">
        <NavigationBar />
        <main className="mx-auto max-w-7xl px-4 py-8 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}