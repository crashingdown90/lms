import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Filter, PlayCircle, BookOpen, User } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function KatalogPage() {
  const dbCourses = await prisma.course.findMany({
    where: { status: "PUBLISHED" }
  });

  const courses = dbCourses.map(c => ({
    id: c.id,
    title: c.title,
    instructor: "Admin BKPSDM",
    duration: `${c.jpCredit} JP`,
    image: c.category === "Pelayanan Publik" ? "/images/Asset_kota/Asset 2.png" : "/images/Asset_kota/Asset 3.png",
    category: c.category
  }));

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Katalog Pelatihan</h1>
          <p className="text-muted">Temukan berbagai modul pelatihan untuk meningkatkan kompetensi Anda.</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
            <input 
              type="text" 
              placeholder="Cari pelatihan berdasarkan judul atau nama pemateri..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-border rounded-xl text-foreground font-semibold hover:bg-slate-50 transition-colors shadow-sm">
            <Filter size={20} /> Filter Kategori
          </button>
        </div>

        {/* Grid Katalog */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-subtle transition-all duration-300 group flex flex-col hover:-translate-y-1">
              <div className="h-40 relative overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm text-foreground text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wide">
                    {course.category}
                  </span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-[11px] text-muted mb-2 font-semibold flex items-center gap-1.5">
                  <User size={12} /> {course.instructor}
                </p>
                <h4 className="font-bold text-foreground text-base mb-4 line-clamp-2 leading-snug group-hover:text-primary transition-colors">{course.title}</h4>
                
                <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs font-semibold text-muted flex items-center gap-1">
                    <PlayCircle size={14} /> {course.duration}
                  </span>
                  <Link href={`/katalog/${course.id}`} className="text-xs font-bold bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors shadow-sm flex items-center gap-1">
                    <BookOpen size={14} /> Daftar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
