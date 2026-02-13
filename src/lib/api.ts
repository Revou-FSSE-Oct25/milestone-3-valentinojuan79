const BASE_URL = "https://api.escuelajs.co/api/v1";

export async function fetchProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      next: { revalidate: 3600 }, // SSG revalidation 1 jam
    });

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("Products not found.");
      }
      if (res.status >= 500) {
        throw new Error("Server error. Please try again later.");
      }
      throw new Error("Failed to fetch products.");
    }

    const data = await res.json();

    return data.filter((p: any) =>
      p.images?.length > 0 &&
      p.images[0] !== "" &&
      p.category
    );

  } catch (error) {
    throw error;
  }
}


export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) throw new Error("Failed to get categories");
  return res.json();
}