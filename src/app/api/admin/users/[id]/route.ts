import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth";
import { cookies } from "next/headers";

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = await verifyJwt(token);
    if (!payload || payload.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden: Superadmin only" }, { status: 403 });
    }

    // hapus progress dan sertifikat agar bisa delete user (cascade manual jika tidak diset DB)
    await prisma.progress.deleteMany({ where: { userId: params.id } });
    await prisma.certificate.deleteMany({ where: { userId: params.id } });

    await prisma.user.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = await verifyJwt(token);
    if (!payload || payload.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden: Superadmin only" }, { status: 403 });
    }

    const { 
      name, nip, skpdId,
      jenisJabatan, golongan, tingkatPendidikan, programStudi, eselon, jenisKelamin
    } = await request.json();

    if (!name || !nip || !skpdId) {
      return NextResponse.json({ error: "Nama, NIP, dan SKPD wajib diisi" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: { 
        name, nip, skpdId,
        jenisJabatan, golongan, tingkatPendidikan, programStudi, eselon, jenisKelamin
      }
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
