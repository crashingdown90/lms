"use client";

import { useState } from "react";
import Link from "next/link";
import { PlayCircle, BookOpen, CheckCircle, Award, ChevronRight, Play, User, Calendar, Megaphone, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("semua");

  const courses = [
    {
      id: 1,
      title: "Tata Kelola Pemerintahan yang Baik (Good Corporate Governance)",
      instructor: "Dr. Budi Santoso, M.Si",
      duration: "4 Jam 30 Menit",
      progress: 75,
      status: "ongoing",
      image: "/images/Asset_kota/Asset 2.png"
    },
    {
      id: 2,
      title: "Etika Pelayanan Publik Berbasis Digital",
      instructor: "Dra. Siti Aminah",
      duration: "2 Jam 15 Menit",
      progress: 0,
      status: "not_started",
      image: "/images/Asset_kota/Asset 3.png"
    },
    {
      id: 3,
      title: "Manajemen Kinerja ASN 2026",
      instructor: "Andi Saputra, S.E.",
      duration: "3 Jam",
      progress: 100,
      status: "completed",
      image: "/images/Asset_kota/Asset 4.png"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Banner */}
        <section className="mb-8 sm:mb-10 bg-primary rounded-2xl p-6 sm:p-8 text-white shadow-subtle relative overflow-hidden">
          <div className="absolute inset-0 z-0">
             <img src="/images/Asset_kota/Asset 7.png" alt="" className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 z-0"></div>
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Selamat Pagi, Drefan! 👋</h2>
            <p className="text-primary-light max-w-2xl text-base sm:text-lg opacity-90">Mari tingkatkan kompetensi Anda hari ini. Anda memiliki 1 materi yang belum diselesaikan.</p>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="bg-card rounded-xl p-5 sm:p-6 shadow-subtle border border-border flex items-center gap-4 transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/30">
            <div className="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center flex-shrink-0">
              <BookOpen size={24} />
            </div>
            <div className="min-w-0">
              <p className="text-2xl sm:text-3xl font-bold text-foreground leading-none mb-1">2</p>
              <p className="text-xs sm:text-sm text-muted font-medium truncate">Pelatihan Aktif</p>
            </div>
          </div>
          <div className="bg-card rounded-xl p-5 sm:p-6 shadow-subtle border border-border flex items-center gap-4 transition-all hover:-translate-y-1 hover:shadow-md hover:border-accent/30">
            <div className="w-12 h-12 rounded-full bg-accent/20 text-[#141414] flex items-center justify-center flex-shrink-0">
              <CheckCircle size={24} />
            </div>
            <div className="min-w-0">
              <p className="text-2xl sm:text-3xl font-bold text-foreground leading-none mb-1">5</p>
              <p className="text-xs sm:text-sm text-muted font-medium truncate">Pelatihan Selesai</p>
            </div>
          </div>
          <div className="bg-card rounded-xl p-5 sm:p-6 shadow-subtle border border-border flex items-center gap-4 transition-all hover:-translate-y-1 hover:shadow-md hover:border-[#141414]/30">
            <div className="w-12 h-12 rounded-full bg-[#141414]/10 text-[#141414] flex items-center justify-center flex-shrink-0">
              <Award size={24} />
            </div>
            <div className="min-w-0">
              <p className="text-2xl sm:text-3xl font-bold text-foreground leading-none mb-1">3</p>
              <p className="text-xs sm:text-sm text-muted font-medium truncate">Sertifikat Diraih</p>
            </div>
          </div>
        </section>

        {/* Resume Course */}
        <section className="mb-10 sm:mb-12">
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
            Lanjutkan Belajar <ChevronRight size={20} className="text-muted" />
          </h3>
          <div className="bg-card rounded-2xl shadow-subtle border border-border overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
            <div className="md:w-[40%] lg:w-1/3 h-48 sm:h-56 md:h-auto bg-slate-200 relative shrink-0">
              <img 
                src={courses[0].image} 
                alt="Course Thumbnail" 
                className="w-full h-full object-cover"
              />
              <Link href="/course/1" className="absolute inset-0 bg-black/30 flex items-center justify-center group cursor-pointer transition-all hover:bg-black/40 backdrop-blur-[1px]">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary flex items-center justify-center text-white transform transition-transform group-hover:scale-110 shadow-xl border border-white/20">
                  <Play size={24} className="ml-1 sm:ml-2 sm:w-7 sm:h-7" />
                </div>
              </Link>
            </div>
            <div className="p-5 sm:p-8 flex flex-col justify-center flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                <span className="px-3 py-1 bg-primary-light text-primary text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider">Berlangsung</span>
                <span className="text-[11px] sm:text-xs text-muted flex items-center gap-1 font-medium"><PlayCircle size={14} /> Tersisa 1 Jam 15 Menit</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-2 leading-snug truncate sm:whitespace-normal">{courses[0].title}</h4>
              <p className="text-sm sm:text-base text-muted mb-6 sm:mb-8 flex items-center gap-2">
                <User size={16} /> {courses[0].instructor}
              </p>
              
              <div className="mt-auto">
                <div className="mb-2 flex justify-between items-end">
                  <span className="text-xs sm:text-sm font-semibold text-foreground">Progres Belajar</span>
                  <span className="text-sm sm:text-base font-bold text-primary">{courses[0].progress}%</span>
                </div>
                <div className="w-full h-2 sm:h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{ width: `${courses[0].progress}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- NEW COMPREHENSIVE SECTIONS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 sm:mb-12">
          
          {/* Announcements */}
          <section className="lg:col-span-2">
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Megaphone size={20} className="text-primary" /> Pengumuman Terbaru
            </h3>
            <div className="bg-card rounded-2xl shadow-subtle border border-border p-5 sm:p-6 space-y-5">
              <div className="flex gap-4 items-start border-b border-slate-100 pb-5">
                <div className="w-10 h-10 bg-primary-light text-primary rounded-lg flex items-center justify-center shrink-0">
                  <Megaphone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1 text-sm sm:text-base">Kewajiban Pelatihan Anti-Korupsi 2026</h4>
                  <p className="text-xs sm:text-sm text-muted mb-2 leading-relaxed">Seluruh ASN diwajibkan menyelesaikan modul "Pencegahan Korupsi" paling lambat akhir kuartal pertama tahun ini.</p>
                  <span className="text-[10px] font-semibold text-primary bg-primary-light px-2 py-1 rounded">2 Jam yang lalu</span>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-accent/20 text-[#141414] rounded-lg flex items-center justify-center shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1 text-sm sm:text-base">Sertifikat Digital Kini Terintegrasi MyASN</h4>
                  <p className="text-xs sm:text-sm text-muted mb-2 leading-relaxed">Sertifikat yang Anda peroleh dari LMS ini sekarang secara otomatis tersinkronisasi dengan portal kepegawaian MyASN BKN.</p>
                  <span className="text-[10px] font-semibold text-[#141414] bg-accent/20 px-2 py-1 rounded border border-accent/30">1 Hari yang lalu</span>
                </div>
              </div>
            </div>
          </section>

          {/* Upcoming Schedule */}
          <section className="lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-primary" /> Jadwal Mendatang
            </h3>
            <div className="bg-card rounded-2xl shadow-subtle border border-border p-5 sm:p-6 flex flex-col h-[calc(100%-2rem)]">
              <div className="space-y-4 flex-1">
                <div className="relative pl-6 before:content-[''] before:absolute before:left-1.5 before:top-2 before:w-0.5 before:h-full before:bg-slate-200 last:before:hidden">
                  <div className="absolute left-0 top-1.5 w-3.5 h-3.5 bg-primary rounded-full ring-4 ring-primary-light"></div>
                  <p className="text-xs font-bold text-primary mb-0.5">15 Nov 2026</p>
                  <h4 className="font-bold text-sm text-foreground mb-1">Webinar Kepemimpinan</h4>
                  <p className="text-xs text-muted flex items-center gap-1"><Clock size={12} /> 09:00 - 11:30 WIB</p>
                </div>
                <div className="relative pl-6 before:content-[''] before:absolute before:left-1.5 before:top-2 before:w-0.5 before:h-full before:bg-slate-200 last:before:hidden">
                  <div className="absolute left-0 top-1.5 w-3.5 h-3.5 bg-slate-300 rounded-full ring-4 ring-white"></div>
                  <p className="text-xs font-bold text-muted mb-0.5">20 Nov 2026</p>
                  <h4 className="font-bold text-sm text-foreground mb-1">Batas Waktu Modul Etika</h4>
                  <p className="text-xs text-muted flex items-center gap-1"><Clock size={12} /> 23:59 WIB</p>
                </div>
              </div>
              <button className="w-full mt-6 py-2.5 bg-slate-50 border border-slate-200 text-foreground text-sm font-bold rounded-lg hover:bg-slate-100 transition-colors">
                Lihat Kalender Penuh
              </button>
            </div>
          </section>

        </div>
        {/* --- END NEW COMPREHENSIVE SECTIONS --- */}

        {/* Course Catalog */}
        <section className="pb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
              Katalog Pelatihan
            </h3>
            
            <div className="flex bg-slate-100/80 backdrop-blur-sm p-1 rounded-lg border border-border w-full sm:w-auto overflow-x-auto gap-1">
              {['semua', 'aktif', 'selesai'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-md capitalize transition-all whitespace-nowrap ${activeTab === tab ? 'bg-primary text-primary-foreground shadow-sm ring-1 ring-black/5' : 'text-muted hover:text-foreground hover:bg-white/50'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-subtle transition-all duration-300 group flex flex-col hover:-translate-y-1">
                <div className="h-40 sm:h-48 relative overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-3 left-3">
                    {course.status === 'completed' && <span className="bg-success text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wide">Selesai</span>}
                    {course.status === 'ongoing' && <span className="bg-primary text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wide">Berlangsung</span>}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  <p className="text-[11px] sm:text-xs text-muted mb-2 font-semibold flex items-center gap-1.5">
                    <User size={12} /> {course.instructor}
                  </p>
                  <h4 className="font-bold text-foreground text-base sm:text-lg mb-3 sm:mb-4 line-clamp-2 leading-snug group-hover:text-primary transition-colors">{course.title}</h4>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    {course.status === 'completed' ? (
                      <div className="flex items-center justify-between w-full">
                        <Link href="/sertifikat" className="text-xs sm:text-sm font-bold text-primary hover:text-primary-hover flex items-center gap-1.5 transition-colors">
                          <Award size={16} /> Lihat Sertifikat
                        </Link>
                        <CheckCircle size={20} className="text-success bg-green-50 rounded-full" />
                      </div>
                    ) : course.status === 'ongoing' ? (
                      <div className="w-full">
                        <div className="flex justify-between items-end text-xs mb-2 font-bold">
                          <span className="text-muted uppercase tracking-wider text-[10px]">Progres</span>
                          <span className="text-primary">{course.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full mb-4 overflow-hidden shadow-inner">
                          <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{ width: `${course.progress}%` }}></div>
                        </div>
                        <Link href={`/course/${course.id}`} className="w-full py-2 sm:py-2.5 bg-primary-light text-primary font-bold rounded-lg text-xs sm:text-sm hover:bg-primary/20 transition-colors flex justify-center items-center gap-2">
                          <PlayCircle size={16} /> Lanjutkan Materi
                        </Link>
                      </div>
                    ) : (
                      <Link href={`/katalog/${course.id}`} className="w-full py-2 sm:py-2.5 bg-slate-100 text-foreground font-bold rounded-lg text-xs sm:text-sm hover:bg-slate-200 transition-colors flex justify-center items-center gap-2">
                        <BookOpen size={16} /> Mulai Pelatihan
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
