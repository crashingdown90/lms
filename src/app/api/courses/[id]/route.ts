import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const course = await prisma.course.findUnique({
      where: { id: params.id },
    });

    if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });

    let isEnrolled = false;
    let progress = null;

    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (token) {
      const payload = await verifyJwt(token);
      if (payload) {
        progress = await prisma.progress.findUnique({
          where: { userId_courseId: { userId: payload.id as string, courseId: course.id } }
        });
        if (progress) isEnrolled = true;
      }
    }

    return NextResponse.json({ course, isEnrolled, progress });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
