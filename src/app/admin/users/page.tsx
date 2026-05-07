"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, Filter, Download, MoreVertical, Users, CheckCircle, Clock, ShieldCheck, Mail, X, AlertCircle, Loader2 } from "lucide-react";

export default function AdminUsers() {
  const [usersList, setUsersList] = useState<any[]>([]);
  const [skpdList, setSkpdList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUserData, setNewUserData] = useState({ 
    name: "", nip: "", skpdId: "",
    jenisJabatan: "", golongan: "", tingkatPendidikan: "", programStudi: "", eselon: "", jenisKelamin: ""
  });
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Modal States
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editUserData, setEditUserData] = useState({ 
    name: "", nip: "", skpdId: "",
    jenisJabatan: "", golongan: "", tingkatPendidikan: "", programStudi: "", eselon: "", jenisKelamin: ""
  });

  // Derived State
  const filteredUsers = usersList.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.nip.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openRoleModal = (user: any) => {
    setSelectedUser({ ...user });
    setIsRoleModalOpen(true);
  };

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    // Find the skpdId for this user by matching skpd name with skpdList
    const skpdObj = skpdList.find(s => s.name === user.skpd);
    setEditUserData({ 
      name: user.name, 
      nip: user.nip, 
      skpdId: skpdObj ? skpdObj.id : "",
      jenisJabatan: user.jenisJabatan || "",
      golongan: user.golongan || "",
      tingkatPendidikan: user.tingkatPendidikan || "",
      programStudi: user.programStudi || "",
      eselon: user.eselon || "",
      jenisKelamin: user.jenisKelamin || ""
    });
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/users").then(res => res.json()),
      fetch("/api/admin/skpd").then(res => res.json())
    ]).then(([users, skpds]) => {
      if (Array.isArray(users)) setUsersList(users);
      if (Array.isArray(skpds)) setSkpdList(skpds);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const saveRole = async () => {
    try {
      const res = await fetch(`/api/admin/users/${selectedUser.id}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newRole: selectedUser.systemRole })
      });
      if (res.ok) {
        setUsersList(usersList.map(u => u.id === selectedUser.id ? selectedUser : u));
      } else {
        alert("Gagal menyimpan. Fitur ini membutuhkan hak akses SUPER_ADMIN.");
      }
    } catch (e) {
      alert("Terjadi kesalahan server.");
    }
    setIsRoleModalOpen(false);
    setSelectedUser(null);
  };

  const deleteUser = async () => {
    try {
      const res = await fetch(`/api/admin/users/${selectedUser.id}`, { method: "DELETE" });
      if (res.ok) {
        setUsersList(usersList.filter(u => u.id !== selectedUser.id));
      } else {
        alert("Gagal menghapus data. Hanya SUPER_ADMIN yang diizinkan.");
      }
    } catch (e) {
      alert("Terjadi kesalahan server.");
    }
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const createUser = async () => {
    if (!newUserData.name || !newUserData.nip || !newUserData.skpdId) {
      return alert("Mohon lengkapi semua data!");
    }
    
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserData)
      });
      const data = await res.json();
      if (res.ok) {
        alert("Pegawai berhasil ditambahkan! Password default: pegawai");
        setIsAddModalOpen(false);
        setNewUserData({ 
          name: "", nip: "", skpdId: "", 
          jenisJabatan: "", golongan: "", tingkatPendidikan: "", programStudi: "", eselon: "", jenisKelamin: "" 
        });
        // Refresh page to fetch latest data
        window.location.reload();
      } else {
        alert(data.error || "Gagal menambahkan pegawai.");
      }
    } catch (e) {
      alert("Terjadi kesalahan server.");
    }
  };

  const editUser = async () => {
    if (!editUserData.name || !editUserData.nip || !editUserData.skpdId) {
      return alert("Mohon lengkapi semua data!");
    }
    try {
      const res = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editUserData)
      });
      const data = await res.json();
      if (res.ok) {
        setIsEditModalOpen(false);
        window.location.reload();
      } else {
        alert(data.error || "Gagal mengedit pegawai.");
      }
    } catch (e) {
      alert("Terjadi kesalahan server.");
    }
  };

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-primary w-12 h-12" />
    </div>
  );

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
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-primary-hover transition-all hover:shadow-[0_0_15px_rgba(141,198,63,0.3)] hover:shadow-lg"
          >
            <Plus size={16} /> Tambah ASN
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-primary/30 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-muted uppercase tracking-wider mb-0.5">Total ASN Aktif</p>
            <h3 className="text-2xl font-black text-foreground">{usersList.length}</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-accent/30 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-accent/20 text-[#141414] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-muted uppercase tracking-wider mb-0.5">Lulus Target 20 JP</p>
            <h3 className="text-2xl font-black text-foreground">1,850 <span className="text-xs font-bold text-success ml-1">57%</span></h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-[#141414]/30 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-[#141414]/10 text-[#141414] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-muted uppercase tracking-wider mb-0.5">Belum Penuhi JP</p>
            <h3 className="text-2xl font-black text-foreground">1,390 <span className="text-xs font-bold text-error ml-1">43%</span></h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-primary-hover/30 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-primary-light text-primary-hover flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-muted uppercase tracking-wider mb-0.5">Admin SKPD</p>
            <h3 className="text-2xl font-black text-foreground">{usersList.filter(u => u.systemRole === "ADMIN_SKPD").length}</h3>
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
              <input 
                type="text" 
                placeholder="Cari NIP / Nama..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-shadow font-medium" 
              />
            </div>
            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50">
              <Filter size={16} /> Filter
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-sm font-bold text-slate-500 w-full sm:w-auto justify-end">
            <span>Tampilkan:</span>
            <select 
              value={itemsPerPage} 
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="border border-slate-200 bg-white rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary font-bold text-foreground">
              <option value={5}>5 baris</option>
              <option value={10}>10 baris</option>
              <option value={50}>50 baris</option>
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
                <th className="px-6 py-4 text-center">Hak Akses Sistem</th>
                <th className="px-6 py-4">Aktivitas Terakhir</th>
                <th className="px-6 py-4 text-right">Opsi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium">
                    Tidak ada data pegawai yang cocok dengan pencarian "{searchTerm}"
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user, i) => (
                  <tr key={user.id} className="hover:bg-primary-light/30 transition-colors group">
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
                        ${user.systemRole === 'SUPER_ADMIN' ? 'bg-primary text-primary-foreground border border-primary' : 
                          user.systemRole === 'ADMIN_SKPD' ? 'bg-accent/20 text-[#141414] border border-accent/50' : 
                          'bg-slate-100 text-slate-500 border border-slate-200'}
                      `}>
                        {user.systemRole === 'PEGAWAI' ? 'ASN' : user.systemRole.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-slate-500 font-medium">{user.lastLogin}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 transition-opacity">
                        <button 
                          onClick={() => openRoleModal(user)}
                          className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary-light rounded-lg transition-colors" 
                          title="Atur Role Akses"
                        >
                          <ShieldCheck size={16} />
                        </button>
                        <button 
                          onClick={() => openEditModal(user)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                          title="Edit Data"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => { setSelectedUser(user); setIsDeleteModalOpen(true); }}
                          className="p-1.5 text-slate-400 hover:text-error hover:bg-red-50 rounded-lg transition-colors" 
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm">
          <div className="text-slate-500 font-medium">
            Menampilkan <span className="font-bold text-foreground">{filteredUsers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> hingga <span className="font-bold text-foreground">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</span> dari <span className="font-bold text-foreground">{filteredUsers.length}</span> ASN
          </div>
          <div className="flex gap-1">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 disabled:text-slate-400 disabled:hover:bg-transparent font-medium disabled:cursor-not-allowed">Sebelumnya</button>
            <span className="px-3 py-1 bg-primary text-primary-foreground rounded-md font-bold shadow-sm">{currentPage}</span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 disabled:text-slate-400 disabled:hover:bg-transparent font-medium disabled:cursor-not-allowed">Selanjutnya</button>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      
      {/* 1. Atur Role Modal */}
      {isRoleModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h3 className="font-black text-lg text-foreground">Kelola Akses Sistem</h3>
              <button onClick={() => setIsRoleModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-border">
                <p className="text-xs text-muted font-bold uppercase tracking-wider mb-1">Pegawai Terpilih</p>
                <p className="font-bold text-foreground">{selectedUser.name}</p>
                <p className="text-sm text-slate-500 font-mono">{selectedUser.nip}</p>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Pilih Role Baru</label>
                <select 
                  value={selectedUser.systemRole}
                  onChange={(e) => setSelectedUser({...selectedUser, systemRole: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="PEGAWAI">ASN (Pengguna Reguler)</option>
                  <option value="ADMIN_SKPD">Admin SKPD (Manajemen Instansi)</option>
                  <option value="SUPER_ADMIN">Superadmin (Akses Penuh)</option>
                </select>
              </div>
              
              {selectedUser.systemRole === "SUPER_ADMIN" && (
                <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg flex gap-3 text-amber-700">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <p className="text-xs font-medium">Perhatian: Memberikan akses Superadmin berarti memberikan kendali penuh terhadap seluruh sistem aplikasi.</p>
                </div>
              )}
            </div>
            <div className="p-6 bg-slate-50 border-t border-border flex justify-end gap-3">
              <button onClick={() => setIsRoleModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">Batal</button>
              <button onClick={saveRole} className="px-4 py-2 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary-hover rounded-lg transition-colors shadow-sm">Simpan Akses</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Hapus Modal */}
      {isDeleteModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 text-error rounded-full flex items-center justify-center mx-auto mb-2">
                <Trash2 size={32} />
              </div>
              <h3 className="font-black text-xl text-foreground">Hapus Pegawai?</h3>
              <p className="text-sm text-muted">Anda yakin ingin menghapus data <strong>{selectedUser.name}</strong> secara permanen? Tindakan ini tidak dapat dibatalkan.</p>
            </div>
            <div className="p-4 bg-slate-50 border-t border-border flex justify-center gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors w-full">Batal</button>
              <button onClick={deleteUser} className="px-6 py-2.5 text-sm font-bold text-white bg-error hover:bg-red-600 rounded-lg transition-colors shadow-sm w-full">Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Tambah Modal (Mockup) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h3 className="font-black text-lg text-foreground">Tambah Pegawai Baru</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-bold text-foreground mb-1">Nama Lengkap</label>
                  <input type="text" placeholder="Masukkan nama..." 
                    value={newUserData.name} onChange={(e) => setNewUserData({...newUserData, name: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">NIP</label>
                  <input type="text" placeholder="18 digit NIP" 
                    value={newUserData.nip} onChange={(e) => setNewUserData({...newUserData, nip: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Perangkat Daerah / SKPD</label>
                  <select 
                    value={newUserData.skpdId} onChange={(e) => setNewUserData({...newUserData, skpdId: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none">
                    <option value="">-- Pilih SKPD --</option>
                    {skpdList.map(skpd => (
                      <option key={skpd.id} value={skpd.id}>{skpd.name}</option>
                    ))}
                  </select>
                </div>

                {/* New Fields */}
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Jenis Kelamin</label>
                  <select value={newUserData.jenisKelamin} onChange={(e) => setNewUserData({...newUserData, jenisKelamin: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none">
                    <option value="">-- Pilih --</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Jenis Jabatan</label>
                  <input type="text" placeholder="Contoh: Fungsional Umum" 
                    value={newUserData.jenisJabatan} onChange={(e) => setNewUserData({...newUserData, jenisJabatan: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Golongan</label>
                  <input type="text" placeholder="Contoh: III/b" 
                    value={newUserData.golongan} onChange={(e) => setNewUserData({...newUserData, golongan: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Eselon</label>
                  <input type="text" placeholder="Contoh: II.a / Non Eselon" 
                    value={newUserData.eselon} onChange={(e) => setNewUserData({...newUserData, eselon: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Tingkat Pendidikan</label>
                  <input type="text" placeholder="Contoh: S1 / S2" 
                    value={newUserData.tingkatPendidikan} onChange={(e) => setNewUserData({...newUserData, tingkatPendidikan: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Program Studi</label>
                  <input type="text" placeholder="Contoh: Sistem Informasi" 
                    value={newUserData.programStudi} onChange={(e) => setNewUserData({...newUserData, programStudi: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-border flex justify-end gap-3">
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">Batal</button>
              <button onClick={createUser} className="px-4 py-2 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary-hover rounded-lg transition-colors shadow-sm flex items-center gap-2"><Plus size={16}/> Simpan Pegawai</button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Edit Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h3 className="font-black text-lg text-foreground">Edit Data Pegawai</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-bold text-foreground mb-1">Nama Lengkap</label>
                  <input type="text" placeholder="Masukkan nama..." 
                    value={editUserData.name} onChange={(e) => setEditUserData({...editUserData, name: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">NIP</label>
                  <input type="text" placeholder="18 digit NIP" 
                    value={editUserData.nip} onChange={(e) => setEditUserData({...editUserData, nip: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Perangkat Daerah / SKPD</label>
                  <select 
                    value={editUserData.skpdId} onChange={(e) => setEditUserData({...editUserData, skpdId: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none">
                    <option value="">-- Pilih SKPD --</option>
                    {skpdList.map(skpd => (
                      <option key={skpd.id} value={skpd.id}>{skpd.name}</option>
                    ))}
                  </select>
                </div>

                {/* New Fields */}
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Jenis Kelamin</label>
                  <select value={editUserData.jenisKelamin} onChange={(e) => setEditUserData({...editUserData, jenisKelamin: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none">
                    <option value="">-- Pilih --</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Jenis Jabatan</label>
                  <input type="text" placeholder="Contoh: Fungsional Umum" 
                    value={editUserData.jenisJabatan} onChange={(e) => setEditUserData({...editUserData, jenisJabatan: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Golongan</label>
                  <input type="text" placeholder="Contoh: III/b" 
                    value={editUserData.golongan} onChange={(e) => setEditUserData({...editUserData, golongan: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Eselon</label>
                  <input type="text" placeholder="Contoh: II.a / Non Eselon" 
                    value={editUserData.eselon} onChange={(e) => setEditUserData({...editUserData, eselon: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Tingkat Pendidikan</label>
                  <input type="text" placeholder="Contoh: S1 / S2" 
                    value={editUserData.tingkatPendidikan} onChange={(e) => setEditUserData({...editUserData, tingkatPendidikan: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Program Studi</label>
                  <input type="text" placeholder="Contoh: Sistem Informasi" 
                    value={editUserData.programStudi} onChange={(e) => setEditUserData({...editUserData, programStudi: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-border flex justify-end gap-3">
              <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">Batal</button>
              <button onClick={editUser} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm flex items-center gap-2"><CheckCircle size={16}/> Simpan Perubahan</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
