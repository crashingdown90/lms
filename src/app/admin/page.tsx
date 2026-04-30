"use client";

import { TrendingUp, HardDrive, Users, BookOpen, CheckCircle, Award, AlertCircle } from "lucide-react";

export default function AdminOverview() {
  const monthlyData = [
    { month: "Jan", users: 40, label: "400" },
    { month: "Feb", users: 65, label: "650" },
    { month: "Mar", users: 50, label: "500" },
    { month: "Apr", users: 85, label: "850" },
    { month: "Mei", users: 100, label: "1.020" },
    { month: "Jun", users: 70, label: "700" },
  ];
  
  const skpdDistribution = [
    { name: "Dinas Pendidikan", percentage: 35, color: "bg-blue-500" },
    { name: "Dinas Kesehatan", percentage: 25, color: "bg-green-500" },
    { name: "Kecamatan & Kelurahan", percentage: 20, color: "bg-amber-500" },
    { name: "Diskominfo", percentage: 12, color: "bg-purple-500" },
    { name: "Lainnya", percentage: 8, color: "bg-slate-400" },
  ];
  
  const pendingApprovals = [
    { id: "REQ-091", type: "Validasi Sertifikat", name: "Andi Saputra", date: "Hari ini, 09:12" },
    { id: "REQ-092", type: "Reset Password", name: "Rina Kusuma", date: "Kemarin, 14:30" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Top Row: Welcome & Server Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-primary via-blue-700 to-blue-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col justify-center">
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black mb-2">Pantauan Kinerja LMS</h2>
              <p className="text-blue-100 max-w-lg text-sm sm:text-base leading-relaxed">
                Ringkasan komprehensif partisipasi pelatihan ASN, tingkat kelulusan modul, dan status infrastruktur server.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                <TrendingUp size={48} className="text-white" />
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://www.transparenttextures.com/patterns/connected.png')] opacity-20"></div>
        </div>

        <div className="lg:col-span-1 bg-white border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-foreground flex items-center gap-2"><HardDrive size={18} className="text-primary"/> Status Server</h3>
            <span className="text-[10px] font-bold px-2 py-1 bg-green-100 text-success rounded uppercase tracking-wider">Optimal</span>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-500">Beban CPU</span>
                <span className="text-foreground">24%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-success w-[24%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-500">Penyimpanan Video</span>
                <span className="text-foreground">78%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-warning w-[78%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Users size={24} />
            </div>
            <div className="text-right">
              <p className="text-xs text-muted font-bold uppercase tracking-wider mb-1">ASN Aktif Belajar</p>
              <h3 className="text-3xl font-black text-foreground">3,240</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-success bg-success/10 px-2 py-1 rounded inline-flex">↑ 12.5% bln ini</div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500"></div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm relative overflow-hidden group hover:border-amber-500/30 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <BookOpen size={24} />
            </div>
            <div className="text-right">
              <p className="text-xs text-muted font-bold uppercase tracking-wider mb-1">Modul Diselesaikan</p>
              <h3 className="text-3xl font-black text-foreground">14.5k</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-success bg-success/10 px-2 py-1 rounded inline-flex">↑ 8.2% bln ini</div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500"></div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm relative overflow-hidden group hover:border-green-500/30 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <CheckCircle size={24} />
            </div>
            <div className="text-right">
              <p className="text-xs text-muted font-bold uppercase tracking-wider mb-1">Rata-rata Nilai</p>
              <h3 className="text-3xl font-black text-foreground">88.4</h3>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted font-medium">Batas Lulus: 70</span>
            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-success w-[88%]"></div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500"></div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm relative overflow-hidden group hover:border-purple-500/30 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Award size={24} />
            </div>
            <div className="text-right">
              <p className="text-xs text-muted font-bold uppercase tracking-wider mb-1">Sertifikat Sah</p>
              <h3 className="text-3xl font-black text-foreground">12.1k</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-warning bg-warning/10 px-2 py-1 rounded inline-flex text-amber-700">
            <AlertCircle size={12}/> 3 Butuh Validasi
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white border border-border rounded-2xl shadow-sm p-6 xl:col-span-2 flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-foreground text-lg">Aktivitas Login & Belajar (2026)</h3>
            </div>
          </div>
          <div className="flex-1 min-h-[250px] flex items-end justify-between gap-2 sm:gap-6 pt-4">
            {monthlyData.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 group h-full justify-end relative">
                <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-white bg-slate-800 px-2 py-1 rounded shadow-lg z-10">{data.label} User</div>
                <div className="w-full max-w-[50px] bg-slate-50 border border-slate-100 rounded-t-lg relative overflow-hidden h-[200px] flex flex-col justify-end group-hover:shadow-md">
                  <div className="bg-gradient-to-t from-primary to-blue-400 group-hover:to-primary transition-all w-full rounded-t-sm" style={{ height: `${data.users}%` }}></div>
                </div>
                <div className="mt-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{data.month}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6 xl:col-span-1">
          <div className="bg-white border border-border rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-foreground mb-1">Distribusi Peserta</h3>
            <p className="text-xs text-muted mb-6 border-b border-slate-100 pb-4">Berdasarkan asal Satuan Kerja (SKPD)</p>
            <div className="space-y-4">
              {skpdDistribution.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-foreground">{item.name}</span>
                    <span className="text-muted">{item.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-border rounded-2xl shadow-sm p-0 overflow-hidden">
            <div className="p-5 border-b border-border bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-foreground">Tugas Tertunda</h3>
              <span className="w-6 h-6 bg-error text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm">{pendingApprovals.length}</span>
            </div>
            <div className="divide-y divide-border">
              {pendingApprovals.map((task, i) => (
                <div key={i} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-bold text-primary">{task.id}</p>
                    <span className="text-[10px] text-muted">{task.date}</span>
                  </div>
                  <p className="text-sm font-bold text-foreground">{task.type}</p>
                  <p className="text-xs text-muted">Pemohon: {task.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
