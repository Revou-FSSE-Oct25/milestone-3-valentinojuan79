export async function fetchUsers() {
  const res = await fetch("https://fakestoreapi.com/users");

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}
