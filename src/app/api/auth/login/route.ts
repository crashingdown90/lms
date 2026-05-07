import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signJwt } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "NIP dan Kata Sandi wajib diisi" }, { status: 400 });
    }

    // Cari user berdasarkan NIP
    const user = await prisma.user.findUnique({
      where: { nip: username },
    });

    if (!user) {
      return NextResponse.json({ error: "NIP atau Kata Sandi salah" }, { status: 401 });
    }

    // Verifikasi password
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return NextResponse.json({ error: "NIP atau Kata Sandi salah" }, { status: 401 });
    }

    // Generate JWT token
    const token = await signJwt({
      id: user.id,
      nip: user.nip,
      name: user.name,
      role: user.role,
      skpdId: user.skpdId,
    });

    const response = NextResponse.json({ 
      success: true, 
      user: { id: user.id, name: user.name, role: user.role } 
    });

    // Set cookie
    response.cookies.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 jam
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}
