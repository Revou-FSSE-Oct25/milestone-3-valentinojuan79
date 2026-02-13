import { NextResponse } from "next/server";

const BASE_URL = "https://api.escuelajs.co/api/v1/products";

// Handler untuk UPDATE (PUT)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const res = await fetch(`${BASE_URL}/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Gagal mengupdate produk" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Update Error" }, { status: 500 });
  }
}

// Handler untuk DELETE
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(`${BASE_URL}/${params.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Gagal menghapus produk" },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true, message: "Produk berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ message: "Delete Error" }, { status: 500 });
  }
}