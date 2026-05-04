import { MapPin, Phone, Mail, Shield, HelpCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border pt-12 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-tr from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-bold shrink-0 shadow-[0_0_15px_rgba(141,198,63,0.3)]">
                <span className="text-xl">▶</span>
              </div>
              <div>
                <h2 className="font-bold text-foreground text-lg leading-tight">SOLASIDO</h2>
                <p className="text-[10px] text-muted font-medium">Pemkot Sukabumi</p>
              </div>
            </div>
            <p className="text-sm text-muted mb-6 leading-relaxed">
              Sistem Online Pembelajaran Berbasis Video (SOLASIDO). Inovasi pembelajaran mandiri berbasis microlearning yang memungkinkan ASN mengakses materi pembelajaran dalam bentuk video singkat kapan saja dan di mana saja.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Tautan Cepat</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-2"><ChevronRight size={14} /> Beranda</Link></li>
              <li><Link href="/katalog" className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-2"><ChevronRight size={14} /> Katalog Pelatihan</Link></li>
              <li><Link href="/sertifikat" className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-2"><ChevronRight size={14} /> Cek Keaslian Sertifikat</Link></li>
              <li><Link href="/papan-peringkat" className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-2"><ChevronRight size={14} /> Papan Peringkat</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Bantuan & Dukungan</h3>
            <ul className="space-y-3">
              <li><Link href="/panduan" className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-2"><HelpCircle size={14} /> Panduan Penggunaan</Link></li>
              <li><Link href="/panduan" className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-2"><HelpCircle size={14} /> FAQ</Link></li>
              <li><Link href="#" className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-2" title="Segera Hadir"><Shield size={14} /> Kebijakan Privasi</Link></li>
              <li><Link href="#" className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-2" title="Segera Hadir"><Shield size={14} /> Syarat & Ketentuan</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted leading-relaxed">Jl. Balai Kota No.1, Gunungparang, Cikole, Kota Sukabumi, Jawa Barat 43111</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span className="text-sm text-muted">(0266) 221123</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span className="text-sm text-muted">bkpsdm@sukabumikota.go.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-muted text-center md:text-left">
            &copy; {new Date().getFullYear()} BKPSDM Pemerintah Kota Sukabumi. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex gap-4">
            <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-muted">Versi 1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
