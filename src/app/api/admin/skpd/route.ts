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

    const skpds = await prisma.skpd.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json(skpds);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
