"use client";

import { Download, ShieldCheck, ShieldAlert } from "lucide-react";

export default function AdminLogs() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden animate-in fade-in slide-in-from-bottom-4">
      <div className="p-6 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50">
        <div>
          <h2 className="text-xl font-bold text-foreground">Log Aktivitas Sistem (Audit Trail)</h2>
          <p className="text-sm text-muted">Pantau rekam jejak keamanan dan aktivitas esensial di LMS.</p>
        </div>
        <button className="px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-50">
          <Download size={16} /> Unduh CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-border text-xs uppercase text-slate-500 font-bold">
            <tr>
              <th className="px-6 py-4">Waktu (WIB)</th>
              <th className="px-6 py-4">Pengguna</th>
              <th className="px-6 py-4">Aktivitas</th>
              <th className="px-6 py-4">Alamat IP</th>
              <th className="px-6 py-4">Status Keamanan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-mono text-muted text-xs">30 Apr 2026, 10:45:12</td>
              <td className="px-6 py-4 font-bold">Admin Pusat (Anda)</td>
              <td className="px-6 py-4 text-primary font-medium">Mengubah Konfigurasi LMS (Anti-Skip = ON)</td>
              <td className="px-6 py-4 font-mono text-xs text-slate-400">192.168.1.104</td>
              <td className="px-6 py-4"><span className="flex items-center gap-1 text-success font-bold text-xs"><ShieldCheck size={14}/> Aman</span></td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-mono text-muted text-xs">30 Apr 2026, 09:22:05</td>
              <td className="px-6 py-4 font-bold">Andi Saputra</td>
              <td className="px-6 py-4">Berhasil klaim sertifikat (KODE: CERT-9901)</td>
              <td className="px-6 py-4 font-mono text-xs text-slate-400">114.122.14.88</td>
              <td className="px-6 py-4"><span className="flex items-center gap-1 text-success font-bold text-xs"><ShieldCheck size={14}/> Aman</span></td>
            </tr>
            <tr className="hover:bg-slate-50 bg-error/5">
              <td className="px-6 py-4 font-mono text-muted text-xs">30 Apr 2026, 02:14:33</td>
              <td className="px-6 py-4 font-bold text-error">Unregistered User</td>
              <td className="px-6 py-4 text-error font-medium">5x Gagal Login (Brute-force attempt)</td>
              <td className="px-6 py-4 font-mono text-xs text-error font-bold">45.22.109.11</td>
              <td className="px-6 py-4"><span className="flex items-center gap-1 text-error font-bold text-xs"><ShieldAlert size={14}/> Diblokir</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
