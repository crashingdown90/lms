"use client";

export default function AdminHelpdesk() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden animate-in fade-in slide-in-from-bottom-4">
      <div className="p-6 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50">
        <div>
          <h2 className="text-xl font-bold text-foreground">Pusat Bantuan (Helpdesk)</h2>
          <p className="text-sm text-muted">Tanggapi keluhan atau masalah teknis dari ASN.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold shadow-sm">Tiket Terbuka (2)</button>
          <button className="px-4 py-2 text-muted hover:text-foreground text-sm font-bold">Semua Tiket</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-border text-xs uppercase text-slate-500 font-bold">
            <tr>
              <th className="px-6 py-4">ID Tiket</th>
              <th className="px-6 py-4">Pelapor</th>
              <th className="px-6 py-4">Subjek Masalah</th>
              <th className="px-6 py-4">Waktu</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-mono text-sm text-primary font-bold">TKT-1092</td>
              <td className="px-6 py-4 font-bold text-sm">Budi Gunawan<br/><span className="text-xs text-muted font-normal">Dinas Perhubungan</span></td>
              <td className="px-6 py-4 text-sm">Video Bab 2 tidak bisa diputar, hanya *loading*.</td>
              <td className="px-6 py-4 text-xs text-muted">Hari ini, 08:15</td>
              <td className="px-6 py-4"><span className="bg-error/10 text-error px-2 py-1 rounded text-xs font-bold uppercase">Terbuka</span></td>
              <td className="px-6 py-4 text-right"><button className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded hover:bg-primary-hover">Balas</button></td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-mono text-sm text-primary font-bold">TKT-1091</td>
              <td className="px-6 py-4 font-bold text-sm">Rina Kusuma<br/><span className="text-xs text-muted font-normal">Kecamatan Baros</span></td>
              <td className="px-6 py-4 text-sm">Lupa password akun MyASN untuk login LMS.</td>
              <td className="px-6 py-4 text-xs text-muted">Kemarin, 14:20</td>
              <td className="px-6 py-4"><span className="bg-success/10 text-success px-2 py-1 rounded text-xs font-bold uppercase">Selesai</span></td>
              <td className="px-6 py-4 text-right"><button className="px-3 py-1.5 border border-slate-200 text-slate-600 text-xs font-bold rounded hover:bg-slate-50">Lihat</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
