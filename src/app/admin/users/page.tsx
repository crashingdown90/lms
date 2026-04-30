"use client";

import { Search, Plus, Edit, Trash2, Filter, Download, MoreVertical, Users, CheckCircle, Clock, ShieldCheck, Mail } from "lucide-react";

export default function AdminUsers() {
  const usersData = [
    { 
      nip: "19850101 201001 1 012", 
      name: "Drefan Sukabumi", 
      role: "Pranata Komputer Ahli Muda", 
      skpd: "Dinas Komunikasi & Informatika", 
      jp: 45, 
      target: 20, 
      status: "Aktif", 
      lastLogin: "2 jam yang lalu", 
      color: "from-blue-500 to-blue-700",
      initials: "DS" 
    },
    { 
      nip: "19880512 201502 2 001", 
      name: "Siti Rahmawati, S.E.", 
      role: "Analis Keuangan Pusat", 
      skpd: "Dinas Pendidikan", 
      jp: 14, 
      target: 20, 
      status: "Aktif", 
      lastLogin: "1 hari yang lalu", 
      color: "from-pink-500 to-rose-600",
      initials: "SR" 
    },
    { 
      nip: "19750211 199903 1 002", 
      name: "Dr. Rina Puspita", 
      role: "Dokter Ahli Madya", 
      skpd: "Dinas Kesehatan", 
      jp: 32, 
      target: 20, 
      status: "Cuti", 
      lastLogin: "3 minggu yang lalu", 
      color: "from-purple-500 to-purple-700",
      initials: "RP" 
    },
    { 
      nip: "19920405 202012 1 004", 
      name: "Ahmad Fauzan, S.STP", 
      role: "Lurah Cikole", 
      skpd: "Kecamatan Cikole", 
      jp: 8, 
      target: 20, 
      status: "Aktif", 
      lastLogin: "Baru saja", 
      color: "from-emerald-500 to-teal-600",
      initials: "AF" 
    },
    { 
      nip: "19801122 200501 1 003", 
      name: "Drs. Bambang Pamungkas", 
      role: "Penyuluh Pertanian Madya", 
      skpd: "Dinas Pertanian", 
      jp: 20, 
      target: 20, 
      status: "Pensiun", 
      lastLogin: "2 bulan yang lalu", 
      color: "from-slate-500 to-slate-700",
      initials: "BP" 
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-foreground">Direktori Pegawai (ASN)</h2>
          <p className="text-muted mt-1">Kelola data peserta, pantau pemenuhan Jam Pelajaran (JP), dan hak akses.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors">
            <Download size={16} /> Ekspor Data
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-primary-hover transition-all hover:shadow-primary/30 hover:shadow-lg">
            <Plus size={16} /> Tambah ASN
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-muted uppercase tracking-wider mb-0.5">Total ASN Aktif</p>
            <h3 className="text-2xl font-black text-foreground">3,240</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-muted uppercase tracking-wider mb-0.5">Lulus Target 20 JP</p>
            <h3 className="text-2xl font-black text-foreground">1,850 <span className="text-xs font-bold text-success ml-1">57%</span></h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-muted uppercase tracking-wider mb-0.5">Belum Penuhi JP</p>
            <h3 className="text-2xl font-black text-foreground">1,390 <span className="text-xs font-bold text-error ml-1">43%</span></h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-muted uppercase tracking-wider mb-0.5">Admin SKPD</p>
            <h3 className="text-2xl font-black text-foreground">42</h3>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        {/* Table Controls */}
        <div className="p-5 border-b border-border bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Cari NIP / Nama..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-shadow font-medium" />
            </div>
            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50">
              <Filter size={16} /> Filter
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-sm font-bold text-slate-500 w-full sm:w-auto justify-end">
            <span>Tampilkan:</span>
            <select className="border border-slate-200 bg-white rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary font-bold text-foreground">
              <option>5 baris</option>
              <option>10 baris</option>
              <option>50 baris</option>
            </select>
          </div>
        </div>

        {/* The Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Profil Pegawai</th>
                <th className="px-6 py-4">SKPD / Jabatan</th>
                <th className="px-6 py-4">Pemenuhan JP</th>
                <th className="px-6 py-4 text-center">Status Akses</th>
                <th className="px-6 py-4">Aktivitas Terakhir</th>
                <th className="px-6 py-4 text-right">Opsi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {usersData.map((user, i) => (
                <tr key={i} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-white font-bold shadow-sm shrink-0`}>
                        {user.initials}
                      </div>
                      <div>
                        <div className="font-bold text-foreground">{user.name}</div>
                        <div className="text-xs font-mono text-slate-500 mt-0.5 tracking-tight">{user.nip}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-700">{user.skpd}</div>
                    <div className="text-xs text-muted mt-0.5">{user.role}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5 w-32">
                      <div className="flex justify-between text-xs font-bold">
                        <span className={user.jp >= user.target ? 'text-success' : 'text-primary'}>{user.jp} JP</span>
                        <span className="text-slate-400">/ {user.target}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${user.jp >= user.target ? 'bg-success' : 'bg-primary'}`} 
                          style={{ width: `${Math.min((user.jp / user.target) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider
                      ${user.status === 'Aktif' ? 'bg-green-100 text-green-700 border border-green-200' : 
                        user.status === 'Cuti' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 
                        'bg-slate-100 text-slate-500 border border-slate-200'}
                    `}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-slate-500 font-medium">{user.lastLogin}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Kirim Email"><Mail size={16} /></button>
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Data"><Edit size={16} /></button>
                      <button className="p-1.5 text-slate-400 hover:text-error hover:bg-red-50 rounded-lg transition-colors" title="Hapus"><Trash2 size={16} /></button>
                    </div>
                    <button className="p-1.5 text-slate-400 group-hover:hidden"><MoreVertical size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm">
          <div className="text-slate-500 font-medium">
            Menampilkan <span className="font-bold text-foreground">1</span> hingga <span className="font-bold text-foreground">5</span> dari <span className="font-bold text-foreground">3,240</span> ASN
          </div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 rounded-md text-slate-400 cursor-not-allowed font-medium">Sebelumnya</button>
            <button className="px-3 py-1 bg-primary text-white rounded-md font-bold shadow-sm">1</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50 font-medium text-slate-600">2</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50 font-medium text-slate-600">3</button>
            <span className="px-2 py-1 text-slate-400">...</span>
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50 font-medium text-slate-600">Selanjutnya</button>
          </div>
        </div>
      </div>
    </div>
  );
}
