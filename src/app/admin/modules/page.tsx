"use client";

import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminModules() {
  const modulesData = [
    { id: "MDL-202600", title: "Pengantar Tata Kelola Pemerintahan", category: "Manajerial", participants: "1,245", status: "Aktif" },
    { id: "MDL-202601", title: "Pencegahan Korupsi di Instansi", category: "Integritas", participants: "1,050", status: "Aktif" },
    { id: "MDL-202602", title: "Literasi Keamanan Informasi Dasar", category: "Teknologi", participants: "890", status: "Aktif" },
    { id: "MDL-202603", title: "Etika Pelayanan Publik", category: "Sosio Kultural", participants: "430", status: "Draf" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden animate-in fade-in slide-in-from-bottom-4">
      <div className="p-6 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50">
        <div>
          <h2 className="text-xl font-bold text-foreground">Manajemen Modul Pelatihan</h2>
          <p className="text-sm text-muted">Tambah, edit, atau non-aktifkan materi kursus.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-primary-hover">
          <Plus size={16} /> Buat Modul Baru
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-border text-xs uppercase text-slate-500 font-bold">
            <tr>
              <th className="px-6 py-4">ID Modul</th>
              <th className="px-6 py-4">Judul Pelatihan</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4 text-center">Peserta</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {modulesData.map((mod, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono text-sm text-slate-500">{mod.id}</td>
                <td className="px-6 py-4 font-bold text-sm text-primary">{mod.title}</td>
                <td className="px-6 py-4 text-sm text-muted">{mod.category}</td>
                <td className="px-6 py-4 text-sm font-bold text-center">{mod.participants}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded uppercase ${mod.status === 'Aktif' ? 'bg-green-100 text-success' : 'bg-warning/20 text-warning'}`}>
                    {mod.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit"><Edit size={16} /></button>
                  <button className="p-2 text-error hover:bg-red-50 rounded transition-colors" title="Hapus"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
