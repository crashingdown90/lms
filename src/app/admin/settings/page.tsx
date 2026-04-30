"use client";

export default function AdminSettings() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 max-w-3xl">
      <h2 className="text-xl font-bold text-foreground mb-6">Konfigurasi Sistem LMS</h2>
      <div className="space-y-6">
        <div className="pb-6 border-b border-slate-100">
          <h3 className="font-bold text-foreground mb-4">Keamanan & Pemutaran</h3>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-bold text-sm text-foreground">Anti-Skip Video (Wajib Tonton)</p>
              <p className="text-xs text-muted">Cegah pengguna memajukan video pelatihan.</p>
            </div>
            <div className="w-12 h-6 bg-success rounded-full relative cursor-pointer shadow-inner">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-sm text-foreground">Kunci Kuis Jika Gagal 3x</p>
              <p className="text-xs text-muted">Blokir sementara akses kuis jika peserta gagal berturut-turut.</p>
            </div>
            <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer shadow-inner">
              <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
            </div>
          </div>
        </div>
        <div className="pb-6 border-b border-slate-100">
          <h3 className="font-bold text-foreground mb-4">Integrasi Eksternal</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-sm text-foreground">Sinkronisasi Poin JP ke MyASN</p>
              <p className="text-xs text-muted">Otomatis kirim data kelulusan ke BKN Pusat via API.</p>
            </div>
            <div className="w-12 h-6 bg-success rounded-full relative cursor-pointer shadow-inner">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
            </div>
          </div>
        </div>
        <button className="px-6 py-3 mt-4 bg-primary text-white font-bold rounded-xl shadow-sm hover:bg-primary-hover transition-colors">Simpan Pengaturan</button>
      </div>
    </div>
  );
}
