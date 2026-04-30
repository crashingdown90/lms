import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Filter, PlayCircle, BookOpen, User } from "lucide-react";
import Link from "next/link";

export default function KatalogPage() {
  const courses = [
    {
      id: 1,
      title: "Tata Kelola Pemerintahan yang Baik (Good Corporate Governance)",
      instructor: "Dr. Budi Santoso, M.Si",
      duration: "4 Jam 30 Menit",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Kepemimpinan",
    },
    {
      id: 2,
      title: "Etika Pelayanan Publik Berbasis Digital",
      instructor: "Dra. Siti Aminah",
      duration: "2 Jam 15 Menit",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Pelayanan Publik",
    },
    {
      id: 4,
      title: "Pencegahan Korupsi di Instansi Pemerintah",
      instructor: "KPK RI & Inspektorat Daerah",
      duration: "3 Jam 45 Menit",
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Integritas",
    },
    {
      id: 5,
      title: "Literasi Keamanan Digital Bagi ASN",
      instructor: "BSSN & Diskominfo",
      duration: "2 Jam",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Teknologi",
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
