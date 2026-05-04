"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, AlertCircle, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [skpd, setSkpd] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsLoading(true);

    setTimeout(() => {
      if (isRegister) {
        // Simulasi pendaftaran berhasil
        setIsLoading(false);
        setSuccessMsg("Pendaftaran berhasil! Silakan masuk dengan akun Anda.");
        setIsRegister(false);
        setPassword("");
      } else {
        // Simulasi proses autentikasi
        if (username === "superadmin" && password === "superadmin") {
          router.push("/admin");
        } else if (username === "admin" && password === "admin") {
          router.push("/");
        } else {
          setError("NIP/Username atau Kata Sandi salah. Silakan coba lagi.");
          setIsLoading(false);
        }
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sisi Kiri: Gambar & Branding (Disembunyikan di layar HP) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary flex-col justify-between overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/Asset_kota/Asset 1.png" 
            alt="Pegawai Negeri Sipil Indonesia" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-primary/80 to-primary/40 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 p-12">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary font-black text-3xl mb-6 shadow-xl">
            ▶
          </div>
          <h1 className="text-4xl font-black text-white leading-tight mb-4">
            SOLASIDO
          </h1>
          <p className="text-primary-light text-lg max-w-md leading-relaxed">
            Sistem Online Pembelajaran Berbasis Video. Inovasi pembelajaran mandiri berbasis microlearning untuk ASN yang fleksibel dan adaptif.
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
            <div className="w-16 h-16 bg-primary rounded-full flex lg:hidden items-center justify-center text-white font-black text-3xl mx-auto mb-6 shadow-md">
              ▶
            </div>
            
            <h2 className="text-3xl font-black text-foreground mb-2">
              {isRegister ? "Buat Akun Baru" : "Selamat Datang"}
            </h2>
            <p className="text-muted">
              {isRegister ? "Daftarkan data ASN Anda untuk memulai." : "Masuk menggunakan akun ASN Anda."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Notifikasi Error */}
            {error && (
              <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
            
            {/* Notifikasi Sukses */}
            {successMsg && (
              <div className="bg-success/10 border border-success/20 text-success px-4 py-3 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <ShieldCheck size={20} className="shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{successMsg}</p>
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

            {/* Form Pendaftaran */}
            {isRegister && (
              <>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-border rounded-xl text-foreground focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-400"
                    placeholder="Contoh: Drefan Sukabumi"
                    required={isRegister}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Instansi / SKPD</label>
                  <div className="relative">
                    <select
                      value={skpd}
                      onChange={(e) => setSkpd(e.target.value)}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-border rounded-xl text-foreground focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none cursor-pointer"
                      required={isRegister}
                    >
                      <option value="" disabled>Pilih Instansi / SKPD Anda</option>
                      <option value="Dinas Pendidikan">Dinas Pendidikan</option>
                      <option value="Dinas Kesehatan">Dinas Kesehatan</option>
                      <option value="Dinas Komunikasi & Informatika">Dinas Komunikasi & Informatika</option>
                      <option value="Dinas Perhubungan">Dinas Perhubungan</option>
                      <option value="Dinas Pekerjaan Umum & Tata Ruang">Dinas Pekerjaan Umum & Tata Ruang</option>
                      <option value="Kecamatan Cikole">Kecamatan Cikole</option>
                      <option value="Kecamatan Baros">Kecamatan Baros</option>
                      <option value="Kecamatan Warudoyong">Kecamatan Warudoyong</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Input Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-foreground">Kata Sandi</label>
                {!isRegister && (
                  <a href="#" className="text-xs font-bold text-primary hover:text-primary-hover transition-colors">Lupa Sandi?</a>
                )}
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
              className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-[0_8px_20px_-5px_rgba(141,198,63,0.4)] hover:-translate-y-1 hover:shadow-[0_12px_25px_-5px_rgba(141,198,63,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> Memproses...
                </>
              ) : (
                <>
                  {isRegister ? "Daftar Akun" : "Masuk Sistem"} <ArrowRight size={20} />
                </>
              )}
            </button>
            
            <div className="text-center mt-6">
              <p className="text-sm text-muted">
                {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}
                <button 
                  type="button"
                  onClick={() => {
                    setIsRegister(!isRegister);
                    setError("");
                    setSuccessMsg("");
                  }} 
                  className="ml-2 font-bold text-primary hover:underline focus:outline-none"
                >
                  {isRegister ? "Masuk di sini" : "Daftar sekarang"}
                </button>
              </p>
            </div>
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
