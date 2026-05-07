import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const token = (await cookies()).get("auth-token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = await verifyJwt(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { status, score, videoProgress } = await request.json();
    const courseId = params.id;
    const userId = payload.id as string;

    const progress = await prisma.progress.upsert({
      where: { userId_courseId: { userId, courseId } },
      update: { 
        status: status || undefined,
        score: score !== undefined ? score : undefined
      },
      create: { 
        userId, 
        courseId, 
        status: status || "SEDANG_BELAJAR", 
        score: score || 0 
      }
    });

    if (status === "SELESAI") {
      // Create certificate automatically
      await prisma.certificate.create({
        data: {
          certNumber: `CERT-${Date.now()}-${userId.substring(0,4)}`,
          userId,
          courseId,
          status: "DISETUJUI"
        }
      });
      
      // Update User JP
      const course = await prisma.course.findUnique({ where: { id: courseId } });
      if (course) {
        await prisma.user.update({
          where: { id: userId },
          data: { totalJp: { increment: course.jpCredit } }
        });
      }
    }

    return NextResponse.json({ success: true, progress });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
