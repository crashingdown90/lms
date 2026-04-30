import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User, Award, CheckCircle, Download, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const certificates = [
    {
      id: 1,
      title: "Manajemen Kinerja ASN 2026",
      date: "12 Okt 2025",
      score: 95,
      credentialId: "BKPSDM-2025-01029",
    },
    {
      id: 2,
      title: "Pencegahan Korupsi di Instansi Pemerintah",
      date: "05 Sep 2025",
      score: 88,
      credentialId: "BKPSDM-2025-00842",
    },
    {
      id: 3,
      title: "Literasi Keamanan Digital",
      date: "21 Agu 2025",
      score: 100,
      credentialId: "BKPSDM-2025-00611",
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
          <ChevronRight size={14} />
          <span className="font-semibold text-foreground">Profil & Sertifikat</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-subtle text-center">
              <div className="w-24 h-24 mx-auto bg-primary-light border-4 border-white shadow-md rounded-full flex items-center justify-center text-primary mb-4">
                <User size={48} />
              </div>
              <h2 className="text-xl font-bold text-foreground">Drefan Sukabumi</h2>
              <p className="text-sm text-muted mb-4">NIP. 198501012010011012</p>
              
              <div className="pt-4 border-t border-border text-left space-y-3">
                <div>
                  <p className="text-xs text-muted font-medium">Jabatan</p>
                  <p className="text-sm font-semibold text-foreground">Pranata Komputer Ahli Muda</p>
                </div>
                <div>
                  <p className="text-xs text-muted font-medium">Instansi</p>
                  <p className="text-sm font-semibold text-foreground">BKPSDM Kota Sukabumi</p>
                </div>
                <div>
                  <p className="text-xs text-muted font-medium">Email</p>
                  <p className="text-sm font-semibold text-foreground">drefan@sukabumikota.go.id</p>
                </div>
              </div>
            </div>

            {/* Total Stats */}
            <div className="bg-primary text-white rounded-2xl p-6 shadow-subtle relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-semibold mb-1">Total Jam Pelajaran</h3>
                <p className="text-3xl font-bold">42 JP</p>
              </div>
              <Award size={80} className="absolute -right-4 -bottom-4 text-white opacity-20" />
            </div>
          </div>

          {/* Right Column: Certificates & History */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Award className="text-warning" /> Sertifikat Saya
                </h2>
                <span className="text-xs font-bold bg-amber-100 text-amber-700 px-3 py-1 rounded-full">3 Sertifikat</span>
              </div>

              <div className="space-y-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-success shrink-0">
                        <CheckCircle size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground leading-tight mb-1">{cert.title}</h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted font-medium">
                          <span>Selesai: {cert.date}</span>
                          <span className="flex items-center gap-1"><FileText size={12} /> ID: {cert.credentialId}</span>
                          <span className="text-primary font-bold">Nilai: {cert.score}/100</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full sm:w-auto px-4 py-2 bg-primary-light text-primary hover:bg-primary hover:text-white transition-colors rounded-lg font-semibold text-sm flex items-center justify-center gap-2 shrink-0">
                      <Download size={16} /> Unduh PDF
                    </button>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
