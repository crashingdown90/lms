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
    if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { id: payload.id as string },
      include: {
        progress: { include: { course: true } },
        certificates: true
      }
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const allCourses = await prisma.course.findMany({
      where: { status: "PUBLISHED" }
    });

    const mappedCourses = allCourses.map(course => {
      const userProgress = user.progress.find(p => p.courseId === course.id);
      return {
        id: course.id,
        title: course.title,
        instructor: "Admin BKPSDM",
        duration: `${course.jpCredit} JP`,
        progress: userProgress ? userProgress.score || 10 : 0, // Mock 10% progress if started
        status: userProgress ? (userProgress.status === 'SELESAI' ? 'completed' : 'ongoing') : 'not_started',
        image: course.category === 'Pelayanan Publik' ? '/images/Asset_kota/Asset 2.png' : '/images/Asset_kota/Asset 3.png'
      };
    });

    return NextResponse.json({
      user: {
        name: user.name.split(" ")[0], // Panggil nama depan
        activeCourses: user.progress.filter(p => p.status !== 'SELESAI').length,
        completedCourses: user.progress.filter(p => p.status === 'SELESAI').length,
        certificates: user.certificates.length
      },
      courses: mappedCourses
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
