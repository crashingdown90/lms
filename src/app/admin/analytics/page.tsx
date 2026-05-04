"use client";

import { Activity, Download, FileText, TrendingUp } from "lucide-react";

export default function AdminAnalytics() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-black text-foreground">Analitik Lanjutan (Deep Data)</h2>
          <p className="text-muted mt-1">Laporan komprehensif perilaku belajar ASN dan performa modul.</p>
        </div>
        <button className="px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-50">
          <Download size={16} /> Ekspor PDF
        </button>
      </div>

      {/* Quick Deep Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-primary rounded-2xl p-6 text-primary-foreground shadow-md relative overflow-hidden">
          <Activity className="absolute right-[-10px] bottom-[-10px] w-24 h-24 opacity-20" />
          <p className="text-primary-foreground/70 text-xs font-bold uppercase tracking-wider mb-2">Rata-rata Waktu Akses</p>
          <h3 className="text-4xl font-black mb-1">42m 15s</h3>
          <p className="text-primary-foreground/90 text-sm font-medium">per sesi pembelajaran</p>
        </div>
        <div className="bg-[#141414] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <FileText className="absolute right-[-10px] bottom-[-10px] w-24 h-24 opacity-10 text-white" />
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Tingkat Penyelesaian Modul</p>
          <h3 className="text-4xl font-black mb-1 text-primary">85.4%</h3>
          <p className="text-slate-300 text-sm font-medium">naik 12% dari bulan lalu</p>
        </div>
        <div className="bg-accent rounded-2xl p-6 text-[#141414] shadow-md relative overflow-hidden">
          <TrendingUp className="absolute right-[-10px] bottom-[-10px] w-24 h-24 opacity-20" />
          <p className="text-[#141414]/70 text-xs font-bold uppercase tracking-wider mb-2">Nilai Rata-rata Kuis</p>
          <h3 className="text-4xl font-black mb-1">88.2</h3>
          <p className="text-[#141414]/90 text-sm font-medium">dari batas minimum 70.0</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        {/* Chart Simulation: Demografi Usia */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
          <h3 className="font-bold text-foreground mb-6">Demografi Usia Peserta Aktif</h3>
          <div className="flex items-end justify-between h-48 gap-2">
            {[
              { label: "18-25", val: 15 }, { label: "26-35", val: 45 },
              { label: "36-45", val: 75 }, { label: "46-55", val: 60 },
              { label: "55+", val: 25 }
            ].map((bar, i) => (
              <div key={i} className="flex flex-col items-center flex-1 h-full justify-end group">
                <span className="text-xs font-bold text-slate-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">{bar.val}%</span>
                <div className="w-full max-w-[40px] bg-primary/10 rounded-t-md relative overflow-hidden h-[150px] flex flex-col justify-end">
                  <div className="w-full bg-primary rounded-t-sm transition-all duration-500 group-hover:bg-primary-hover" style={{ height: `${bar.val}%` }}></div>
                </div>
                <span className="text-xs font-bold text-muted mt-3">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Simulation: Penggunaan Perangkat */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
          <h3 className="font-bold text-foreground mb-6">Akses Perangkat Belajar</h3>
          <div className="flex flex-col gap-5 justify-center h-48">
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-full"></div> Desktop / PC Kantor</span>
                <span>65%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[65%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="flex items-center gap-2"><div className="w-3 h-3 bg-accent rounded-full"></div> Smartphone (Mobile)</span>
                <span>28%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-accent w-[28%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="flex items-center gap-2"><div className="w-3 h-3 bg-[#141414] rounded-full"></div> Tablet</span>
                <span>7%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#141414] w-[7%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Leaderboard / Modul Terpopuler */}
      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 border-b border-border bg-slate-50">
          <h3 className="font-bold text-foreground">Modul dengan Tingkat Kegagalan Tertinggi (Butuh Evaluasi)</h3>
          <p className="text-sm text-muted">Daftar pelatihan yang soal ujiannya banyak dijawab salah oleh ASN.</p>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-border text-xs uppercase text-slate-500 font-bold">
            <tr>
              <th className="px-6 py-4">Judul Modul</th>
              <th className="px-6 py-4 text-center">Tingkat Gagal Ujian</th>
              <th className="px-6 py-4 text-center">Rata-rata Nilai</th>
              <th className="px-6 py-4">Tindakan Disarankan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-bold text-sm">Kebijakan Cipta Kerja Terapan</td>
              <td className="px-6 py-4 text-center"><span className="text-error font-black bg-error/10 px-2 py-1 rounded">42.5%</span></td>
              <td className="px-6 py-4 text-center font-bold text-warning">64.0</td>
              <td className="px-6 py-4 text-xs font-bold text-slate-500">Revisi Tingkat Kesulitan Kuis</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-bold text-sm">Standar Akuntansi Pemerintah</td>
              <td className="px-6 py-4 text-center"><span className="text-warning font-black bg-warning/10 px-2 py-1 rounded text-amber-700">28.0%</span></td>
              <td className="px-6 py-4 text-center font-bold text-success">71.5</td>
              <td className="px-6 py-4 text-xs font-bold text-slate-500">Perbarui Video Penjelasan Bab 2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
