import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PlayCircle, Clock, BookOpen, User, Star, CheckCircle, FileText, MonitorPlay, Users, Award, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth";
import { cookies } from "next/headers";
import EnrollButton from "@/components/EnrollButton";

export default async function SyllabusPage({ params }: { params: { id: string } }) {
  const dbCourse = await prisma.course.findUnique({
    where: { id: params.id }
  });

  if (!dbCourse) {
    return <div className="min-h-screen flex items-center justify-center">Materi tidak ditemukan.</div>;
  }

  // Cek otorisasi user (opsional: bisa digunakan untuk UI yang berbeda)
  const token = (await cookies()).get("auth-token")?.value;
  let isEnrolled = false;
  if (token) {
    const payload = await verifyJwt(token);
    if (payload) {
      const progress = await prisma.progress.findUnique({
        where: { userId_courseId: { userId: payload.id as string, courseId: dbCourse.id } }
      });
      if (progress) isEnrolled = true;
    }
  }

  const course = {
    id: dbCourse.id,
    title: dbCourse.title,
    instructor: {
      name: "Dr. Budi Santoso, M.Si",
      title: "Widyaiswara Ahli Utama BKPSDM",
      image: "https://ui-avatars.com/api/?name=Budi+Santoso&background=1e40af&color=fff&size=200"
    },
    duration: "4 Jam 30 Menit",
    lessons: 12,
    students: "1.245",
    rating: 4.8,
    reviews: 320,
    category: "Kompetensi Manajerial",
    image: "/images/Asset_kota/Asset 10.png",
    description: "Pelatihan ini dirancang khusus untuk Aparatur Sipil Negara (ASN) di lingkungan Pemerintah Kota Sukabumi guna memahami fundamental transformasi digital dalam birokrasi pemerintahan. Anda akan mempelajari bagaimana mengintegrasikan teknologi ke dalam pelayanan publik untuk mencapai tata kelola yang transparan, akuntabel, dan efisien.",
    objectives: [
      "Memahami konsep dasar E-Government dan Sistem Pemerintahan Berbasis Elektronik (SPBE).",
      "Mengimplementasikan budaya kerja digital yang aman dan produktif.",
      "Mampu menggunakan aplikasi-aplikasi manajemen kinerja terbaru.",
      "Meningkatkan kualitas pelayanan publik melalui pendekatan inovasi digital."
    ],
    curriculum: [
      { title: "Bab 1: Pendahuluan SPBE", duration: "45 Menit", type: "video" },
      { title: "Bab 2: Regulasi & Dasar Hukum Digitalisasi", duration: "60 Menit", type: "video" },
      { title: "Bab 3: Etika & Keamanan Siber Dasar", duration: "90 Menit", type: "video" },
      { title: "Bab 4: Studi Kasus: Implementasi Kota Pintar", duration: "45 Menit", type: "video" },
      { title: "Ujian Kuis Akhir Modul", duration: "30 Menit", type: "quiz" },
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      {/* HERO BANNER */}
      <div className="bg-slate-900 text-white pt-12 pb-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={course.image} alt="Background" className="w-full h-full object-cover opacity-20 mix-blend-overlay blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/katalog" className="inline-flex items-center gap-1 text-sm text-slate-300 hover:text-white mb-6 transition-colors">
            <ChevronLeft size={16} /> Kembali ke Katalog
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-wider mb-4 shadow-sm border border-primary-light/20">
                {course.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6 text-white drop-shadow-md">
                {course.title}
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl">
                {course.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
                  </div>
                  <span className="text-white font-bold">{course.rating}</span>
                  <span>({course.reviews} ulasan)</span>
                </div>
                <div className="flex items-center gap-2"><Users size={16} /> {course.students} ASN Terdaftar</div>
                <div className="flex items-center gap-2"><Clock size={16} /> {course.duration}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 w-full mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Instructor Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <img src={course.instructor.image} alt={course.instructor.name} className="w-16 h-16 rounded-full border-2 border-primary/20" />
              <div>
                <p className="text-xs text-muted font-bold uppercase tracking-widest mb-1">Disediakan Oleh</p>
                <h3 className="font-bold text-lg text-foreground leading-tight">{course.instructor.name}</h3>
                <p className="text-sm text-slate-500">{course.instructor.title}</p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Apa yang akan Anda pelajari?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-success shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-600 leading-relaxed">{obj}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border">
              <div className="flex justify-between items-end mb-6 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Daftar Isi Materi</h2>
                  <p className="text-sm text-muted mt-1">{course.lessons} Sub-bab • Total durasi {course.duration}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {course.curriculum.map((item, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        {item.type === 'video' ? <PlayCircle size={18} /> : <FileText size={18} />}
                      </div>
                      <h4 className="font-semibold text-foreground text-sm sm:text-base">{item.title}</h4>
                    </div>
                    <span className="text-xs font-bold text-muted bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
                      {item.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR (Sticky Enrollment Card) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-border shadow-xl sticky top-24 overflow-hidden">
              <div className="h-48 relative bg-slate-900 group cursor-pointer border-b border-border">
                <img src={course.image} alt="Trailer" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <PlayCircle size={32} className="text-white" />
                  </div>
                  <span className="text-white font-bold text-sm drop-shadow-md">Tonton Cuplikan</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-center gap-2 text-success bg-green-50 px-4 py-2 rounded-lg font-bold text-sm border border-green-100 mb-6">
                  <Award size={18} /> Bersertifikat Resmi BKPSDM
                </div>
                
                <p className="text-3xl font-black text-foreground text-center mb-6">Gratis <span className="text-sm font-normal text-muted">/ Khusus ASN</span></p>
                
                <EnrollButton courseId={course.id} isEnrolled={isEnrolled} />
                <p className="text-center text-xs text-muted mb-6">Materi ini diwajibkan untuk dipelajari tahun ini.</p>
                
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <h4 className="font-bold text-sm text-foreground">Fasilitas Pelatihan:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-slate-600"><MonitorPlay size={16} className="text-primary"/> Akses 24/7 di semua perangkat</li>
                    <li className="flex items-center gap-3 text-sm text-slate-600"><FileText size={16} className="text-primary"/> Ujian Kuis Interaktif</li>
                    <li className="flex items-center gap-3 text-sm text-slate-600"><Award size={16} className="text-primary"/> Sertifikat format PDF</li>
                    <li className="flex items-center gap-3 text-sm text-slate-600"><Clock size={16} className="text-primary"/> Diakui sebagai 4 JP (Jam Pelajaran)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
