const BASE_URL = "https://api.escuelajs.co/api/v1";

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  
  if (!res.ok) throw new Error("Failed to get products");
  
  const data = await res.json();

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