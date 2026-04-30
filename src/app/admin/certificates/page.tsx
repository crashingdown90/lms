"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

export default function AdminCertificates() {
  const [certValidations, setCertValidations] = useState([
    { id: "CERT-9901", name: "Andi Saputra", course: "Pencegahan Korupsi", score: 95, status: "Menunggu" },
    { id: "CERT-9902", name: "Budi Gunawan", course: "Tata Kelola Digital", score: 88, status: "Menunggu" },
    { id: "CERT-9903", name: "Maya Indah", course: "Manajemen Kinerja ASN", score: 100, status: "Menunggu" },
  ]);

  const handleApproveCert = (id: string) => {
    setCertValidations(certValidations.map(c => c.id === id ? { ...c, status: "Disetujui" } : c));
  };
  const handleRejectCert = (id: string) => {
    setCertValidations(certValidations.map(c => c.id === id ? { ...c, status: "Ditolak" } : c));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden animate-in fade-in slide-in-from-bottom-4">
      <div className="p-6 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50">
        <div>
          <h2 className="text-xl font-bold text-foreground">Validasi Sertifikat Kelulusan</h2>
          <p className="text-sm text-muted">Setujui penerbitan sertifikat digital untuk peserta yang telah lulus ujian (Opsional Manual).</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button className="px-3 py-1.5 text-xs font-bold bg-white shadow-sm rounded text-primary">Menunggu (3)</button>
          <button className="px-3 py-1.5 text-xs font-bold text-muted hover:text-foreground">Riwayat Disetujui</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-border text-xs uppercase text-slate-500 font-bold">
            <tr>
              <th className="px-6 py-4">ID Permintaan</th>
              <th className="px-6 py-4">Nama Peserta</th>
              <th className="px-6 py-4">Pelatihan Diselesaikan</th>
              <th className="px-6 py-4 text-center">Skor Ujian</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {certValidations.map((cert, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono text-sm text-slate-500">{cert.id}</td>
                <td className="px-6 py-4 font-bold text-sm">{cert.name}</td>
                <td className="px-6 py-4 text-sm text-primary font-medium">{cert.course}</td>
                <td className="px-6 py-4 text-sm font-black text-center text-success">{cert.score}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded uppercase ${cert.status === 'Menunggu' ? 'bg-amber-100 text-amber-700' : cert.status === 'Disetujui' ? 'bg-green-100 text-success' : 'bg-red-100 text-error'}`}>
                    {cert.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  {cert.status === 'Menunggu' ? (
                    <>
                      <button onClick={() => handleApproveCert(cert.id)} className="px-3 py-1.5 bg-success text-white rounded text-xs font-bold hover:bg-green-600 transition-colors flex items-center gap-1"><Check size={14}/> Setujui</button>
                      <button onClick={() => handleRejectCert(cert.id)} className="px-3 py-1.5 bg-error text-white rounded text-xs font-bold hover:bg-red-600 transition-colors flex items-center gap-1"><X size={14}/> Tolak</button>
                    </>
                  ) : (
                    <span className="text-xs font-bold text-slate-400 italic">Selesai</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
