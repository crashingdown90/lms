import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HelpCircle, Book, Video, ShieldAlert, ChevronDown } from "lucide-react";

export default function PanduanPage() {
  const faqs = [
    {
      q: "Bagaimana cara mengakses pelatihan?",
      a: "Anda dapat mengakses pelatihan melalui menu 'Katalog Pelatihan'. Pilih pelatihan yang sesuai dengan kompetensi yang ingin ditingkatkan, lalu klik tombol 'Daftar' atau 'Mulai Pelatihan'."
    },
    {
      q: "Apakah saya bisa mempercepat (skip) video materi?",
      a: "Tidak. Sistem kami menggunakan fitur Anti-Skip untuk memastikan seluruh materi disimak dengan baik. Anda diwajibkan menonton video dari awal hingga akhir sebelum dapat melanjutkan ke kuis."
    },
    {
      q: "Kapan saya bisa mengunduh sertifikat?",
      a: "Sertifikat akan otomatis tersedia di menu 'Sertifikat Saya' setelah Anda menyelesaikan seluruh materi video dan lulus kuis akhir dengan nilai minimum yang ditentukan oleh instruktur."
    },
    {
      q: "Apa yang harus dilakukan jika saya lupa kata sandi?",
      a: "Silakan hubungi Admin BKPSDM Kota Sukabumi melalui email bkpsdm@sukabumikota.go.id atau gunakan fitur 'Lupa Kata Sandi' di halaman login dengan memasukkan NIP Anda."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary-light text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle size={32} />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Pusat Panduan & Bantuan</h1>
          <p className="text-muted text-lg">Temukan jawaban atas pertanyaan umum dan panduan penggunaan LMS BKPSDM.</p>
        </div>

        {/* Quick Guides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm text-center">
            <Book className="text-primary mx-auto mb-3" size={32} />
            <h3 className="font-bold text-foreground mb-2">Panduan Modul</h3>
            <p className="text-sm text-muted">Cara memilih dan menyelesaikan modul pelajaran.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm text-center">
            <Video className="text-primary mx-auto mb-3" size={32} />
            <h3 className="font-bold text-foreground mb-2">Sistem Anti-Skip</h3>
            <p className="text-sm text-muted">Kebijakan pemutaran video wajib secara penuh.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm text-center">
            <ShieldAlert className="text-primary mx-auto mb-3" size={32} />
            <h3 className="font-bold text-foreground mb-2">Masalah Teknis</h3>
            <p className="text-sm text-muted">Solusi jika terjadi error atau kendala sistem.</p>
          </div>
        </div>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-4">Pertanyaan yang Sering Diajukan (FAQ)</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm group">
                <button className="w-full text-left px-6 py-4 font-bold text-foreground flex justify-between items-center focus:outline-none hover:bg-slate-50 transition-colors">
                  {faq.q}
                  <ChevronDown size={20} className="text-muted group-hover:text-primary transition-colors" />
                </button>
                <div className="px-6 pb-4 pt-1 border-t border-slate-100 bg-slate-50">
                  <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
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
