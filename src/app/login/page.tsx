"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, AlertCircle, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulasi proses autentikasi (delay 1 detik)
    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        // Berhasil login, arahkan ke dashboard
        router.push("/");
      } else {
        // Gagal login
        setError("NIP/Username atau Kata Sandi salah. Silakan coba lagi.");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sisi Kiri: Gambar & Branding (Disembunyikan di layar HP) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary flex-col justify-between overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/asn-bg.png" 
            alt="Pegawai Negeri Sipil Indonesia" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-primary/80 to-primary/40 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 p-12">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary font-black text-2xl mb-6 shadow-xl">
            KS
          </div>
          <h1 className="text-4xl font-black text-white leading-tight mb-4">
            Sistem Informasi <br/> Pelatihan Terpadu
          </h1>
          <p className="text-primary-light text-lg max-w-md leading-relaxed">
            Platform Pembelajaran Mandiri untuk meningkatkan kompetensi Aparatur Sipil Negara di lingkungan Pemerintah Kota Sukabumi.
          </p>
        </div>

        <div className="relative z-10 p-12 border-t border-white/10 backdrop-blur-sm bg-black/10">
          <div className="flex items-center gap-4 text-white/80">
            <ShieldCheck size={32} className="text-success" />
            <div>
              <p className="text-sm font-bold text-white">Sistem Terenkripsi & Aman</p>
              <p className="text-xs">Terintegrasi dengan database kepegawaian pusat.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sisi Kanan: Form Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        {/* Ornamen Latar (Untuk mobile jika tidak ada sisi kiri) */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 lg:hidden"></div>

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-10">
            {/* Logo Mobile Only */}
            <div className="w-16 h-16 bg-primary rounded-full flex lg:hidden items-center justify-center text-white font-black text-2xl mx-auto mb-6 shadow-md">
              KS
            </div>
            
            <h2 className="text-3xl font-black text-foreground mb-2">Selamat Datang</h2>
            <p className="text-muted">Masuk menggunakan akun ASN Anda.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Notifikasi Error */}
            {error && (
              <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Input NIP/Username */}
            <div>
              <label className="block text-sm font-bold text-foreground mb-2">NIP / Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={20} className="text-muted" />
                </div>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-border rounded-xl text-foreground focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-400"
                  placeholder="Masukkan NIP Anda"
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-foreground">Kata Sandi</label>
                <a href="#" className="text-xs font-bold text-primary hover:text-primary-hover transition-colors">Lupa Sandi?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={20} className="text-muted" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-border rounded-xl text-foreground focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-400"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-[0_8px_20px_-5px_rgba(30,64,175,0.4)] hover:-translate-y-1 hover:shadow-[0_12px_25px_-5px_rgba(30,64,175,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> Memproses...
                </>
              ) : (
                <>
                  Masuk Sistem <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-muted font-medium">
              Jika Anda mengalami kendala masuk, silakan hubungi <br/> Admin Kepegawaian BKPSDM Kota Sukabumi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
