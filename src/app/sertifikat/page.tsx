"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, CheckCircle, Download, FileText, Search, Share2, QrCode, ShieldCheck, Filter } from "lucide-react";
import Link from "next/link";

export default function SertifikatPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("semua");

  const certificates = [
    {
      id: 1,
      title: "Manajemen Kinerja ASN 2026",
      date: "12 Okt 2026",
      score: 95,
      credentialId: "BKPSDM-2026-01029",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      year: "2026"
    },
    {
      id: 2,
      title: "Pencegahan Korupsi di Instansi Pemerintah",
      date: "05 Sep 2025",
      score: 88,
      credentialId: "BKPSDM-2025-00842",
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      year: "2025"
    },
    {
      id: 3,
      title: "Literasi Keamanan Digital",
      date: "21 Agu 2025",
      score: 100,
      credentialId: "BKPSDM-2025-00611",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      year: "2025"
    }
  ];

  // Filtering Logic
  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) || cert.credentialId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "semua" || cert.year === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        
        {/* Banner Verifikasi Keaslian (New Feature) */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 mb-10 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center shrink-0">
              <ShieldCheck size={32} className="text-success" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">Verifikasi Keaslian Sertifikat</h2>
              <p className="text-slate-400 text-sm">Pastikan validitas dokumen dengan mengecek ID Kredensial di sistem pusat.</p>
            </div>
          </div>
          <div className="w-full md:w-auto flex gap-2">
            <input 
              type="text" 
              placeholder="Contoh: BKPSDM-2026-..." 
              className="w-full md:w-64 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-colors shadow-md">
              Cek
            </button>
          </div>
        </div>

        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b border-border pb-6">
          <div>
            <h1 className="text-3xl font-black text-foreground mb-2 flex items-center gap-3">
              <Award className="text-warning" size={36} /> Koleksi Sertifikat
            </h1>
            <p className="text-muted">Kelola, unduh, dan bagikan bukti kompetensi Anda.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Year Filter */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-border">
              {['semua', '2026', '2025'].map(year => (
                <button 
                  key={year}
                  onClick={() => setActiveFilter(year)}
                  className={`px-4 py-2 text-sm font-bold rounded-lg capitalize transition-all ${activeFilter === year ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-foreground'}`}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input 
                type="text" 
                placeholder="Cari nama / ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>

        {/* Grid Sertifikat */}
        {filteredCertificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCertificates.map((cert) => (
              <div key={cert.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-subtle hover:shadow-lg transition-all duration-300 flex flex-col group hover:-translate-y-1">
                
                {/* Visual Thumbnail */}
                <div className="h-40 relative border-b border-border overflow-hidden">
                  <img src={cert.image} alt="Thumbnail" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-5">
                    <div className="text-white w-full">
                      <div className="flex justify-between items-end w-full mb-2">
                        <p className="text-[10px] font-black text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-1 rounded-md flex items-center gap-1 w-max">
                          <Award size={12} /> LULUS {cert.year}
                        </p>
                        <div className="w-10 h-10 bg-white/90 p-1.5 rounded-lg shadow-sm">
                          <QrCode className="w-full h-full text-slate-800" />
                        </div>
                      </div>
                      <h3 className="font-bold text-lg leading-snug line-clamp-2">{cert.title}</h3>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted font-medium">Tanggal Lulus</span>
                      <span className="font-bold text-foreground">{cert.date}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="text-muted font-medium flex items-center gap-1.5"><ShieldCheck size={14}/> ID Kredensial</span>
                      <span className="font-bold text-primary font-mono text-xs">{cert.credentialId}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted font-medium">Nilai Akhir</span>
                      <span className="font-black text-success text-base flex items-center gap-1">{cert.score} <span className="text-xs text-muted font-normal">/ 100</span></span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="mt-auto flex gap-3">
                    <button className="flex-1 py-3 bg-primary text-white hover:bg-primary-hover shadow-md hover:shadow-lg transition-all rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                      <Download size={16} /> PDF
                    </button>
                    <button className="px-4 py-3 bg-slate-100 text-foreground hover:bg-slate-200 transition-colors rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-border" title="Bagikan ke MyASN / LinkedIn">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-slate-50 border border-dashed border-border rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-muted">
              <FileText size={32} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Sertifikat Tidak Ditemukan</h3>
            <p className="text-muted max-w-md mx-auto">Kami tidak dapat menemukan sertifikat dengan kata kunci "{searchTerm}". Pastikan ejaan ID Kredensial atau Nama Pelatihan sudah benar.</p>
            <button 
              onClick={() => {setSearchTerm(''); setActiveFilter('semua');}}
              className="mt-6 px-6 py-2.5 bg-white border border-border text-foreground font-bold rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
            >
              Hapus Filter
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
