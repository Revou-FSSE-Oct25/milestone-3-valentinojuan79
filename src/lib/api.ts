// Gunakan URL dasar sampai v1 saja
const BASE_URL = "https://api.escuelajs.co/api/v1";

export async function fetchProducts() {
  // Sekarang URL akan menjadi https://api.escuelajs.co/api/v1/products
  const res = await fetch(`${BASE_URL}/products`);
  
  if (!res.ok) throw new Error("Failed to get products");
  
  const data = await res.json();
  
  // TIPS: Karena API Platzi sering berantakan (seperti di screenshot-mu),
  // kita filter produk yang tidak punya gambar atau data rusak agar web tidak crash.
  return data.filter((p: any) => 
    p.images && 
    p.images.length > 0 && 
    p.images[0] !== "" &&
    p.category
  );
}

export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) throw new Error("Failed to get categories");
  return res.json();
}