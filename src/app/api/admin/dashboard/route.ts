import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const token = (await cookies()).get("auth-token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = await verifyJwt(token);
    if (!payload || (payload.role !== "SUPER_ADMIN" && payload.role !== "ADMIN_SKPD")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const [usersCount, completedModules, scoreAgg, certificatesCount, skpds] = await Promise.all([
      prisma.user.count({ where: { role: "PEGAWAI" } }),
      prisma.progress.count({ where: { status: "SELESAI" } }),
      prisma.progress.aggregate({ _avg: { score: true }, where: { status: "SELESAI" } }),
      prisma.certificate.count({ where: { status: "DISETUJUI" } }),
      prisma.skpd.findMany({
        include: { _count: { select: { users: true } } }
      })
    ]);

    const averageScore = scoreAgg._avg.score ? Math.round(scoreAgg._avg.score * 10) / 10 : 0;

    let totalSkpdUsers = 0;
    skpds.forEach(s => totalSkpdUsers += s._count.users);

    const skpdDistribution = skpds
      .filter(s => s._count.users > 0)
      .map((s, idx) => {
        const colors = ["bg-primary", "bg-green-500", "bg-amber-500", "bg-purple-500", "bg-blue-400"];
        return {
          name: s.name,
          percentage: totalSkpdUsers > 0 ? Math.round((s._count.users / totalSkpdUsers) * 100) : 0,
          color: colors[idx % colors.length]
        };
      })
      .sort((a, b) => b.percentage - a.percentage);

    return NextResponse.json({
      metrics: {
        activeUsers: usersCount,
        completedModules,
        averageScore,
        certificatesCount
      },
      skpdDistribution
    });

  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
