import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api.escuelajs.co/api/v1/products";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const res = await fetch(`${BASE_URL}/${id}`, {
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const res = await fetch(`${BASE_URL}/${id}`, {
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