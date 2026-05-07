import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = await verifyJwt(token);
    if (!payload || (payload.role !== "SUPER_ADMIN" && payload.role !== "ADMIN_SKPD")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      include: { skpd: true },
      orderBy: { createdAt: "desc" }
    });

    const mappedUsers = users.map(u => {
      const nameParts = u.name.split(" ");
      const initials = nameParts.length > 1 
        ? nameParts[0].charAt(0) + nameParts[1].charAt(0)
        : nameParts[0].substring(0, 2);

      return {
        id: u.id,
        nip: u.nip,
        name: u.name,
        role: u.jenisJabatan || "Pegawai ASN", 
        skpd: u.skpd.name,
        jp: u.totalJp,
        target: u.targetJp,
        status: u.status,
        lastLogin: "Baru Saja",
        color: u.role === "SUPER_ADMIN" ? "from-accent to-yellow-500" : "from-primary to-accent",
        initials: initials.toUpperCase(),
        systemRole: u.role,
        // New fields
        jenisJabatan: u.jenisJabatan || "",
        golongan: u.golongan || "",
        tingkatPendidikan: u.tingkatPendidikan || "",
        programStudi: u.programStudi || "",
        eselon: u.eselon || "",
        jenisKelamin: u.jenisKelamin || ""
      };
    });

    return NextResponse.json(mappedUsers);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
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

    const exist = await prisma.user.findUnique({ where: { nip } });
    if (exist) return NextResponse.json({ error: "NIP sudah terdaftar" }, { status: 400 });

    const passwordHash = await bcrypt.hash("pegawai", 10);

    const newUser = await prisma.user.create({
      data: {
        nip,
        name,
        passwordHash,
        role: "PEGAWAI",
        skpdId,
        jenisJabatan, 
        golongan, 
        tingkatPendidikan, 
        programStudi, 
        eselon, 
        jenisKelamin
      }
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
