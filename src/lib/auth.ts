import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function fetchUsers() {
  const res = await fetch("https://fakestoreapi.com/users");

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

export async function requireAdmin(): Promise<NextResponse | null> {
  const cookieStore = await cookies();
  const role = cookieStore.get("user_role")?.value;

  if (!role) {
    return NextResponse.json({ message: "Unauthorized – please log in." }, { status: 401 });
  }

  if (role !== "admin") {
    return NextResponse.json({ message: "Forbidden – admin access required." }, { status: 403 });
  }

  return null;
}